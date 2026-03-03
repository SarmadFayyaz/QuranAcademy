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
  Percent,
  LayoutGrid,
  Clock,
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
  { image: "/assets/images/courses/noorani-qaida.svg", title: "Learn Noorani Qaida Online", desc: "Start reading the Quran correctly with basic pronunciation rules." },
  { image: "/assets/images/courses/quran-recitation.svg", title: "Quran Reading with Tajweed", desc: "Master the rules of Tajweed for precise Quran recitation." },
  { image: "/assets/images/courses/quran-memorization.svg", title: "Memorize Quran Online", desc: "Memorize the Quran with personalized guidance from expert tutors." },
  { image: "/assets/images/courses/tafsir.svg", title: "Learn Tafsir Online", desc: "Gain deep insights into the meanings behind Quranic verses." },
  { image: "/assets/images/courses/arabic.svg", title: "Learn Arabic Online", desc: "Master classical Arabic to enhance your understanding of Quranic texts." },
  { image: "/assets/images/courses/islamic-studies.svg", title: "Learn Islamic Studies Online", desc: "Explore Islamic studies from basics to advanced topics." },
  { image: "/assets/images/courses/taleem-ul-islam.svg", title: "Taleem ul Islam", desc: "Understand the foundational principles and practices of Islam." },
  { image: "/assets/images/courses/quran-translation.svg", title: "Quran Translation Course", desc: "Learn to translate Quranic Arabic to understand its messages clearly." },
  { image: "/assets/images/courses/ijazah.svg", title: "Online Ijazah Course", desc: "Earn a certification in Quranic recitation and teaching." },
  { image: "/assets/images/courses/quranic-arabic.svg", title: "Quranic Arabic Course", desc: "Learn Quranic Arabic to understand the Quran directly with grammar." },
  { image: "/assets/images/courses/mathematics.svg", title: "Mathematics", desc: "Expert tutoring in Mathematics for all levels — from basics to advanced." },
  { image: "/assets/images/courses/english.svg", title: "English", desc: "Improve your English reading, writing, and speaking skills with qualified tutors." },
  { image: "/assets/images/courses/urdu.svg", title: "Urdu", desc: "Learn Urdu reading and writing with experienced language teachers." },
  { image: "/assets/images/courses/science.svg", title: "Science", desc: "Comprehensive science tutoring covering Physics, Chemistry, and Biology." },
  { image: "/assets/images/courses/other-subjects.svg", title: "Other Subjects", desc: "Additional academic subjects available on request. Contact us for details." },
];

const staticStats = [
  { value: "5,000+", label: "Students", icon: Users },
  { value: "50+", label: "Courses", icon: BookOpen },
  { value: "", label: "Teachers", icon: GraduationCap },
  { value: "100+", label: "Countries", icon: Globe },
];

const trustBadges = [
  { icon: Headphones, title: "24/7 Support", desc: "Writers and Support available around the clock", color: "bg-teal-50 text-primary-600" },
  { icon: Shield, title: "Safe Service", desc: "Privacy and Confidentiality Guarantee", color: "bg-orange-50 text-orange-500" },
  { icon: Star, title: "Quality Score", desc: "4.72 Average Quality Score", color: "bg-blue-50 text-blue-500" },
];

const whyChoose = [
  { icon: DollarSign, title: "Affordable Fee", desc: "Budget-Friendly" },
  { icon: Languages, title: "Multilingual Tutors", desc: "Global Language Experts" },
  { icon: User, title: "One-on-One Classes", desc: "Focuses on Individual Attention" },
  { icon: UserPlus, title: "Substitute Teachers", desc: "Dedicated Team of Substitute Teachers" },
  { icon: CreditCard, title: "Easy Online Payments", desc: "One-Click Payments" },
  { icon: Globe, title: "Global Reputation", desc: "Trusted by Students Worldwide" },
  { icon: BarChart3, title: "Progress Report", desc: "Knowledge Assessment" },
  { icon: BookOpen, title: "Online Portal", desc: "Student Classes Records & History" },
];

