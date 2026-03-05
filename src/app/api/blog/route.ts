import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/supabase/types";

async function getManagerProfile(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single<Pick<Profile, "role">>();
  return data;
}

// GET /api/blog?page=1&limit=10&status=all
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
  const statusFilter = searchParams.get("status");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // If admin wants all/draft posts, check auth
  if (statusFilter === "all" || statusFilter === "draft") {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const profile = await getManagerProfile(supabase, user.id);
    if (!profile || profile.role !== "manager") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const admin = createAdminClient();
  let query = admin
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, status, created_at, updated_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (statusFilter === "draft") {
    query = query.eq("status", "draft");
  } else if (statusFilter !== "all") {
    query = query.eq("status", "published");
  }

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: data || [], total: count || 0, page, limit });
}

// POST /api/blog — create a new blog post
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getManagerProfile(supabase, user.id);
  if (!profile || profile.role !== "manager") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { title, slug, content, excerpt, featured_image, status } = await request.json();

  if (!title || !slug || !content || !excerpt) {
    return NextResponse.json({ error: "title, slug, content, and excerpt are required" }, { status: 400 });
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin.from("blog_posts").insert({
    title,
    slug,
    content,
    excerpt,
    featured_image: featured_image || null,
    author_id: user.id,
    status: status || "draft",
  }).select("id, title, slug, excerpt, featured_image, status, created_at, updated_at").single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data });
}
