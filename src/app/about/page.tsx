import type { Metadata } from "next";
import { Eye, Heart, GraduationCap, Target, Users, ArrowRight, BookOpen, Globe, Award, Clock, Monitor, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import HeroContactForm from "@/components/HeroContactForm";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hasnain Online Quran Academy — founded in 2018, serving 5,000+ students across 100+ countries with certified Quran teachers.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Hasnain Online Quran Academy",
    description: "Founded in 2018, serving 5,000+ students across 100+ countries with certified Quran teachers.",
    url: "/about",
    type: "website",
  },
};

const whyChoose = [
  { icon: GraduationCap, title: "Expert Tutors", desc: "Highly qualified and experienced Ijazah-certified instructors who bring years of teaching expertise to every lesson." },
  { icon: Clock, title: "Flexible Learning", desc: "Online classes that fit your schedule, allowing you to learn at your own pace from anywhere in the world." },
  { icon: BookOpen, title: "Comprehensive Curriculum", desc: "A wide range of courses covering various aspects of Quranic and Islamic studies for all levels." },
  { icon: Monitor, title: "Interactive Learning", desc: "Engaging one-on-one live sessions with multimedia resources for the best learning outcomes." },
  { icon: Users, title: "Community Support", desc: "Join a supportive community of learners and educators dedicated to your spiritual growth." },
];

const regularCourses = [
  "Noorani Qaida Online",
  "Quran Reading with Tajweed",
  "Quran Memorization (Hifz)",
  "Learn Tafsir Online",
  "Learn Arabic Online",
  "Islamic Studies Online",
  "Taleem ul Islam",
  "Online Ijazah Course",
  "Quranic Arabic Course",
];

const academicCourses = [
  "Quran Translation Course",
  "Mathematics",
  "English",
  "Urdu",
  "Science",
  "Other Subjects (On Request)",
];

const steps = [
  { num: "01", title: "Register & Get Started", desc: "Create your free account and join thousands of students already learning with us." },
  { num: "02", title: "Choose Your Course", desc: "Select from our comprehensive range of Quranic, Islamic, and academic courses." },
  { num: "03", title: "Start Interactive Learning", desc: "Begin your personalized one-on-one learning experience with a certified tutor." },
  { num: "04", title: "Achieve Your Goals", desc: "Track your progress, complete milestones, and receive certificates upon completion." },
];

