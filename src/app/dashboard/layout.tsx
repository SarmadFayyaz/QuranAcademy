import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { ToastProvider } from "@/components/dashboard/Toast";
import type { Profile, UserRole } from "@/lib/supabase/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single<Pick<Profile, "role" | "full_name">>();

  const role: UserRole = profile?.role || "student";
  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email;

  return (
    <ToastProvider>
      {/* Compact Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-3 border border-white/10">
            Dashboard
          </span>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">
            Welcome back, <span className="text-gold-400">{displayName}</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path
              d="M0 15 C360 40 1080 0 1440 25 L1440 40 L0 40Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Dashboard Body */}
      <section className="bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="md:w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:sticky md:top-36">
                <DashboardSidebar role={role} />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </div>
      </section>
    </ToastProvider>
  );
}
