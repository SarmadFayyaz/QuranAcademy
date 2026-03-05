import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

async function getCallerProfile(supabase: Awaited<ReturnType<typeof createClient>>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single<Pick<Profile, "role">>();

  return { user, profile };
}

// GET /api/assignments?page=1&limit=10&teacher_id=xxx
export async function GET(request: Request) {
  const supabase = await createClient();
  const { user, profile } = await getCallerProfile(supabase);

  if (!user || !profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isManager = ["manager", "supervisor"].includes(profile.role);
  const isTeacher = profile.role === "teacher";

  if (!isManager && !isTeacher) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  const teacherFilter = searchParams.get("teacher_id");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("teacher_students")
    .select(
      "id, teacher_id, student_id, assigned_at, teacher:profiles!teacher_id(id, full_name), student:profiles!student_id(id, full_name)",
      { count: "exact" }
    )
    .order("assigned_at", { ascending: false })
    .range(from, to);

  // Teachers can only see their own assignments
  if (isTeacher) {
    query = query.eq("teacher_id", user.id);
  } else if (teacherFilter) {
    query = query.eq("teacher_id", teacherFilter);
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
  });
}

// POST /api/assignments — assign student to teacher (manager only)
export async function POST(request: Request) {
  const supabase = await createClient();
  const { user, profile } = await getCallerProfile(supabase);

  if (!user || !profile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!["manager", "supervisor"].includes(profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { teacher_id, student_id } = await request.json();

  if (!teacher_id || !student_id) {
    return NextResponse.json(
      { error: "teacher_id and student_id are required" },
      { status: 400 }
    );
  }

  // Verify teacher is actually a teacher
  const { data: teacher } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", teacher_id)
    .single();

  if (!teacher || teacher.role !== "teacher") {
    return NextResponse.json(
      { error: "Selected teacher is not valid" },
      { status: 400 }
    );
  }

  // Verify student is actually a student
  const { data: student } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", student_id)
    .single();

  if (!student || student.role !== "student") {
    return NextResponse.json(
      { error: "Selected student is not valid" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("teacher_students")
    .insert({ teacher_id, student_id })
    .select("id, teacher_id, student_id, assigned_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This student is already assigned to this teacher" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ assignment: data });
}
