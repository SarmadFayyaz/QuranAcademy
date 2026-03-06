import type { Metadata } from "next";
import { Award, BookOpen, Star, Users, Globe, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Teachers",
  description:
    "Meet Ijazah-certified Quran scholars at Hasnain Online Quran Academy. Male and female teachers with university education and 5+ years experience.",
  alternates: { canonical: "/teachers" },
  openGraph: {
    title: "Our Teachers — Hasnain Online Quran Academy",
    description: "Meet Ijazah-certified Quran scholars with university education and 5+ years teaching experience.",
    url: "/teachers",
    type: "website",
  },
};

const qualifications = [
  { icon: Award, title: "Ijazah Certified", desc: "All teachers hold authentic Ijazah in Quran recitation with connected chains.", iconBg: "bg-teal-500" },
  { icon: BookOpen, title: "University Educated", desc: "Graduates from Al-Azhar, Islamic University of Madinah, and other prestigious institutions.", iconBg: "bg-blue-500" },
  { icon: Globe, title: "Multilingual", desc: "Fluent in English, Arabic, Urdu, and other languages to serve global students.", iconBg: "bg-amber-500" },
  { icon: Star, title: "Experienced", desc: "Minimum 5 years of online and in-person Quran teaching experience.", iconBg: "bg-rose-500" },
];

const teacherCategories = [
  {
    title: "Online Quran Teachers",
    desc: "Our general teaching team comprises highly qualified scholars with Ijazah certifications, bringing years of experience in Quran education to students of all ages and levels.",
    features: ["Ijazah Certified", "All Age Groups", "Multiple Languages", "Tajweed Experts"],
    icon: BookOpen,
    iconBg: "bg-teal-500",
  },
  {
    title: "Male Quran Teachers",
    desc: "Experienced male instructors who provide professional and structured Quran lessons, ideal for male students and families who prefer male tutors.",
    features: ["Structured Curriculum", "Professional Approach", "Hafiz & Scholars", "Flexible Hours"],
    icon: Users,
    iconBg: "bg-blue-500",
  },
  {
    title: "Female Quran Teachers",
    desc: "Dedicated female scholars offering personalized guidance in a comfortable learning environment, perfect for sisters and young girls.",
    features: ["Comfortable Environment", "Patient & Caring", "Experienced Mothers", "Cultural Sensitivity"],
    icon: Users,
    iconBg: "bg-amber-500",
  },
];

interface PublicTeacher {
  id: string;
  full_name: string | null;
  role: string;
  teacher_type: string | null;
  subjects: string | null;
  bio: string | null;
}

