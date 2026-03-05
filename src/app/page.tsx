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
  Target,
  Play,
  Heart,
  Award,
} from "lucide-react";
import HeroContactForm from "@/components/HeroContactForm";
import VideoCard from "@/components/VideoCard";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Learn Quran Online with Certified Teachers",
  description:
    "Hasnain Online Quran Academy offers high-quality online Quran education with Tajweed, Hifz programs, and academic subjects. Start your free trial today.",
  alternates: { canonical: "/" },
};

/* ─── Data ─── */
const staticStats = [
  { value: "5,000+", label: "Students", icon: Users, color: "bg-teal-500" },
  { value: "50+", label: "Courses", icon: BookOpen, color: "bg-blue-500" },
  { value: "100+", label: "Teachers", icon: GraduationCap, color: "bg-amber-500" },
  { value: "100+", label: "Countries", icon: Globe, color: "bg-rose-500" },
];

const visionCards = [
  {
    label: "VISION", badge: "Excellence", icon: GraduationCap,
    gradient: "from-teal-500 to-emerald-400", iconBg: "bg-teal-700", titleColor: "text-teal-600", lineColor: "bg-teal-500",
    desc: "To become the world's leading online Quran academy, making authentic Islamic education accessible to every Muslim globally through innovative teaching methods and qualified scholars.",
  },
  {
    label: "VALUES", badge: "Quality", icon: Star,
    gradient: "from-amber-500 to-yellow-400", iconBg: "bg-amber-700", titleColor: "text-amber-600", lineColor: "bg-amber-500",
    desc: "Rooted in Islamic principles of knowledge, patience, and excellence. We maintain the highest standards of Quranic education while fostering respect, integrity, and spiritual growth in every student.",
  },
  {
    label: "SUPPORT", badge: "24/7", icon: Headphones,
    gradient: "from-blue-500 to-sky-400", iconBg: "bg-blue-700", titleColor: "text-blue-600", lineColor: "bg-blue-500",
    desc: "Dedicated multilingual support team available around the clock. From technical assistance to learning guidance, we ensure every student receives personalized attention and continuous encouragement.",
  },
  {
    label: "METHOD", badge: "Proven", icon: Target,
    gradient: "from-rose-500 to-pink-500", iconBg: "bg-rose-700", titleColor: "text-rose-600", lineColor: "bg-rose-500",
    desc: "Time-tested Tajweed principles combined with modern interactive technology. Personalized learning paths, one-on-one sessions, and progress tracking ensure effective Quran memorization and recitation.",
  },
];

const services = [
  { icon: BookOpen, title: "Quran Recitation", desc: "Learn proper Tajweed and beautiful recitation with certified instructors.", iconBg: "bg-primary-600" },
  { icon: Users, title: "Islamic Studies", desc: "Comprehensive Islamic education covering Fiqh, Hadith, and history.", iconBg: "bg-orange-500" },
  { icon: Clock, title: "Flexible Timing", desc: "Morning, evening, or weekend classes that fit your schedule.", iconBg: "bg-blue-500" },
  { icon: GraduationCap, title: "Certified Teachers", desc: "Learn from qualified scholars with years of experience.", iconBg: "bg-purple-500" },
  { icon: Heart, title: "Character Building", desc: "Develop Islamic character and moral values alongside learning.", iconBg: "bg-rose-500" },
  { icon: Award, title: "Excellence Program", desc: "Advanced courses for deeper understanding of Islamic sciences.", iconBg: "bg-teal-500" },
];

