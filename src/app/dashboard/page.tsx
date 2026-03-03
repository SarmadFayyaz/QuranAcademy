import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Users, UserCheck, User, BookOpen, ClipboardList } from "lucide-react";
import type { Profile } from "@/lib/supabase/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, country")
    .eq("id", user.id)
    .single<Pick<Profile, "role" | "full_name" | "country">>();

  const role = profile?.role || "student";
  const isManager = role === "manager" || role === "supervisor";
  const isTeacher = role === "teacher";

  const cards = [];

  if (isManager) {
    cards.push(
      {
        href: "/dashboard/users",
        icon: Users,
        title: "Manage Users",
        desc: "Create and manage student and teacher accounts.",
        color: "bg-primary-100 text-primary-600",
      },
      {
        href: "/dashboard/assignments",
        icon: UserCheck,
        title: "Assignments",
        desc: "Assign students to teachers.",
        color: "bg-gold-100 text-gold-600",
      },
      {
        href: "/dashboard/trials",
        icon: ClipboardList,
        title: "Free Trials",
        desc: "View trial requests and convert to students.",
        color: "bg-green-100 text-green-600",
      }
    );
  }

  if (isTeacher) {
    cards.push({
      href: "/dashboard/students",
      icon: BookOpen,
      title: "My Students",
      desc: "View your assigned students.",
      color: "bg-primary-100 text-primary-600",
    });
  }

  cards.push({
    href: "/dashboard/profile",
    icon: User,
    title: "My Profile",
    desc: "View and update your information.",
    color: "bg-primary-100 text-primary-600",
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          Overview
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {isManager
            ? "Manage your academy from here."
            : isTeacher
            ? "View your students and manage your profile."
            : "Access your learning profile."}
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-900">Email:</span>{" "}
            {user.email}
          </div>
          {profile?.role && (
            <div>
              <span className="font-medium text-gray-900">Role:</span>{" "}
              <span className="capitalize">{profile.role}</span>
            </div>
          )}
          {profile?.full_name && (
            <div>
              <span className="font-medium text-gray-900">Name:</span>{" "}
              {profile.full_name}
            </div>
          )}
          {profile?.country && (
            <div>
              <span className="font-medium text-gray-900">Country:</span>{" "}
              {profile.country}
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow group"
          >
            <div
              className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}
            >
              <card.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-heading mb-2 group-hover:text-primary-600 transition-colors">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
