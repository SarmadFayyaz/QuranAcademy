import Link from "next/link";
import {
  BookOpen,
  Clock,
  Award,
  Users,
  Globe,
  GraduationCap,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  DollarSign,
  Languages,
  User,
  UserPlus,
  CreditCard,
  BarChart3,
} from "lucide-react";

/* ─── Data ─── */
const services = [
  {
    icon: BookOpen,
    title: "Quran Recitation",
    desc: "Master Quran recitation with proper Tajweed rules under expert guidance.",
  },
  {
    icon: GraduationCap,
    title: "Islamic Studies",
    desc: "Comprehensive courses covering Fiqh, Hadith, Seerah, and Islamic history.",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    desc: "Choose class schedules that fit your lifestyle — available 24/7.",
  },
  {
    icon: Award,
    title: "Certified Teachers",
    desc: "Learn from Ijazah-certified scholars with years of teaching experience.",
  },
  {
    icon: Heart,
    title: "Character Building",
    desc: "Develop strong Islamic values and ethics alongside Quranic education.",
  },
  {
    icon: Sparkles,
    title: "Excellence Program",
    desc: "Advanced courses for dedicated students aiming for Hifz or scholarly paths.",
  },
];

const stats = [
  { value: "5,000+", label: "Students", icon: Users },
  { value: "50+", label: "Courses", icon: BookOpen },
  { value: "100+", label: "Teachers", icon: GraduationCap },
  { value: "50+", label: "Countries", icon: Globe },
];

const whyChoose = [
  { icon: DollarSign, title: "Affordable Fees", desc: "Quality education at budget-friendly prices for every family." },
  { icon: Languages, title: "Multilingual Tutors", desc: "Teachers fluent in English, Urdu, Arabic, and more." },
  { icon: User, title: "One-on-One Classes", desc: "Personalized attention for maximum learning progress." },
  { icon: UserPlus, title: "Substitute Teachers", desc: "Never miss a class — backup teachers always available." },
  { icon: CreditCard, title: "Easy Payments", desc: "Secure online payments with multiple options worldwide." },
  { icon: BarChart3, title: "Progress Reports", desc: "Regular assessments and detailed progress tracking." },
];

const plans = [
  { classes: 8, price: 30, days: "2 days/week", duration: "30 min", popular: false },
  { classes: 12, price: 45, days: "3 days/week", duration: "30 min", popular: true },
  { classes: 16, price: 55, days: "4 days/week", duration: "30 min", popular: false },
  { classes: 20, price: 65, days: "5 days/week", duration: "30 min", popular: false },
  { classes: 8, price: 45, days: "Weekends", duration: "30 min", popular: false, label: "Weekend" },
  { classes: 20, price: 120, days: "5 days/week", duration: "60 min", popular: false, label: "Hifz" },
];

const testimonials = [
  {
    name: "Fatima Ahmed",
    location: "London, UK",
    text: "The online classes have truly transformed my understanding of Tajweed. My teacher is incredibly patient and knowledgeable.",
    rating: 5,
  },
  {
    name: "Omar Hassan",
    location: "New York, USA",
    text: "My children love their Quran classes. The teachers are kind and make learning fun and engaging for young students.",
    rating: 5,
  },
  {
    name: "Aisha Khan",
    location: "Toronto, Canada",
    text: "Flexible scheduling was exactly what I needed. I can balance work and Quran studies perfectly now.",
    rating: 5,
  },
];

