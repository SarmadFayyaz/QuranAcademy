import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/supabase/types";

async function getCallerWithRole(supabase: Awaited<ReturnType<typeof createClient>>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, callerRole: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single<Pick<Profile, "role">>();

  if (!profile || !["manager", "supervisor"].includes(profile.role)) {
    return { user: null, callerRole: null };
  }

  return { user, callerRole: profile.role };
}

// PATCH /api/users/[id] — update a user's profile
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { user: caller, callerRole } = await getCallerWithRole(supabase);

  if (!caller || !callerRole) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  // Supervisor restrictions
  if (callerRole === "supervisor") {
    // Get the target user's current role
    const { data: target } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", id)
      .single<Pick<Profile, "role">>();

    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Supervisor cannot edit other supervisors
    if (target.role === "supervisor" && id !== caller.id) {
      return NextResponse.json({ error: "Supervisors cannot edit other supervisors" }, { status: 403 });
    }

    // Supervisor cannot change anyone's role to manager or supervisor
    if (body.role && ["manager", "supervisor"].includes(body.role)) {
      return NextResponse.json({ error: "Only managers can assign manager or supervisor roles" }, { status: 403 });
    }

    // Supervisor cannot change a manager's role
    if (target.role === "manager" && body.role && body.role !== "manager") {
      return NextResponse.json({ error: "Only managers can change a manager's role" }, { status: 403 });
    }
  }

  const updates: Record<string, unknown> = {};

  for (const key of ["full_name", "phone", "country", "role", "teacher_type", "subjects", "bio"] as const) {
    if (body[key] !== undefined) {
      updates[key] = body[key];
    }
  }

  if (body.is_public !== undefined) {
    updates.is_public = Boolean(body.is_public);
  }

  // Handle email change — update both auth and profiles
  if (body.email && typeof body.email === "string") {
    const newEmail = body.email.toLowerCase().trim();
    updates.email = newEmail;

    const admin = createAdminClient();
    const { error: authError } = await admin.auth.admin.updateUserById(id, { email: newEmail });
    if (authError) {
      return NextResponse.json({ error: "Failed to update email: " + authError.message }, { status: 400 });
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select("id, full_name, email, role, phone, country, teacher_type, subjects, bio, is_public")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}

// DELETE /api/users/[id] — delete a user (manager only)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { user: caller, callerRole } = await getCallerWithRole(supabase);

  if (!caller || !callerRole) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Only managers can delete users
  if (callerRole !== "manager") {
    return NextResponse.json({ error: "Only managers can delete users" }, { status: 403 });
  }

  // Prevent self-deletion
  if (id === caller.id) {
    return NextResponse.json(
      { error: "Cannot delete your own account" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