const trustBadges = [
  { icon: Headphones, title: "24/7 Support", desc: "Writers and Support available around the clock", iconBg: "bg-primary-600", titleColor: "text-primary-600", borderColor: "border-primary-100" },
  { icon: Shield, title: "Safe Service", desc: "Privacy and Confidentiality Guarantee", iconBg: "bg-orange-500", titleColor: "text-orange-500", borderColor: "border-orange-100" },
  { icon: Star, title: "Quality Score", desc: "4.72 Average Quality Score", iconBg: "bg-blue-500", titleColor: "text-blue-500", borderColor: "border-blue-100" },
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
  { country: "New Zealand", flag: "🇳🇿", price: "$60", currency: "NZD" },
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
  {
    step: 1, title: "Register & Get Started", icon: UserPlus,
    iconBg: "bg-teal-100 text-teal-600", badgeBg: "bg-green-500", titleColor: "text-teal-600", lineColor: "bg-teal-500",
    desc: "Create your account and join thousands of students beginning their sacred Quran learning journey with our expert tutors.",
  },
  {
    step: 2, title: "Choose Your Course", icon: BookOpen,
    iconBg: "bg-blue-100 text-blue-600", badgeBg: "bg-blue-500", titleColor: "text-blue-600", lineColor: "bg-blue-500",
    desc: "Select from our comprehensive range of Quran courses tailored for beginners to advanced learners with flexible schedules.",
  },
  {
    step: 3, title: "Start Interactive Learning", icon: Play,
    iconBg: "bg-amber-100 text-amber-600", badgeBg: "bg-amber-500", titleColor: "text-amber-600", lineColor: "bg-amber-500",
    desc: "Begin your personalized Quran learning experience with one-on-one sessions, interactive tools, and progress tracking.",
  },
  {
    step: 4, title: "Achieve Certification", icon: Target,
    iconBg: "bg-rose-100 text-rose-600", badgeBg: "bg-rose-500", titleColor: "text-rose-600", lineColor: "bg-rose-500",
    desc: "Complete your course and receive an official certificate recognizing your Quran learning achievement and dedication.",
  },
];

