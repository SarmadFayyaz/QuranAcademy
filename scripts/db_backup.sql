-- ============================================================
-- Hasnain Online Quran Academy — Full Database Setup
-- Run in Supabase SQL Editor (Dashboard > SQL Editor)
-- This creates all tables, triggers, indexes, RLS policies,
-- and storage buckets from scratch.
-- ============================================================


-- ════════════════════════════════════════════════════════════
-- 1. CREATE TABLES
-- ════════════════════════════════════════════════════════════

-- Profiles (linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student'
    CHECK (role IN ('student', 'teacher', 'manager', 'supervisor')),
  phone TEXT,
  country TEXT,
  teacher_type TEXT DEFAULT NULL
    CHECK (teacher_type IS NULL OR teacher_type IN ('quran', 'subject')),
  subjects TEXT,
  bio TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Teacher-Student Assignments
CREATE TABLE IF NOT EXISTS teacher_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT teacher_students_unique_pair UNIQUE (teacher_id, student_id)
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT blog_posts_slug_unique UNIQUE (slug)
);

-- Contact/Free Trial Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  course TEXT,
  preferred_time TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'register'
    CHECK (source IN ('hero', 'register')),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'converted', 'lost')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ════════════════════════════════════════════════════════════
-- 2. INDEXES
-- ════════════════════════════════════════════════════════════

-- profiles
CREATE INDEX IF NOT EXISTS idx_profiles_public_teachers
  ON profiles(is_public, full_name) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_profiles_role_created
  ON profiles(role, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role
  ON profiles(role);

-- blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_created
  ON blog_posts(status, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug
  ON blog_posts(slug);

-- contact_submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_active
  ON contact_submissions(email) WHERE status = 'new';
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status_created
  ON contact_submissions(status, created_at DESC);

-- teacher_students
CREATE INDEX IF NOT EXISTS idx_teacher_students_teacher_id
  ON teacher_students(teacher_id);
CREATE INDEX IF NOT EXISTS idx_teacher_students_student_id
  ON teacher_students(student_id);


-- ════════════════════════════════════════════════════════════
-- 3. TRIGGERS & FUNCTIONS
-- ════════════════════════════════════════════════════════════

-- Auto-update updated_at on blog edits
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Normalize contact email (lowercase + trim)
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
-- 4. ROW LEVEL SECURITY (RLS)
-- ════════════════════════════════════════════════════════════

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- profiles policies
DROP POLICY IF EXISTS "Public teachers visible to all" ON profiles;
CREATE POLICY "Public teachers visible to all" ON profiles
  FOR SELECT USING (is_public = true);

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM profiles WHERE id = auth.uid())
  );

DROP POLICY IF EXISTS "Managers can view all profiles" ON profiles;
CREATE POLICY "Managers can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'supervisor'))
  );

DROP POLICY IF EXISTS "Managers can update profiles" ON profiles;
CREATE POLICY "Managers can update profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'supervisor'))
  );

DROP POLICY IF EXISTS "Managers can insert profiles" ON profiles;
CREATE POLICY "Managers can insert profiles" ON profiles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'supervisor'))
  );

-- teacher_students policies
DROP POLICY IF EXISTS "Teachers can view own assignments" ON teacher_students;
CREATE POLICY "Teachers can view own assignments" ON teacher_students
  FOR SELECT USING (teacher_id = auth.uid());

DROP POLICY IF EXISTS "Students can view own assignments" ON teacher_students;
CREATE POLICY "Students can view own assignments" ON teacher_students
  FOR SELECT USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Managers can view all assignments" ON teacher_students;
CREATE POLICY "Managers can view all assignments" ON teacher_students
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'supervisor'))
  );

DROP POLICY IF EXISTS "Managers can manage assignments" ON teacher_students;
CREATE POLICY "Managers can manage assignments" ON teacher_students
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'supervisor'))
  );

-- blog_posts policies
DROP POLICY IF EXISTS "Published posts visible to all" ON blog_posts;
CREATE POLICY "Published posts visible to all" ON blog_posts
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Managers can manage posts" ON blog_posts;
CREATE POLICY "Managers can manage posts" ON blog_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'manager')
  );

-- contact_submissions policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Managers can manage submissions" ON contact_submissions;
CREATE POLICY "Managers can manage submissions" ON contact_submissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'manager')
  );


-- ════════════════════════════════════════════════════════════
-- 5. HELPER FUNCTIONS
-- ════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

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


-- ════════════════════════════════════════════════════════════
-- 6. STORAGE BUCKET (for blog featured images)
-- ════════════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public blog images" ON storage.objects;
CREATE POLICY "Public blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Managers can upload blog images" ON storage.objects;
CREATE POLICY "Managers can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'manager')
  );

DROP POLICY IF EXISTS "Managers can delete blog images" ON storage.objects;
CREATE POLICY "Managers can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'supervisor'))
  );


-- ════════════════════════════════════════════════════════════
-- 7. SEED: Create first manager account
-- ════════════════════════════════════════════════════════════
-- After running this SQL, create your first user via Supabase Auth Dashboard:
--   1. Go to Authentication > Users > Add User
--   2. Enter email & password
--   3. Then run this to make them a manager:
--
-- UPDATE profiles SET role = 'manager' WHERE email = 'your-email@example.com';
