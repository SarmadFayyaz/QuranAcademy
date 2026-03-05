-- ============================================================
-- Database Optimization for Hasnain Online Quran Academy
-- Run in Supabase SQL Editor (Dashboard > SQL Editor)
-- Safe to re-run — all statements use IF NOT EXISTS / OR REPLACE
-- ============================================================


-- ════════════════════════════════════════════════════════════
-- 1. TABLE SCHEMAS (with constraints & defaults)
-- ════════════════════════════════════════════════════════════

-- Ensure profiles table has proper constraints
ALTER TABLE profiles
  ALTER COLUMN role SET DEFAULT 'student',
  ALTER COLUMN is_public SET DEFAULT false,
  ALTER COLUMN created_at SET DEFAULT now();

-- Ensure blog_posts has proper constraints
ALTER TABLE blog_posts
  ALTER COLUMN status SET DEFAULT 'draft',
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now();

-- Ensure contact_submissions has proper constraints
ALTER TABLE contact_submissions
  ALTER COLUMN status SET DEFAULT 'new',
  ALTER COLUMN source SET DEFAULT 'register',
  ALTER COLUMN created_at SET DEFAULT now();

-- Add unique constraint on blog slug (prevents duplicate URLs)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_slug_unique'
  ) THEN
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Add check constraints for valid enum values
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_role_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
      CHECK (role IN ('student', 'teacher', 'manager', 'supervisor'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_teacher_type_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_teacher_type_check
      CHECK (teacher_type IS NULL OR teacher_type IN ('quran', 'subject'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_status_check'
  ) THEN
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_status_check
      CHECK (status IN ('draft', 'published'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_submissions_status_check'
  ) THEN
    ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_status_check
      CHECK (status IN ('new', 'converted', 'lost'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_submissions_source_check'
  ) THEN
    ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_source_check
      CHECK (source IN ('hero', 'register'));
  END IF;
END $$;

-- Prevent assigning the same student to the same teacher twice
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'teacher_students_unique_pair'
  ) THEN
    ALTER TABLE teacher_students ADD CONSTRAINT teacher_students_unique_pair
      UNIQUE (teacher_id, student_id);
  END IF;
END $$;


-- ════════════════════════════════════════════════════════════
-- 2. INDEXES (covers every query pattern in the app)
-- ════════════════════════════════════════════════════════════

-- profiles: public teachers listing (GET /api/teachers)
-- Query: .eq("is_public", true).order("full_name")
CREATE INDEX IF NOT EXISTS idx_profiles_public_teachers
  ON profiles(is_public, full_name) WHERE is_public = true;

-- profiles: filtered by role with created_at ordering (GET /api/users)
-- Query: .eq("role", role).order("created_at", { ascending: false })
CREATE INDEX IF NOT EXISTS idx_profiles_role_created
  ON profiles(role, created_at DESC);

-- profiles: role lookup for auth checks (used in every API route)
-- Query: .select("role").eq("id", userId).single()
-- Note: id is already primary key, but this partial index helps role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- blog_posts: listing with status filter + ordering (GET /api/blog, sitemap)
-- Query: .eq("status", "published").order("created_at", { ascending: false })
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_created
  ON blog_posts(status, created_at DESC);

-- blog_posts: slug lookup (blog/[slug] page)
-- Query: .eq("slug", slug).single()
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug
  ON blog_posts(slug);

-- contact_submissions: email duplicate check (POST /api/trials/check-email)
-- Query: .eq("email", email).not("status", "in", '("lost","converted")')
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_active
  ON contact_submissions(email) WHERE status = 'new';

-- contact_submissions: listing with status filter (GET /api/trials)
-- Query: .neq("status", "lost").order("created_at", { ascending: false })
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status_created
  ON contact_submissions(status, created_at DESC);

-- teacher_students: teacher's assignments (GET /api/assignments?teacher=)
-- Query: .eq("teacher_id", id).order("assigned_at", { ascending: false })
CREATE INDEX IF NOT EXISTS idx_teacher_students_teacher_id
  ON teacher_students(teacher_id);

-- teacher_students: student's assignments
-- Query: .eq("student_id", id)
CREATE INDEX IF NOT EXISTS idx_teacher_students_student_id
  ON teacher_students(student_id);

-- Drop old redundant indexes (replaced by better composite versions above)
DROP INDEX IF EXISTS idx_profiles_is_public;
DROP INDEX IF EXISTS idx_contact_submissions_email;


-- ════════════════════════════════════════════════════════════
-- 3. AUTO-UPDATE updated_at TRIGGER
-- ════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto-set updated_at on blog_posts edits
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ════════════════════════════════════════════════════════════
-- 4. AUTO-CREATE PROFILE ON SIGNUP TRIGGER
-- ════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ════════════════════════════════════════════════════════════
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ── profiles ──

-- Anyone can view public teacher profiles
DROP POLICY IF EXISTS "Public teachers visible to all" ON profiles;
CREATE POLICY "Public teachers visible to all" ON profiles
  FOR SELECT USING (is_public = true);

-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (name only)
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM profiles WHERE id = auth.uid())
  );

-- Managers & supervisors can view all profiles
DROP POLICY IF EXISTS "Managers can view all profiles" ON profiles;
CREATE POLICY "Managers can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('manager', 'supervisor')
    )
  );