const steps = [
  { step: "01", title: "Register", desc: "Sign up for your free trial in under a minute." },
  { step: "02", title: "Choose Course", desc: "Select from our range of Quran and Islamic courses." },
  { step: "03", title: "Start Learning", desc: "Begin interactive one-on-one sessions with your teacher." },
  { step: "04", title: "Get Certified", desc: "Complete your course and receive your certificate." },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 lg:py-44 flex flex-col items-center text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            ✦ Your Gateway to Islamic Education
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading max-w-4xl leading-tight mb-6">
            Learn the <span className="text-gold-400">Holy Quran</span> Online
            with Expert Teachers
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
            Join thousands of students worldwide learning Quran with Tajweed,
            Islamic Studies, and Arabic from certified scholars — anytime,
            anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="btn-gold text-lg !px-9 !py-4">
              Get Free Trial
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link href="/about" className="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-lg !px-9 !py-4">
              Learn More
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/50 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-gold-400" /> Free 3-Day Trial
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-gold-400" /> One-on-One Classes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-gold-400" /> Certified Teachers
            </span>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 40 C360 100 1080 0 1440 60 L1440 100 L0 100Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">
            What We <span className="text-primary-700">Offer</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive Islamic education tailored to your needs and schedule.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="fade-up group p-7 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-5 transition-colors">
                  <s.icon className="text-primary-700" size={26} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative py-20 bg-gradient-to-r from-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center fade-up">
              <s.icon className="mx-auto mb-3 text-gold-400" size={32} />
              <div className="text-4xl md:text-5xl font-bold font-heading mb-1">
                {s.value}
              </div>
              <div className="text-white/60 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">
            Why Choose <span className="text-primary-700">Us</span>
          </h2>
          <p className="section-subtitle">
            Trusted by thousands of families across 50+ countries for quality Quran education.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((w, i) => (
              <div
                key={i}
                className="fade-up flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center shrink-0">
                  <w.icon className="text-gold-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{w.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">
            How It <span className="text-primary-700">Works</span>
          </h2>
          <p className="section-subtitle">
            Get started in four simple steps and begin your Quran learning journey.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="fade-up text-center">
                <div className="w-16 h-16 rounded-full bg-primary-700 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-700/30">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">
            Affordable <span className="text-primary-700">Plans</span>
          </h2>
          <p className="section-subtitle">
            Choose the plan that suits your learning goals. All plans include a free 3-day trial.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`fade-up relative rounded-2xl p-7 transition-all duration-300 hover:shadow-xl ${
                  p.popular
                    ? "bg-primary-800 text-white ring-4 ring-gold-400/30 shadow-xl scale-[1.02]"
                    : "bg-white border border-gray-100 hover:border-primary-200"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 text-white text-xs font-bold rounded-full shadow">
                    Most Popular
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className={`font-bold text-lg mb-1 ${p.popular ? "text-white" : "text-gray-900"}`}>
                    {p.label || `${p.classes} Classes`}
                    {p.label && <span className="text-sm font-normal opacity-70"> ({p.classes} classes)</span>}
                  </h3>
                  <p className={`text-sm ${p.popular ? "text-white/60" : "text-gray-400"}`}>
                    {p.days} · {p.duration}/session
                  </p>
                </div>
                <div className="text-center mb-6">
                  <span className={`text-5xl font-bold font-heading ${p.popular ? "text-gold-300" : "text-primary-700"}`}>
                    ${p.price}
                  </span>
                  <span className={`text-sm ${p.popular ? "text-white/50" : "text-gray-400"}`}>/month</span>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "One-on-One Live Sessions",
                    "Qualified Teachers",
                    "Tajweed Instruction",
                    "Flexible Scheduling",
                    "Progress Reports",
                  ].map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-sm ${
                        p.popular ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      <CheckCircle size={16} className={p.popular ? "text-gold-400" : "text-primary-600"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                    p.popular
                      ? "bg-gold-500 hover:bg-gold-600 text-white shadow-lg"
                      : "bg-primary-700 hover:bg-primary-800 text-white"
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">
            What Our <span className="text-primary-700">Students Say</span>
          </h2>
          <p className="section-subtitle">
            Hear from families who have experienced our classes firsthand.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="fade-up p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={18} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 bg-gradient-to-r from-primary-800 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-5">
            Begin Your Quran Journey <span className="text-gold-400">Today</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Sign up for a free 3-day trial and experience the quality of our
            teaching firsthand. No commitment required.
          </p>
          <Link href="/register" className="btn-gold text-lg !px-10 !py-4">
            Register Now — It&apos;s Free
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
