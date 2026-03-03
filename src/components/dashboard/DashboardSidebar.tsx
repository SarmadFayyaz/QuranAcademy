"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  User,
  ClipboardList,
} from "lucide-react";
import type { UserRole } from "@/lib/supabase/types";

const navByRole: Record<
  UserRole,
  { href: string; label: string; icon: typeof LayoutDashboard }[]
> = {
  manager: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/assignments", label: "Assignments", icon: UserCheck },
    { href: "/dashboard/trials", label: "Free Trials", icon: ClipboardList },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
  ],
  supervisor: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/assignments", label: "Assignments", icon: UserCheck },
    { href: "/dashboard/trials", label: "Free Trials", icon: ClipboardList },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
  ],
  teacher: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/students", label: "My Students", icon: Users },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
  ],
  student: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
  ],
};

interface DashboardSidebarProps {
  role: UserRole;
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = navByRole[role] || navByRole.student;

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              isActive
                ? "bg-primary-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary-600"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
