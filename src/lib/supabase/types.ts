export type UserRole = "student" | "teacher" | "manager" | "supervisor";

export type TeacherType = "quran" | "subject";

export interface Profile {
  id: string;
  email: string | null;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  country: string | null;
  teacher_type: TeacherType | null;
  subjects: string | null;
  bio: string | null;
  is_public: boolean;
  created_at: string;
}

export interface TeacherStudent {
  id: string;
  teacher_id: string;
  student_id: string;
  assigned_at: string;
}

export interface AssignmentWithProfiles extends TeacherStudent {
  teacher: Pick<Profile, "id" | "full_name">;
  student: Pick<Profile, "id" | "full_name">;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  course?: string | null;
  preferred_time?: string | null;
  message?: string | null;
  source: "hero" | "register";
  status: "new" | "converted" | "lost";
  created_at: string;
}