-- Managers & supervisors can update any profile
DROP POLICY IF EXISTS "Managers can update profiles" ON profiles;
CREATE POLICY "Managers can update profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('manager', 'supervisor')
    )
  );

-- Managers & supervisors can insert profiles
DROP POLICY IF EXISTS "Managers can insert profiles" ON profiles;
CREATE POLICY "Managers can insert profiles" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('manager', 'supervisor')
    )
  );

-- ── teacher_students ──

-- Teachers can view their own assignments
DROP POLICY IF EXISTS "Teachers can view own assignments" ON teacher_students;
CREATE POLICY "Teachers can view own assignments" ON teacher_students
  FOR SELECT USING (teacher_id = auth.uid());

-- Students can view their own assignments
DROP POLICY IF EXISTS "Students can view own assignments" ON teacher_students;
CREATE POLICY "Students can view own assignments" ON teacher_students
  FOR SELECT USING (student_id = auth.uid());

-- Managers can view all assignments
DROP POLICY IF EXISTS "Managers can view all assignments" ON teacher_students;
CREATE POLICY "Managers can view all assignments" ON teacher_students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('manager', 'supervisor')
    )
  );

-- Managers can create/delete assignments
DROP POLICY IF EXISTS "Managers can manage assignments" ON teacher_students;
CREATE POLICY "Managers can manage assignments" ON teacher_students
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('manager', 'supervisor')
    )
  );

-- ── blog_posts ──

-- Anyone can view published posts
DROP POLICY IF EXISTS "Published posts visible to all" ON blog_posts;
CREATE POLICY "Published posts visible to all" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Only managers can manage all posts
DROP POLICY IF EXISTS "Managers can manage posts" ON blog_posts;
CREATE POLICY "Managers can manage posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- ── contact_submissions ──

-- Anyone can insert (public registration forms)
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only managers can view and update submissions
DROP POLICY IF EXISTS "Managers can manage submissions" ON contact_submissions;
CREATE POLICY "Managers can manage submissions" ON contact_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );


-- ════════════════════════════════════════════════════════════
-- 6. HELPER FUNCTIONS
-- ════════════════════════════════════════════════════════════

-- Get current user's role (avoids repeated profile lookups in API routes)
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Dashboard stats for managers (single query instead of multiple)
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_students', (SELECT count(*) FROM profiles WHERE role = 'student'),
    'total_teachers', (SELECT count(*) FROM profiles WHERE role = 'teacher'),
    'total_supervisors', (SELECT count(*) FROM profiles WHERE role = 'supervisor'),
    'total_managers', (SELECT count(*) FROM profiles WHERE role = 'manager'),
    'total_assignments', (SELECT count(*) FROM teacher_students),
    'new_trials', (SELECT count(*) FROM contact_submissions WHERE status = 'new'),
    'published_posts', (SELECT count(*) FROM blog_posts WHERE status = 'published')
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Normalize email before insert (lowercase + trim)
CREATE OR REPLACE FUNCTION normalize_contact_email()
RETURNS TRIGGER AS $$
BEGIN
  NEW.email = lower(trim(NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS contact_normalize_email ON contact_submissions;
CREATE TRIGGER contact_normalize_email
  BEFORE INSERT OR UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION normalize_contact_email();


-- ════════════════════════════════════════════════════════════
-- 7. STORAGE POLICIES (for blog featured images)
-- ════════════════════════════════════════════════════════════

-- Create bucket if not exists (run once)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view blog images
DROP POLICY IF EXISTS "Public blog images" ON storage.objects;
CREATE POLICY "Public blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Managers can upload blog images
DROP POLICY IF EXISTS "Managers can upload blog images" ON storage.objects;
CREATE POLICY "Managers can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

-- Managers can delete blog images
DROP POLICY IF EXISTS "Managers can delete blog images" ON storage.objects;
CREATE POLICY "Managers can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('manager', 'supervisor')
    )
  );


-- ════════════════════════════════════════════════════════════
-- 8. VERIFY EVERYTHING
-- ════════════════════════════════════════════════════════════

-- List all indexes on our tables
SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename IN ('profiles', 'blog_posts', 'contact_submissions', 'teacher_students')
ORDER BY tablename, indexname;

-- List all constraints
SELECT
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type
FROM information_schema.table_constraints tc
WHERE tc.table_name IN ('profiles', 'blog_posts', 'contact_submissions', 'teacher_students')
ORDER BY tc.table_name, tc.constraint_type;

-- List all RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE tablename IN ('profiles', 'blog_posts', 'contact_submissions', 'teacher_students')
ORDER BY tablename, policyname;