const whyChooseColors = [
  { bg: "bg-teal-500", text: "text-teal-600", border: "border-b-teal-500" },
  { bg: "bg-blue-500", text: "text-blue-600", border: "border-b-blue-500" },
  { bg: "bg-amber-500", text: "text-amber-600", border: "border-b-amber-500" },
  { bg: "bg-rose-500", text: "text-rose-600", border: "border-b-rose-500" },
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
      <section className="pt-10 md:pt-16 pb-20 md:pb-28 px-4 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">Our <span className="text-primary-600">Courses</span></h2>
          <p className="section-subtitle">Our courses are crafted to provide a comprehensive understanding of Quranic studies. Join structured, in-depth classes taught by qualified scholars.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {courses.map((c, i) => (
              <div key={i} className="fade-up group relative rounded-2xl border border-gray-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative h-40 shrink-0">
                  <Image src={c.image} alt={c.title} width={400} height={240} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 px-3 py-1 text-[10px] font-bold rounded-full text-white shadow bg-primary-600">Course</span>
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{c.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{c.desc}</p>
                  <div className="flex gap-2">
                    <span className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold cursor-pointer">Details</span>
                    <Link href="/register" className="flex-1 text-center py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold">Register</Link>
                  </div>
                </div>
                {/* Slide-up overlay */}
                <div className="absolute inset-0 bg-gray-900/95 rounded-2xl translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 flex flex-col p-5">
                  <h3 className="text-white font-bold text-sm mb-2 leading-tight">{c.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed flex-1">{c.desc}</p>
                  <div className="flex gap-2">
                    <span className="flex-1 text-center py-2 rounded-lg border border-gray-500 text-white text-xs font-semibold cursor-pointer">Details</span>
                    <Link href="/register" className="flex-1 text-center py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold">Register</Link>
                  </div>
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
          <p className="section-subtitle">Discover what makes our platform unique, with expert instructors and tailored learning experiences designed for your success.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {whyChoose.map((w, i) => {
              const c = whyChooseColors[i % 4];
              return (
                <div key={i} className={`fade-up flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 border-b-4 ${c.border} hover:shadow-lg transition-all`}>
                  <div className={`w-14 h-14 rounded-xl ${c.bg} text-white flex items-center justify-center mb-4`}>
                    <w.icon size={24} />
                  </div>
                  <h4 className={`font-bold ${c.text} text-xs uppercase tracking-wider mb-2`}>{w.title}</h4>
                  <div className={`w-8 h-0.5 ${c.bg} rounded-full mb-2`} />
                  <p className="text-gray-500 text-xs">{w.desc}</p>
                </div>
              );
            })}
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

      {/* ── Fees and Pricing ── */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="section-divider"><span className="dot" /></div>
          <h2 className="section-title">Fees and <span className="text-primary-600">Pricing</span></h2>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-3">Affordable and Flexible Pricing Plans</h3>
          <p className="text-gray-500 text-center text-sm max-w-3xl mx-auto mb-10 leading-relaxed">
            We offer competitive pricing for all our courses to ensure that quality Islamic education is accessible to everyone. Our flexible payment options make it easy to start your learning journey.
          </p>

          {/* Pricing highlights */}
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            <div className="flex items-center gap-4 p-5 rounded-xl bg-teal-50 border border-teal-100">
              <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0">
                <Percent size={22} />
              </div>
              <div>
                <h4 className="font-bold text-teal-700 text-sm">Competitive Rates</h4>
                <p className="text-gray-500 text-xs">Best value pricing</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-xl bg-blue-50 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                <LayoutGrid size={22} />
              </div>
              <div>
                <h4 className="font-bold text-blue-700 text-sm">Flexible Plans</h4>
                <p className="text-gray-500 text-xs">Multiple options</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-xl bg-amber-50 border border-amber-100">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Star size={22} />
              </div>
              <div>
                <h4 className="font-bold text-amber-700 text-sm">Quality Education</h4>
                <p className="text-gray-500 text-xs">Expert instructors</p>
              </div>
            </div>
          </div>

          {/* Limited time offer banner */}
          <div className="flex items-center justify-between gap-4 p-5 rounded-xl bg-rose-50 border border-rose-200 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                <Percent size={18} />
              </div>
              <div>
                <h4 className="font-bold text-rose-600 text-sm">Limited Time Offer</h4>
                <p className="text-gray-600 text-xs">Hurry up! Special discount to make your learning more affordable.</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 items-center justify-center shrink-0 hidden sm:flex">
              <Clock size={18} />
            </div>
          </div>

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