export default function Home() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Online Quran & Islamic Courses",
    itemListElement: courses.slice(0, 10).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.title,
        description: c.desc,
        provider: {
          "@type": "EducationalOrganization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        offers: {
          "@type": "Offer",
          category: "Paid",
          priceCurrency: "USD",
          price: "40",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* ── Hero — split layout ── */}
      <section className="relative bg-gradient-to-b from-white via-teal-50/30 to-teal-50/50 py-12 md:py-16 overflow-hidden">
        {/* Blurred color blobs for depth */}
        <div className="hero-blob w-[500px] h-[500px] bg-primary-300 -top-40 -left-40" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-300 -bottom-32 -right-32 opacity-10" />
        <div className="relative section-container px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="pt-4">
              <h1 className="text-gray-900 font-heading mb-3">
                Welcome to <span className="text-primary-600">Hasnain Online</span> Quran Academy
              </h1>
              <div className="w-16 h-1 bg-primary-600 rounded-full mb-6" />
              <p className="text-lg md:text-xl font-medium text-gray-700 mb-5">
                Your Gateway to Comprehensive Islamic Education
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-7 max-w-lg">
                Hasnain Online Quran Academy offers high-quality Islamic education globally, making Quran and Islamic studies accessible, convenient, and effective through our online courses.
              </p>
              <Link href="/register" className="btn-primary !px-8 !py-3.5">
                Get Free Trial
              </Link>
            </div>

            {/* Free Trial Form */}
            <HeroContactForm />
          </div>

          {/* Trust Badges */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            {trustBadges.map((b, i) => (
              <div key={i} className={`flex items-center gap-3.5 p-5 rounded-2xl bg-white border ${b.borderColor} shadow-sm hover:shadow-md transition-shadow`}>
                <div className={`w-12 h-12 rounded-xl ${b.iconBg} flex items-center justify-center shrink-0`}>
                  <b.icon size={20} className="text-white" />
                </div>
                <div>
                  <p className={`font-bold ${b.titleColor} text-sm`}>{b.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Our Services ── */}
      <section className="section-padding bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-emerald-50/30">
        <div className="section-container">
          <div className="section-divider">
            <span className="dot" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3 italic">Our Services</h2>
          <p className="text-gray-600 text-sm text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Comprehensive Islamic education at <span className="font-bold text-gray-900">Hasnain Online Quran Academy</span> – nurturing spiritual growth and academic excellence.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <div key={i} className="fade-up flex items-start gap-4 p-6 rounded-2xl bg-white/80 border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl ${s.iconBg} text-white flex items-center justify-center shrink-0`}>
                  <s.icon size={22} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/courses" className="btn-primary !px-8 !py-3 !rounded-full">
              Explore All Services <ArrowRight className="ml-1.5" size={16} />
            </Link>
            <p className="text-gray-400 text-xs mt-3 italic">Begin your Islamic learning journey today</p>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Our Courses ── */}
      <section className="pt-12 md:pt-16 pb-14 md:pb-20 px-4 sm:px-6 bg-gradient-to-b from-teal-50/40 to-white">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">Our Courses</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-gray-500 text-sm text-center max-w-3xl mx-auto mb-10 leading-relaxed">Our courses are crafted to provide a comprehensive understanding of Quranic studies. Join structured, in-depth classes taught by qualified scholars.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {courses.map((c, i) => (
              <div key={i} className="fade-up group relative rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 ease-out bg-white overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative h-40 shrink-0">
                  <Image src={c.image} alt={c.title} width={400} height={240} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 px-3 py-1 text-[10px] font-bold rounded-full text-white shadow-sm bg-primary-600">Course</span>
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{c.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{c.desc}</p>
                  <div className="flex gap-2">
                    <span className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors duration-150">Details</span>
                    <Link href="/register" className="flex-1 text-center py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors duration-150">Register</Link>
                  </div>
                </div>
                {/* Slide-up overlay */}
                <div className="absolute inset-0 bg-gray-900/95 rounded-2xl translate-y-full group-hover:translate-y-0 transition-transform duration-250 ease-out z-10 flex flex-col p-5">
                  <p className="text-sm text-white font-bold mb-2 leading-tight">{c.title}</p>
                  <p className="text-gray-300 text-xs leading-relaxed flex-1">{c.desc}</p>
                  <div className="flex gap-2">
                    <span className="flex-1 text-center py-2 rounded-lg border border-gray-500 text-white text-xs font-medium cursor-pointer">Details</span>
                    <Link href="/register" className="flex-1 text-center py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold">Register</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Who We Are ── */}
      <section className="section-padding bg-gray-50/80">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">Who We Are</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-base font-semibold text-gray-800 text-center mb-2">Your Trusted Online Quran Academy</p>
          <p className="text-gray-500 text-sm text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Established to bridge traditional Islamic education with modern technology, serving students worldwide with certified Quranic scholars and comprehensive curriculum designed for all skill levels.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {staticStats.map((s, i) => (
              <div key={i} className="fade-up bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                <div className={`w-11 h-11 rounded-full ${s.color} text-white flex items-center justify-center mx-auto mb-3`}>
                  <s.icon size={20} />
                </div>
                <div className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-1">{s.value}</div>
                <div className="text-gray-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Vision / Values / Support / Method */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visionCards.map((card, i) => (
              <div key={i} className="fade-up rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out bg-white overflow-hidden flex flex-col">
                {/* Gradient header */}
                <div className={`relative bg-gradient-to-r ${card.gradient} px-5 py-6`}>
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} text-white flex items-center justify-center`}>
                    <card.icon size={20} />
                  </div>
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-sm">{card.badge}</span>
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className={`font-bold ${card.titleColor} text-sm uppercase tracking-wider mb-3`}>{card.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{card.desc}</p>
                  <div className={`w-16 h-1 ${card.lineColor} rounded-full mt-4`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Why Choose Us ── */}
      <section className="section-padding bg-gray-50/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">Why Choose Us</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-gray-500 text-sm text-center max-w-3xl mx-auto mb-10 leading-relaxed">Discover what makes our platform unique, with expert instructors and tailored learning experiences designed for your success.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {whyChoose.map((w, i) => {
              const c = whyChooseColors[i % 4];
              return (
                <div key={i} className={`fade-up flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 border-b-4 ${c.border} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out`}>
                  <div className={`w-12 h-12 rounded-xl ${c.bg} text-white flex items-center justify-center mb-3`}>
                    <w.icon size={20} />
                  </div>
                  <p className={`font-semibold ${c.text} text-xs uppercase tracking-wider mb-1.5`}>{w.title}</p>
                  <div className={`w-8 h-0.5 ${c.bg} rounded-full mb-2`} />
                  <p className="text-gray-500 text-xs">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Teachers ── */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">Our Teachers</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-gray-500 text-sm text-center max-w-3xl mx-auto mb-10 leading-relaxed">Choose the teaching style that suits you best.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {teacherCategories.map((cat, i) => (
              <div key={i} className="fade-up p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out bg-white text-center">
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3">
                  <Users size={24} />
                </div>
                <p className="text-base font-bold text-gray-900 mb-2">{cat.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{cat.desc}</p>
                <Link href="/teachers" className="text-primary-600 hover:text-primary-700 text-sm font-semibold inline-flex items-center gap-1 transition-colors duration-150">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── How It Works ── */}
      <section className="section-padding bg-gray-50/80">
        <div className="section-container px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">Steps to Learn Quran with Us</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-gray-500 text-sm text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Learn the Quran online with the world&apos;s best Male/Female Quran tutors through our comprehensive step-by-step approach
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="fade-up relative rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out bg-white overflow-visible pt-6 px-5 pb-0 flex flex-col text-center items-center">
                {/* Step badge */}
                <span className={`absolute -top-3 -right-3 w-8 h-8 ${s.badgeBg} text-white text-sm font-bold rounded-full flex items-center justify-center shadow-sm`}>{s.step}</span>
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
                  <s.icon size={20} />
                </div>
                {/* Title */}
                <p className={`font-bold ${s.titleColor} text-sm mb-1`}>{s.title}</p>
                <div className={`w-10 h-0.5 ${s.lineColor} rounded-full mb-3`} />
                {/* Desc */}
                <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-5">{s.desc}</p>
                <div className={`w-full h-1 ${s.lineColor} rounded-b-2xl mt-auto`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Fees and Pricing ── */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">Fees and Pricing</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-base font-semibold text-gray-800 text-center mb-2">Affordable and Flexible Pricing Plans</p>
          <p className="text-gray-500 text-center text-xs max-w-3xl mx-auto mb-10 leading-relaxed">
            We offer competitive pricing for all our courses to ensure that quality Islamic education is accessible to everyone. Our flexible payment options make it easy to start your learning journey.
          </p>

          {/* Pricing highlights */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-teal-50 border border-teal-100">
              <div className="w-10 h-10 rounded-lg bg-teal-500 text-white flex items-center justify-center shrink-0">
                <Percent size={18} />
              </div>
              <div>
                <p className="font-semibold text-teal-700 text-sm">Competitive Rates</p>
                <p className="text-gray-500 text-xs">Best value pricing</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
                <LayoutGrid size={18} />
              </div>
              <div>
                <p className="font-semibold text-blue-700 text-sm">Flexible Plans</p>
                <p className="text-gray-500 text-xs">Multiple options</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-amber-50 border border-amber-100">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Star size={18} />
              </div>
              <div>
                <p className="font-semibold text-amber-700 text-sm">Quality Education</p>
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
                <p className="font-semibold text-rose-600 text-sm">Limited Time Offer</p>
                <p className="text-gray-600 text-xs">Hurry up! Special discount to make your learning more affordable.</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 items-center justify-center shrink-0 hidden sm:flex">
              <Clock size={18} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {fees.map((f, i) => (
              <div key={i} className="fade-up rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary-200 transition-all duration-200 ease-out bg-white p-5 text-center">
                <span className="text-2xl mb-1.5 block">{f.flag}</span>
                <p className="text-sm font-bold text-gray-900 mb-0.5">{f.country}</p>
                <div className="text-2xl font-bold text-primary-600 mb-0.5">{f.price}</div>
                <p className="text-gray-400 text-xs">per month</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            * These fees are for Quran &amp; Islamic courses only.
          </p>

          <div className="mt-8 p-6 rounded-2xl bg-primary-50 border border-primary-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-gray-900 mb-1">What&apos;s Included</p>
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

      <div className="section-line" />

      {/* ── Sample Classes ── */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">Sample Classes</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-gray-500 text-sm text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Watch sample recordings from our live classes to see how our teachers engage with students.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <VideoCard
              src="/assets/videos/Quran_Class.mp4"
              title="Quran Class"
              description="A sample session of our Quran recitation and Tajweed class with a certified instructor."
            />
            <VideoCard
              src="/assets/videos/Math_class.mp4"
              title="Mathematics Class"
              description="A sample session of our interactive Mathematics class for students."
            />
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ── Testimonials ── */}
      <section className="section-padding bg-gray-50/80">
        <div className="section-container px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-gray-900 mb-3">What Our Students Say</h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-5" />
          <p className="text-gray-500 text-sm text-center max-w-3xl mx-auto mb-10 leading-relaxed">Hear from families who have experienced our classes firsthand.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="fade-up p-7 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[600px] h-[600px] bg-primary-400 -top-64 -right-64 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-48 -left-48 opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">Begin Your Quran Journey Today</h2>
          <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mb-5" />
          <p className="text-white/70 text-sm mb-7 max-w-xl mx-auto">Sign up for a free 3-day trial and experience the quality of our teaching firsthand. No commitment required.</p>
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out shadow-md hover:shadow-lg">
            Register Now — It&apos;s Free <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