export default async function TeachersPage() {
  const admin = createAdminClient();

  const { data: teachers } = await admin
    .from("profiles")
    .select("id, full_name, role, teacher_type, subjects, bio")
    .eq("is_public", true)
    .order("full_name");

  const rolePriority: Record<string, number> = { manager: 0, supervisor: 1, teacher: 2 };
  const sortByRole = (a: PublicTeacher, b: PublicTeacher) => {
    const pa = rolePriority[a.role] ?? 3;
    const pb = rolePriority[b.role] ?? 3;
    if (pa !== pb) return pa - pb;
    return (a.full_name || "").localeCompare(b.full_name || "");
  };

  const allTeachers = (teachers || []) as PublicTeacher[];
  const quranTeachers = allTeachers.filter((t) => t.teacher_type === "quran" || !t.teacher_type).sort(sortByRole);
  const subjectTeachers = allTeachers.filter((t) => t.teacher_type === "subject").sort(sortByRole);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            Meet Our Scholars
          </span>
          <h1 className="font-heading mb-6">
            Our <span className="text-gold-400">Teachers</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Learn from {allTeachers.length}+ certified Quran scholars handpicked for their
            expertise, patience, and passion for teaching.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 30 C360 80 1080 0 1440 50 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Qualifications */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <h2 className="section-title">Teacher <span className="text-primary-600">Qualifications</span></h2>
          <p className="section-subtitle">Every teacher meets our rigorous selection criteria.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualifications.map((q, i) => (
              <div key={i} className="fade-up text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                <div className={`w-14 h-14 rounded-xl ${q.iconBg} flex items-center justify-center mx-auto mb-4`}>
                  <q.icon className="text-white" size={26} />
                </div>
                <p className="font-bold text-gray-900 mb-2">{q.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* Teacher Categories */}
      <section className="section-padding bg-gray-50/80">
        <div className="section-container">
          <h2 className="section-title">Teacher <span className="text-primary-600">Categories</span></h2>
          <p className="section-subtitle">Choose the teaching style that suits you best.</p>
          <div className="grid lg:grid-cols-3 gap-6">
            {teacherCategories.map((cat, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
                    <cat.icon className="text-white" size={26} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{cat.title}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{cat.desc}</p>
                <ul className="space-y-2">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-primary-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* Quran Teachers */}
      {quranTeachers.length > 0 && (
        <section className="section-padding bg-white">
          <div className="section-container">
            <h2 className="section-title">Quran <span className="text-primary-600">Teachers</span></h2>
            <p className="section-subtitle">Our dedicated Quran teachers who guide students through their learning journey.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {quranTeachers.map((t) => {
                const highlight = t.role === "manager" || t.role === "supervisor";
                const displayRole = t.role === "teacher" ? "Quran Teacher" : t.role.charAt(0).toUpperCase() + t.role.slice(1);
                return (
                  <div key={t.id} className={`fade-up p-5 rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out text-center ${highlight ? "bg-primary-50 border-primary-200" : "bg-white border-gray-100"}`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold mb-3 mx-auto shadow-md ${highlight ? "bg-gradient-to-br from-gold-500 to-gold-700" : "bg-gradient-to-br from-primary-500 to-primary-700"}`}>
                      {(t.full_name || "?")[0]}
                    </div>
                    <p className="font-bold text-gray-900 text-sm">{t.full_name || "—"}</p>
                    <p className={`text-xs font-medium ${highlight ? "text-gold-600" : "text-primary-600"}`}>{displayRole}</p>
                    {t.bio && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{t.bio}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Subject Teachers */}
      {subjectTeachers.length > 0 && (
        <>
          <div className="section-line" />
          <section className="section-padding bg-gray-50/80">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="section-title">Subject <span className="text-primary-600">Teachers</span></h2>
              <p className="section-subtitle">Our academic subject teachers for Mathematics, English, Urdu and other subjects.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {subjectTeachers.map((t) => {
                  const isSupervisor = t.role === "manager" || t.role === "supervisor";
                  const displayRole = t.role === "teacher" ? "Subject Teacher" : t.role.charAt(0).toUpperCase() + t.role.slice(1);
                  return (
                    <div key={t.id} className={`fade-up p-6 rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out text-center ${isSupervisor ? "bg-primary-50 border-primary-200" : "bg-white border-gray-100"}`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto shadow-md ${isSupervisor ? "bg-gradient-to-br from-gold-500 to-gold-700" : "bg-gradient-to-br from-blue-500 to-blue-700"}`}>
                        {(t.full_name || "?")[0]}
                      </div>
                      <p className="font-bold text-gray-900 text-base">{t.full_name || "—"}</p>
                      <p className={`text-sm font-medium mb-1 ${isSupervisor ? "text-gold-600" : "text-primary-600"}`}>{displayRole}</p>
                      {t.subjects && <span className="text-xs text-gray-400">{t.subjects}</span>}
                      {t.bio && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{t.bio}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Learn from the <span className="text-gold-400">Best</span>
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Start your free trial today and meet your dedicated teacher.
          </p>
          <Link href="/register" className="btn-gold text-lg !px-10 !py-4">
            Get Free Trial <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
