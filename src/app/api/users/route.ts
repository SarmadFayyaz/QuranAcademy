import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validatePassword } from "@/lib/validation";
import type { Profile } from "@/lib/supabase/types";

async function getManagerProfile(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single<Pick<Profile, "role">>();
  return data;
}

// GET /api/users?page=1&limit=10&role=student
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getManagerProfile(supabase, user.id);
  if (!profile || !["manager", "supervisor"].includes(profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  const role = searchParams.get("role");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("profiles")
    .select("id, email, full_name, role, phone, country, teacher_type, subjects, bio, is_public, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (role && ["student", "teacher", "manager", "supervisor"].includes(role)) {
    query = query.eq("role", role);
  }

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data || [],
    total: count || 0,
    page,
    limit,
    callerRole: profile.role,
  });
}

// POST /api/users — create a new student or teacher (or invite via email)
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getManagerProfile(supabase, user.id);
  if (!profile || !["manager", "supervisor"].includes(profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email, password, full_name, role, phone, country, invite } =
    await request.json();

  if (!email || !full_name || !role) {
    return NextResponse.json(
      { error: "email, full_name, and role are required" },
      { status: 400 }
    );
  }

  const validRoles = ["student", "teacher", "supervisor"];
  if (!validRoles.includes(role)) {
    return NextResponse.json(
      { error: "role must be student, teacher, or supervisor" },
      { status: 400 }
    );
  }

  // Only managers can create supervisors
  if (role === "supervisor" && profile.role !== "manager") {
    return NextResponse.json(
      { error: "Only managers can create supervisors" },
      { status: 403 }
    );
  }

  const admin = createAdminClient();

  if (invite) {
    const tempPassword =
      crypto.randomUUID().slice(0, 8) + "Aa1!" + crypto.randomUUID().slice(0, 8);

    const { data: newInviteUser, error: createInviteError } =
      await admin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { full_name, role, phone: phone || null, country: country || null },
      });

    if (createInviteError) {
      return NextResponse.json(
        { error: createInviteError.message, details: JSON.stringify(createInviteError) },
        { status: 400 }
      );
    }

    // Create profile row directly (no trigger dependency)
    const { error: profileError } = await admin.from("profiles").upsert({
      id: newInviteUser.user.id,
      email,
      full_name,
      role,
      phone: phone || null,
      country: country || null,
    });

    if (profileError) {
      // Auth user was created but profile failed — clean up
      await admin.auth.admin.deleteUser(newInviteUser.user.id);
      return NextResponse.json(
        { error: "Failed to create profile: " + profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ user: newInviteUser.user });
  }

  // Normal creation with password
  if (!password) {
    return NextResponse.json(
      { error: "password is required" },
      { status: 400 }
    );
  }

  const { valid, errors } = validatePassword(password);
  if (!valid) {
    return NextResponse.json(
      { error: `Password requirements not met: ${errors.join(", ")}` },
      { status: 400 }
    );
  }

  const { data: newUser, error: createError } =
    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role, phone: phone || null, country: country || null },
    });

  if (createError) {
    return NextResponse.json(
      { error: createError.message, details: JSON.stringify(createError) },
      { status: 400 }
    );
  }

  // Create profile row directly (no trigger dependency)
  const { error: profileError } = await admin.from("profiles").upsert({
    id: newUser.user.id,
    email,
    full_name,
    role,
    phone: phone || null,
    country: country || null,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(newUser.user.id);
    return NextResponse.json(
      { error: "Failed to create profile: " + profileError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ user: newUser.user });
}