export default function AboutPage() {
  const tCount = "100+";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            About Us
          </span>
          <h1 className="font-heading mb-6">
            Welcome to <span className="text-gold-400">Hasnain Online Quran Academy</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Dedicated to delivering high-quality Islamic education through comprehensive online courses, making Quranic and Islamic studies accessible to everyone, regardless of location.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 30 C360 80 1080 0 1440 50 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* About Introduction */}
      <section className="section-padding bg-gray-50/80">
        <div className="section-container px-4 sm:px-6">
          <h2 className="font-heading text-gray-900 mb-2 text-center">Who <span className="text-primary-600">We Are</span></h2>
          <div className="w-16 h-1 bg-primary-600 rounded-full mx-auto mb-8" />
          <div className="max-w-4xl mx-auto space-y-5 text-gray-600 leading-relaxed">
            <p>
              Hasnain Online Quran Institute is an online Quran academy that provides high-quality Quranic education to students of all ages and backgrounds. This institute is run by students of <span className="font-semibold text-gray-900">Alhuda Dr. Farhat Hashmi</span>, who are committed to upholding the principles of Islam while providing accessible and convenient Quranic education. Our institute aims to provide a supportive learning environment where students can enhance their spiritual growth and strengthen their moral character through the study of the Quran.
            </p>
            <p>
              At Hasnain Online Quran Academy, we believe that every individual should have the opportunity to learn the Quran, regardless of their location or circumstances. That&apos;s why we offer a range of Quranic courses taught by certified teachers who follow Islamic principles. Our mission is to promote Quranic education and make it accessible to everyone. This is an Online Quran Academy run by <span className="font-semibold text-gray-900">Alhuda Dr. Farhat Hashmi Students</span>, and we are dedicated to providing our students with the tools and knowledge they need to connect with the Quran and enhance their spiritual journey.
            </p>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* Main 2/3 + 1/3 Layout */}
      <section className="section-padding bg-white">
        <div className="section-container flex flex-col lg:flex-row gap-10">

          {/* ── Left Content Column (2/3) ── */}
          <div className="lg:w-2/3 space-y-16">

            {/* Mission & Vision */}
            <div>
              <h2 className="font-heading text-gray-900 mb-2">Our Mission <span className="text-primary-600">&amp; Vision</span></h2>
              <p className="text-gray-500 mb-8">Guided by faith, driven by purpose.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="fade-up p-7 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                    <Target className="text-primary-600" size={24} />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-2">Our Mission</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To spread the knowledge of Islam and the teachings of the Quran to people worldwide. We provide an interactive and engaging learning experience that fosters a deeper understanding of Islamic principles and practices through certified, one-on-one instruction.
                  </p>
                </div>
                <div className="fade-up p-7 rounded-2xl bg-gradient-to-br from-gold-50 to-white border border-gold-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mb-4">
                    <Eye className="text-gold-600" size={24} />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-2">Our Vision</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To become the leading online platform for Islamic education, recognized for our commitment to excellence and authenticity. We envision a world where every Muslim has access to quality Quranic education regardless of their location or background.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="font-heading text-gray-900 mb-2">Why Choose <span className="text-primary-600">Our Academy?</span></h2>
              <p className="text-gray-500 mb-8">What sets us apart in online Islamic education.</p>
              <div className="space-y-4">
                {whyChoose.map((item, i) => (
                  <div key={i} className="fade-up flex gap-5 p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Courses */}
            <div>
              <h2 className="font-heading text-gray-900 mb-2">Our <span className="text-primary-600">Courses</span></h2>
              <p className="text-gray-500 mb-8">We offer a variety of courses to meet your learning needs.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="fade-up p-6 rounded-2xl bg-primary-50/50 border border-primary-100">
                  <p className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="text-primary-600" size={20} />
                    Quran &amp; Islamic Courses
                  </p>
                  <ul className="space-y-2.5">
                    {regularCourses.map((c, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                        <CheckCircle2 className="text-primary-500 shrink-0" size={16} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="fade-up p-6 rounded-2xl bg-gold-50/50 border border-gold-100">
                  <p className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="text-gold-600" size={20} />
                    Academic Courses
                  </p>
                  <ul className="space-y-2.5">
                    {academicCourses.map((c, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                        <CheckCircle2 className="text-gold-500 shrink-0" size={16} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Our Approach */}
            <div>
              <h2 className="font-heading text-gray-900 mb-2">Our <span className="text-primary-600">Approach</span></h2>
              <p className="text-gray-500 mb-8">How we deliver the best Islamic education online.</p>
              <div className="fade-up bg-gray-50 p-7 rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mb-5">
                  <Heart className="text-primary-600" size={26} />
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We believe in a holistic approach to Islamic education. Our courses are designed to provide a comprehensive understanding of Islamic teachings, blending traditional knowledge with modern educational methods.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We emphasize the importance of understanding the context and application of Islamic principles in everyday life. Our qualified scholars ensure that each student receives personalized attention and guidance.
                </p>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Whether you are a beginner learning to read the Quran or an advanced student pursuing Hifz or Ijazah certification, our academy combines the richness of traditional Islamic scholarship with the convenience of modern technology to help you succeed.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Sidebar — Sticky Register Form (1/3) ── */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <HeroContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 py-12 overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[400px] h-[400px] bg-primary-400 -top-40 -left-40 opacity-10" />
        <div className="relative section-container px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "5,000+", label: "Students Worldwide", icon: Users },
            { value: "100+", label: "Countries", icon: Globe },
            { value: tCount, label: "Certified Teachers", icon: Award },
            { value: "50+", label: "Courses Offered", icon: BookOpen },
          ].map((s, i) => (
            <div key={i} className="fade-up">
              <s.icon className="mx-auto mb-3 text-gold-300" size={30} />
              <div className="text-3xl md:text-4xl font-bold font-heading">{s.value}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps to Learn */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <h2 className="section-title">Steps to <span className="text-primary-600">Learn with Us</span></h2>
          <p className="section-subtitle">Start your Quran learning journey in four simple steps.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="fade-up relative text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary-200 transition-all duration-200 ease-out group">
                <div className="w-14 h-14 rounded-full bg-primary-600 text-white text-lg font-bold flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-700 transition-colors duration-150">
                  {s.num}
                </div>
                <p className="font-bold text-gray-900 mb-2">{s.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary-300" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            Join Our <span className="text-gold-400">Community</span>
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Ready to learn from the best? Enroll now and start your journey with Hasnain Online Quran Academy!
          </p>
          <Link href="/register" className="btn-gold text-lg !px-10 !py-4">
            Register Now <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
