import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Globe,
  GraduationCap,
  Star,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Languages,
  User,
  UserPlus,
  CreditCard,
  BarChart3,
  Headphones,
  Shield,
} from "lucide-react";
import HeroContactForm from "@/components/HeroContactForm";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Learn Quran Online with Certified Teachers",
  description:
    "Hasnain Online Quran Academy offers high-quality online Quran education with Tajweed, Hifz programs, and academic subjects. Start your free trial today.",
  alternates: { canonical: "/" },
};

/* ─── Data ─── */
const courses = [
  { image: "/assets/images/courses/quran-recitation.svg", title: "Quran Recitation & Tajweed", desc: "Master Quran recitation with proper Tajweed rules under expert guidance.", primary: true },
  { image: "/assets/images/courses/quran-memorization.svg", title: "Quran Memorization (Hifz)", desc: "Structured Hifz program with dedicated teachers to memorize the Holy Quran.", primary: true },
  { image: "/assets/images/courses/mathematics.svg", title: "Mathematics", desc: "Expert tutoring in Mathematics for all levels — from basics to advanced.", primary: false },
  { image: "/assets/images/courses/english.svg", title: "English Language", desc: "Improve your English reading, writing, and speaking skills with qualified tutors.", primary: false },
  { image: "/assets/images/courses/urdu.svg", title: "Urdu Language", desc: "Learn Urdu reading and writing with experienced language teachers.", primary: false },
  { image: "/assets/images/courses/other-subjects.svg", title: "Other Subjects", desc: "Additional academic subjects available on request. Contact us for details.", primary: false },
];

const staticStats = [
  { value: "5,000+", label: "Students", icon: Users },
  { value: "50+", label: "Courses", icon: BookOpen },
  { value: "", label: "Teachers", icon: GraduationCap },
  { value: "50+", label: "Countries", icon: Globe },
];

const trustBadges = [
  { icon: Headphones, title: "24/7 Support", desc: "Writers and Support available around the clock", color: "bg-teal-50 text-primary-600" },
  { icon: Shield, title: "Safe Service", desc: "Privacy and Confidentiality Guarantee", color: "bg-orange-50 text-orange-500" },
  { icon: Star, title: "Quality Score", desc: "4.72 Average Quality Score", color: "bg-blue-50 text-blue-500" },
];

const whyChoose = [
  { icon: DollarSign, title: "Affordable Fee" },
  { icon: Languages, title: "Multilingual Tutors" },
  { icon: User, title: "One-on-One Classes" },
  { icon: UserPlus, title: "Substitute Teachers" },
  { icon: CreditCard, title: "Easy Online Payments" },
  { icon: Globe, title: "Global Reputation" },
  { icon: BarChart3, title: "Progress Report" },
  { icon: BookOpen, title: "Online Portal" },
];

const teacherCategories = [
  { title: "Online Quran Teachers", desc: "Our general teaching team comprises highly qualified scholars with Ijazah certifications and years of experience." },
  { title: "Male Quran Teachers", desc: "Experienced male instructors providing professional and structured Quran lessons for all ages." },
  { title: "Female Quran Teachers", desc: "Dedicated female scholars offering personalized guidance in a comfortable learning environment." },
];

const fees = [
  { country: "United States", flag: "🇺🇸", price: "$40", currency: "USD" },
  { country: "Canada", flag: "🇨🇦", price: "$50", currency: "CAD" },
  { country: "Australia", flag: "🇦🇺", price: "$60", currency: "AUD" },
  { country: "New Zealand", flag: "🇳🇿", price: "$50", currency: "NZD" },
  { country: "United Kingdom", flag: "🇬🇧", price: "£30", currency: "GBP" },
];

const testimonials = [
  { name: "Fatima Ahmed", location: "London, UK", text: "The online classes have truly transformed my understanding of Tajweed. My teacher is incredibly patient and knowledgeable.", rating: 5 },
  { name: "Omar Hassan", location: "New York, USA", text: "My children love their Quran classes. The teachers are kind and make learning fun and engaging for young students.", rating: 5 },
  { name: "Aisha Khan", location: "Toronto, Canada", text: "Flexible scheduling was exactly what I needed. I can balance work and Quran studies perfectly now.", rating: 5 },
  { name: "Yusuf Ali", location: "Sydney, Australia", text: "The Hifz program is exceptional. My son has memorized 10 Juz in just one year with their structured approach.", rating: 5 },
  { name: "Sarah Mahmood", location: "Dubai, UAE", text: "Best online Quran academy I have found. Professional teachers and excellent customer support throughout.", rating: 5 },
  { name: "Ibrahim Syed", location: "Chicago, USA", text: "My daughter started as a complete beginner. Now she reads Quran fluently with proper Tajweed. Highly recommend!", rating: 5 },
];

const steps = [
  { step: "01", title: "Register & Get Started", desc: "Sign up for your free trial in under a minute." },
  { step: "02", title: "Choose Your Course", desc: "Select from our range of Quran and Islamic courses." },
  { step: "03", title: "Start Interactive Learning", desc: "Begin one-on-one sessions with your dedicated teacher." },
  { step: "04", title: "Achieve Certification", desc: "Complete your course and receive your certificate." },
];

