import { Award, BookOpen, Star, Users, Globe, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const teacherCategories = [
  {
    title: "Online Quran Teachers",
    desc: "Our general teaching team comprises highly qualified scholars with Ijazah certifications, bringing years of experience in Quran education to students of all ages and levels.",
    features: ["Ijazah Certified", "All Age Groups", "Multiple Languages", "Tajweed Experts"],
    icon: BookOpen,
    count: "60+",
  },
  {
    title: "Male Quran Teachers",
    desc: "Experienced male instructors who provide professional and structured Quran lessons, ideal for male students and families who prefer male tutors.",
    features: ["Structured Curriculum", "Professional Approach", "Hafiz & Scholars", "Flexible Hours"],
    icon: Users,
    count: "40+",
  },
  {
    title: "Female Quran Teachers",
    desc: "Dedicated female scholars offering personalized guidance in a comfortable learning environment, perfect for sisters and young girls.",
    features: ["Comfortable Environment", "Patient & Caring", "Experienced Mothers", "Cultural Sensitivity"],
    icon: Users,
    count: "40+",
  },
];

const qualifications = [
  { icon: Award, title: "Ijazah Certified", desc: "All teachers hold authentic Ijazah in Quran recitation with connected chains." },
  { icon: BookOpen, title: "University Educated", desc: "Graduates from Al-Azhar, Islamic University of Madinah, and other prestigious institutions." },
  { icon: Globe, title: "Multilingual", desc: "Fluent in English, Arabic, Urdu, and other languages to serve global students." },
  { icon: Star, title: "Experienced", desc: "Minimum 5 years of online and in-person Quran teaching experience." },
];

const featuredTeachers = [
  { name: "Sheikh Ahmad Al-Farsi", role: "Head of Tajweed Department", exp: "15+ years", speciality: "Tajweed & Qira'at" },
  { name: "Ustadha Maryam Noor", role: "Senior Female Instructor", exp: "12+ years", speciality: "Hifz Program" },
  { name: "Qari Muhammad Idrees", role: "Quran Recitation Lead", exp: "18+ years", speciality: "Quran Memorization" },
  { name: "Ustadha Hafsa Malik", role: "Islamic Studies Head", exp: "10+ years", speciality: "Fiqh & Hadith" },
  { name: "Sheikh Bilal Ahmed", role: "Arabic Language Expert", exp: "14+ years", speciality: "Arabic Grammar" },
  { name: "Ustadha Zainab Hassan", role: "Children's Program Lead", exp: "8+ years", speciality: "Kids Quran Classes" },
];

export default function TeachersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            ✦ Meet Our Scholars
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            Our <span className="text-gold-400">Teachers</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Learn from 100+ certified Quran scholars handpicked for their
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
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Teacher <span className="text-primary-700">Qualifications</span></h2>
          <p className="section-subtitle">Every teacher meets our rigorous selection criteria.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualifications.map((q, i) => (
              <div key={i} className="fade-up text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <q.icon className="text-primary-700" size={26} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{q.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Categories */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Teacher <span className="text-primary-700">Categories</span></h2>
          <p className="section-subtitle">Choose the teaching style that suits you best.</p>
          <div className="grid lg:grid-cols-3 gap-6">
            {teacherCategories.map((cat, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center">
                    <cat.icon className="text-primary-700" size={26} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{cat.title}</h3>
                    <span className="text-sm text-gold-600 font-semibold">{cat.count} Teachers</span>
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

      {/* Featured Teachers */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Featured <span className="text-primary-700">Scholars</span></h2>
          <p className="section-subtitle">A glimpse of the talented educators behind our academy.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTeachers.map((t, i) => (
              <div key={i} className="fade-up group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white text-xl font-bold mb-4 shadow-md">
                  {t.name.split(" ").slice(-1)[0][0]}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t.name}</h3>
                <p className="text-primary-700 text-sm font-medium mb-2">{t.role}</p>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span className="px-2 py-1 bg-gray-50 rounded-md">{t.exp}</span>
                  <span className="px-2 py-1 bg-gray-50 rounded-md">{t.speciality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-r from-primary-800 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-5">
            Learn from the <span className="text-gold-400">Best</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
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
