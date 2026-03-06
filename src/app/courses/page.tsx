import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Clock,
  BookOpen,
  Monitor,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Our Courses — Online Quran & Academic Programs",
  description:
    "Explore our comprehensive range of Quran, Islamic studies, and academic courses. Learn with certified teachers in one-on-one live sessions.",
  alternates: { canonical: "/courses" },
};

const whyChoose = [
  {
    icon: GraduationCap,
    title: "Expert Tutors",
    desc: "Ijazah-certified scholars with years of teaching experience.",
    iconBg: "bg-teal-500",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    desc: "Schedule classes at your convenience from anywhere in the world.",
    iconBg: "bg-blue-500",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    desc: "Structured courses covering Quran, Islamic studies, and academics.",
    iconBg: "bg-amber-500",
  },
  {
    icon: Monitor,
    title: "Interactive Sessions",
    desc: "One-on-one live classes with multimedia tools and progress tracking.",
    iconBg: "bg-rose-500",
  },
  {
    icon: Users,
    title: "Community Support",
    desc: "Join thousands of students in a supportive learning environment.",
    iconBg: "bg-purple-500",
  },
];

const highlights = [
  "One-on-one live sessions with certified teachers",
  "Flexible scheduling — learn anytime, anywhere",
  "Progress reports and regular assessments",
  "Courses for all ages and skill levels",
  "Free 3-day trial for every new student",
];

const quranCourses = courses.filter((c) => c.category === "quran");
const academicCourses = courses.filter((c) => c.category === "academic");

export default function CoursesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            Our Courses
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Discover Our Comprehensive Courses
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            From Quran recitation and memorization to academic subjects — we offer structured programs taught by certified teachers for students of all ages and levels.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out shadow-md"
          >
            Start Free Trial <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>

      {/* ── Why Choose Our Courses ── */}
      <section className="section-padding bg-white">
        <div className="section-container px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-3">
            Why Choose Our Courses
          </h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-gray-500 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Our programs combine traditional Islamic scholarship with modern teaching methods to deliver the best learning experience.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyChoose.map((item, i) => (
              <div
                key={i}
                className="fade-up flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50/80 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} text-white flex items-center justify-center mb-4`}>
                  <item.icon size={22} />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Quran & Islamic Courses ── */}
      <section className="section-padding bg-gradient-to-b from-teal-50/40 to-white">
        <div className="section-container px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-3">
            Quran &amp; Islamic Courses
          </h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-gray-500 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Master Quran recitation, memorization, Tajweed, Tafsir, and more with our certified scholars.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {quranCourses.map((c, i) => (
              <CourseCard key={i} course={c} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Academic Courses ── */}
      <section className="section-padding bg-white">
        <div className="section-container px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-3">
            Academic Courses
          </h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-gray-500 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Expert tutoring in Mathematics, English, Urdu, Science, and more for students of all levels.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {academicCourses.map((c, i) => (
              <CourseCard key={i} course={c} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Highlights ── */}
      <section className="section-padding bg-gray-50/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center text-gray-900 mb-3">
            What&apos;s Included
          </h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-gray-500 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Every course comes with everything you need for a complete learning experience.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm"
              >
                <CheckCircle size={20} className="text-primary-600 shrink-0" />
                <p className="text-gray-700 text-sm font-medium">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[600px] h-[600px] bg-primary-400 -top-64 -right-64 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-48 -left-48 opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
            Ready to Start Learning?
          </h2>
          <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mb-6" />
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Sign up for a free 3-day trial and experience the quality of our teaching firsthand. No commitment required.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out shadow-md hover:shadow-lg text-lg"
          >
            Register Now — It&apos;s Free <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ── Course Card ── */
function CourseCard({ course: c }: { course: (typeof courses)[number] }) {
  return (
    <div className="fade-up group relative rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 ease-out bg-white overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-40 shrink-0 overflow-hidden">
        <Image
          src={c.image}
          alt={c.title}
          width={400}
          height={240}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2.5 right-2.5 px-3 py-1 text-[10px] font-bold rounded-full text-white shadow-sm bg-primary-600">
          Course
        </span>
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{c.title}</p>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{c.desc}</p>
        <div className="flex gap-2">
          <span className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors duration-150">
            Details
          </span>
          <Link
            href="/register"
            className="flex-1 text-center py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors duration-150"
          >
            Register
          </Link>
        </div>
      </div>
      {/* Slide-up overlay */}
      <div className="absolute inset-0 bg-gray-900/95 rounded-2xl translate-y-full group-hover:translate-y-0 transition-transform duration-250 ease-out z-10 flex flex-col p-5">
        <p className="text-sm text-white font-bold mb-2 leading-tight">{c.title}</p>
        <p className="text-gray-300 text-xs leading-relaxed flex-1">{c.desc}</p>
        <div className="flex gap-2">
          <span className="flex-1 text-center py-2 rounded-lg border border-gray-500 text-white text-xs font-medium cursor-pointer">
            Details
          </span>
          <Link
            href="/register"
            className="flex-1 text-center py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