export default async function Home() {
  const admin = createAdminClient();
  const { count: teacherCount } = await admin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("is_public", true);

  const stats = staticStats.map((s) =>
    s.label === "Teachers" ? { ...s, value: `${teacherCount || 0}+` } : s
  );

  return (
    <>
      {/* ── Hero — split layout ── */}
      <section className="bg-gradient-to-b from-white to-teal-50/40 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="pt-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 leading-tight mb-2">
                Welcome to <span className="text-primary-600">Hasnain Online</span> Quran Academy
              </h1>
              <div className="w-16 h-1 bg-primary-600 rounded-full mb-6" />
              <h2 className="text-xl md:text-2xl text-gray-700 font-medium mb-5">
                Your Gateway to Comprehensive Islamic Education
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
                Hasnain Online Quran Academy offers high-quality Islamic education globally, making Quran and Islamic studies accessible, convenient, and effective through our online courses.
              </p>
              <Link href="/register" className="btn-primary text-lg !px-9 !py-4">
                Get Free Trial
              </Link>
            </div>

            {/* Free Trial Form */}
            <HeroContactForm />
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-5">
            {trustBadges.map((b, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center shrink-0`}>
                  <b.icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-600 text-sm">{b.title}</h4>
                  <p className="text-gray-500 text-xs">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Courses ── */}
      <section className="section-padding bg-gradient-to-b from-teal-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">Our <span className="text-primary-600">Courses</span></h2>
          <p className="section-subtitle">Quran is our main priority — we also offer academic subjects to support your child&apos;s overall education.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <div key={i} className="fade-up group rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <div className="relative">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover"
                  />
                  <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full text-white shadow ${c.primary ? "bg-primary-600" : "bg-gray-500"}`}>
                    {c.primary ? "Course" : "Subject"}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{c.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <Link href="/register" className="block text-center py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition shadow-sm">
                    Register
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are + Stats ── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">Who <span className="text-primary-600">We Are</span></h2>
          <p className="text-gray-500 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Hasnain Online Quran Academy bridges traditional Islamic scholarship with modern technology, serving thousands of students worldwide with personalized one-on-one Quran education.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <s.icon className="mx-auto mb-3 text-primary-600" size={28} />
                <div className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-1">{s.value}</div>
                <div className="text-gray-400 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision / Values / Support / Method ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "VISION", title: "Leading Academy", desc: "To become the world's leading online Quran academy with innovative teaching methods." },
              { label: "VALUES", title: "Islamic Principles", desc: "Rooted in knowledge, patience, sincerity, and excellence in everything we do." },
              { label: "SUPPORT", title: "24/7 Available", desc: "Dedicated multilingual support team available around the clock for every student." },
              { label: "METHOD", title: "Modern & Traditional", desc: "Time-tested Tajweed principles combined with modern interactive technology." },
            ].map((item, i) => (
              <div key={i} className="fade-up p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all bg-gradient-to-b from-white to-gray-50">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full mb-3 tracking-wider">{item.label}</span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">Why Choose <span className="text-primary-600">Us</span></h2>
          <p className="section-subtitle">Trusted by thousands of families across 50+ countries.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {whyChoose.map((w, i) => (
              <div key={i} className="fade-up flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                  <w.icon size={22} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{w.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teachers ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">Our <span className="text-primary-600">Teachers</span></h2>
          <p className="section-subtitle">Choose the teaching style that suits you best.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {teacherCategories.map((cat, i) => (
              <div key={i} className="fade-up p-7 rounded-2xl border border-gray-100 hover:shadow-xl transition-all bg-white text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <Users size={28} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{cat.desc}</p>
                <Link href="/teachers" className="text-primary-600 hover:text-primary-700 text-sm font-semibold inline-flex items-center gap-1 transition">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">How It <span className="text-primary-600">Works</span></h2>
          <p className="section-subtitle">Get started in four simple steps.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="fade-up text-center">
                <div className="w-16 h-16 rounded-full bg-primary-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-600/30">{s.step}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">Monthly <span className="text-primary-600">Fees</span></h2>
          <p className="section-subtitle">Simple and affordable pricing. All plans include a free 3-day trial.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fees.map((f, i) => (
              <div key={i} className="fade-up rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all bg-white p-6 text-center">
                <span className="text-4xl mb-3 block">{f.flag}</span>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{f.country}</h3>
                <div className="text-4xl font-bold text-primary-600 mb-1">{f.price}</div>
                <p className="text-gray-400 text-sm">per month</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-primary-50 border border-primary-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">What&apos;s Included</h4>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-600">
                  {["One-on-One Live Sessions", "Qualified Teachers", "Flexible Scheduling", "Progress Reports", "24/7 Support"].map((f) => (
                    <span key={f} className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-primary-600" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <Link href="/register" className="btn-primary whitespace-nowrap">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">What Our <span className="text-primary-600">Students Say</span></h2>
          <p className="section-subtitle">Hear from families who have experienced our classes firsthand.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="fade-up p-7 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 bg-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-5">Begin Your Quran Journey Today</h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Sign up for a free 3-day trial and experience the quality of our teaching firsthand. No commitment required.</p>
          <Link href="/register" className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg">
            Register Now — It&apos;s Free <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
