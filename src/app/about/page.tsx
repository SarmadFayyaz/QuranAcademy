import { Eye, Heart, Headphones, Lightbulb, Target, Shield, Users, ArrowRight, BookOpen, Globe, Award, Clock } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To become the world's leading online Quran academy, making authentic Islamic education accessible to every Muslim regardless of location or background.",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Rooted in Islamic principles — we emphasize knowledge, patience, sincerity, and excellence in everything we do.",
  },
  {
    icon: Headphones,
    title: "Our Support",
    desc: "A dedicated multilingual support team available around the clock to ensure smooth learning experiences for every student.",
  },
  {
    icon: Lightbulb,
    title: "Our Method",
    desc: "Time-tested Tajweed teaching methodology combined with modern interactive technology for the best learning outcomes.",
  },
];

const timeline = [
  { year: "2018", title: "Founded", desc: "Started with a vision to make Quran education accessible worldwide." },
  { year: "2019", title: "100 Students", desc: "Reached our first milestone of 100 enrolled students from 10 countries." },
  { year: "2021", title: "Global Reach", desc: "Expanded to serve students in 30+ countries with 50+ teachers." },
  { year: "2024", title: "5,000+ Students", desc: "Growing community of learners across 50+ countries with 100+ certified teachers." },
];

const values = [
  { icon: Target, title: "Excellence", desc: "We strive for the highest standards in Quran education and student outcomes." },
  { icon: Shield, title: "Authenticity", desc: "Preserving traditional Islamic scholarship with Ijazah-certified instruction." },
  { icon: Users, title: "Inclusivity", desc: "Making quality Quran education accessible and affordable for every family." },
  { icon: Clock, title: "Flexibility", desc: "Adapting to our students' schedules with 24/7 class availability." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            ✦ Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            About <span className="text-gold-400">Our Academy</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Dedicated to spreading the light of Quranic knowledge across the
            globe through technology and tradition.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 30 C360 80 1080 0 1440 50 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-5">
                Who <span className="text-primary-700">We Are</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hasnain Online Quran Academy is a premier online Islamic education
                platform serving thousands of students worldwide. Founded with a
                passion for making authentic Quran education accessible to all, we
                connect students with certified scholars for personalized
                one-on-one learning.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our academy combines the richness of traditional Islamic
                scholarship with the convenience of modern technology. Whether
                you&apos;re a beginner learning to read the Quran or an advanced
                student pursuing Hifz, we have the right course and teacher for
                you.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe, label: "50+ Countries" },
                  { icon: Users, label: "5,000+ Students" },
                  { icon: Award, label: "100+ Teachers" },
                  { icon: BookOpen, label: "50+ Courses" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary-50">
                    <s.icon className="text-primary-700" size={20} />
                    <span className="font-semibold text-gray-800 text-sm">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <BookOpen className="mx-auto text-primary-700 mb-4" size={64} />
                  <p className="text-primary-800 font-heading text-2xl font-bold">
                    &ldquo;The best among you are those who learn the Quran and teach it.&rdquo;
                  </p>
                  <p className="text-primary-600 mt-2 text-sm">— Prophet Muhammad (PBUH)</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold-400 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Our <span className="text-primary-700">Foundation</span></h2>
          <p className="section-subtitle">The four pillars that drive our mission and guide our work.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="fade-up flex gap-5 p-7 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <p.icon className="text-primary-700" size={26} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">Our <span className="text-primary-700">Journey</span></h2>
          <p className="section-subtitle">Key milestones in our growth story.</p>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-100" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={i} className="fade-up relative flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-full bg-primary-700 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-lg shadow-primary-700/20 z-10">
                    {t.year}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-bold text-gray-900 text-lg">{t.title}</h3>
                    <p className="text-gray-500 text-sm">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Core <span className="text-primary-700">Values</span></h2>
          <p className="section-subtitle">The principles that define who we are.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="fade-up text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-xl bg-gold-50 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-gold-600" size={26} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
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
            Join Our <span className="text-gold-400">Community</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Become part of a global family of Quran learners. Start your free trial today.
          </p>
          <Link href="/register" className="btn-gold text-lg !px-10 !py-4">
            Register Now <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
