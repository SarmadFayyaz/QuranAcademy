import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Mail, Phone, Globe, Shield } from "lucide-react";
import ProfileNameEditor from "./ProfileNameEditor";
import ChangePasswordButton from "./ChangePasswordButton";
import type { Profile } from "@/lib/supabase/types";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, phone, country")
    .eq("id", user.id)
    .single<Pick<Profile, "full_name" | "role" | "phone" | "country">>();

  // For students, fetch their assigned teacher
  let teacherName: string | null = null;
  if (profile?.role === "student") {
    const { data: assignment } = await supabase
      .from("teacher_students")
      .select("teacher:profiles!teacher_id(full_name)")
      .eq("student_id", user.id)
      .limit(1)
      .single();

    if (assignment?.teacher) {
      const teacher = assignment.teacher as unknown as { full_name: string | null };
      teacherName = teacher.full_name;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          My Profile
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          View and update your information.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="space-y-6">
          {/* Display Name (editable via modal) */}
          <ProfileNameEditor initialName={profile?.full_name || ""} />

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-gray-400" />
            <div>
              <label className="block text-xs font-medium text-gray-400">
                Email
              </label>
              <span className="text-gray-900">{user.email}</span>
            </div>
          </div>

          {/* Role */}
          {profile?.role && (
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-gray-400" />
              <div>
                <label className="block text-xs font-medium text-gray-400">
                  Role
                </label>
                <span className="capitalize text-gray-900">
                  {profile.role}
                </span>
              </div>
            </div>
          )}

          {/* Phone */}
          {profile?.phone && (
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-gray-400" />
              <div>
                <label className="block text-xs font-medium text-gray-400">
                  Phone
                </label>
                <span className="text-gray-900">{profile.phone}</span>
              </div>
            </div>
          )}

          {/* Country */}
          {profile?.country && (
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-gray-400" />
              <div>
                <label className="block text-xs font-medium text-gray-400">
                  Country
                </label>
                <span className="text-gray-900">{profile.country}</span>
              </div>
            </div>
          )}

          {/* Change Password */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 font-heading mb-3">
              Security
            </h3>
            <ChangePasswordButton />
          </div>

          {/* Assigned Teacher (for students) */}
          {profile?.role === "student" && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-2">
                My Teacher
              </h3>
              {teacherName ? (
                <p className="text-gray-700">{teacherName}</p>
              ) : (
                <p className="text-gray-400 text-sm">
                  No teacher assigned yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
