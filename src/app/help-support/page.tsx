import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Star,
  BookOpen,
  Clock,
  Shield,
  CreditCard,
  Monitor,
  Users,
  Globe,
  Headphones,
} from "lucide-react";
import HeroContactForm from "@/components/HeroContactForm";
import { WHATSAPP_PK, WHATSAPP_UK, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Help & Support",
  description:
    "Get help and support from Hasnain Online Quran Academy. Find answers to FAQs, contact us via WhatsApp, email, or phone.",
  alternates: { canonical: "/help-support" },
  openGraph: {
    title: "Help & Support — Hasnain Online Quran Academy",
    description: "Find answers to FAQs, contact us via WhatsApp, email, or phone.",
    url: "/help-support",
    type: "website",
  },
};

const faqs = [
  {
    q: "How do online Quran classes work?",
    a: "Our classes are conducted one-on-one via Skype or Zoom. You connect with your assigned teacher at your scheduled time. All you need is a stable internet connection, a device (computer, tablet, or phone), and a headset for clear audio.",
  },
  {
    q: "What age groups do you teach?",
    a: "We teach students of all ages — from children as young as 4 years old to adults and seniors. Our teachers are trained to adapt their teaching style according to the student's age and learning ability.",
  },
  {
    q: "How do I schedule my classes?",
    a: "After registration, our team will work with you to find a class time that fits your schedule. You can choose any time slot that works for you, 7 days a week. Class timings are flexible and can be adjusted as needed.",
  },
  {
    q: "What courses do you offer?",
    a: "We offer Noorani Qaida, Quran Reading with Tajweed, Quran Memorization (Hifz), Tafsir, Arabic Language, Islamic Studies, Taleem ul Islam, Online Ijazah, Quranic Arabic, as well as academic subjects like Math, English, Urdu, and Science.",
  },
  {
    q: "Can I get a free trial class?",
    a: "Yes! We offer free trial classes so you can experience our teaching quality before enrolling. Simply fill out the registration form on our website or contact us via WhatsApp to book your free trial.",
  },
  {
    q: "What are the fees for classes?",
    a: "Our fees vary depending on the course and number of classes per week. We offer affordable packages starting from as low as $30/month. Contact us for detailed pricing information tailored to your needs.",
  },
  {
    q: "What if I need to reschedule a class?",
    a: "We understand that schedules can change. You can reschedule your class by informing your teacher or our admin team at least 2 hours before the scheduled time. We are flexible and accommodating.",
  },
  {
    q: "Are your teachers certified?",
    a: "Yes, all our Quran teachers are Hafiz/Hafiza with Ijazah certification. They have years of teaching experience and are trained in modern online teaching methods. Academic subject teachers hold relevant degrees in their fields.",
  },
  {
    q: "What platform do you use for classes?",
    a: "We primarily use Skype and Zoom for our online classes. Both platforms are free to use and work on computers, tablets, and smartphones. We can also accommodate other platforms upon request.",
  },
  {
    q: "How can I track my child's progress?",
    a: "Our teachers provide regular progress updates to parents. You can also sit in on classes anytime to observe. We maintain records of each student's progress and share monthly reports upon request.",
  },
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: `WhatsApp (${WHATSAPP_PK.label})`,
    desc: "Chat with us instantly for quick support.",
    value: WHATSAPP_PK.display,
    href: WHATSAPP_PK.href,
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MessageCircle,
    title: `WhatsApp (${WHATSAPP_UK.label})`,
    desc: "Chat with us on our UK number.",
    value: WHATSAPP_UK.display,
    href: WHATSAPP_UK.href,
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    desc: "Send us a detailed message.",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    color: "bg-gold-100 text-gold-600",
  },
];

const bonusFeatures = [
  { icon: Star, text: "Kalimas and Aqeedah fundamentals" },
  { icon: BookOpen, text: "Daily prayers and Salah instructions" },
  { icon: Users, text: "Islamic etiquette and greetings" },
  { icon: Globe, text: "Prophetic guidance for all ages" },
];

const whyUs = [
  { icon: Shield, title: "Safe & Secure", desc: "Safe online learning environment with vetted, certified teachers." },
  { icon: Clock, title: "24/7 Availability", desc: "Classes available around the clock to fit any timezone worldwide." },
  { icon: CreditCard, title: "Affordable Pricing", desc: "Quality education at competitive prices with flexible payment options." },
  { icon: Monitor, title: "One-on-One Classes", desc: "Personalized attention with dedicated one-on-one live sessions." },
  { icon: Headphones, title: "Dedicated Support", desc: "Our support team is always available to help with any questions." },
  { icon: Globe, title: "Global Reach", desc: "Serving students in 100+ countries with teachers from around the world." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HelpSupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="hero-blob w-[500px] h-[500px] bg-primary-400 -top-48 -right-48 opacity-15" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-400 -bottom-40 -left-40 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            Help &amp; Support
          </span>
          <h1 className="font-heading mb-6">
            We&apos;re Here to <span className="text-gold-400">Help You</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Welcome to Hasnain Online Quran Academy&apos;s Help &amp; Support page. We are here to assist you with any questions or issues you may have.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 30 C360 80 1080 0 1440 50 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Main 2/3 + 1/3 Layout */}
      <section className="section-padding bg-white">
        <div className="section-container flex flex-col lg:flex-row gap-10">

          {/* Left Content Column (2/3) */}
          <div className="lg:w-2/3 space-y-16">

            {/* Bonus Islamic Learning */}
            <div>
              <div className="fade-up p-7 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Star className="text-primary-600" size={24} />
                  </div>
                  <h2 className="!text-xl font-bold text-gray-900 font-heading">Bonus Islamic Learning in Every Session</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Every class includes a 5-10 minute optional Islamic lesson to enrich your learning experience. These short sessions cover essential Islamic knowledge:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {bonusFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
                      <f.icon className="text-primary-500 shrink-0" size={18} />
                      <span className="text-gray-700 text-sm">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div>
              <h2 className="font-heading text-gray-900 mb-2">Get in <span className="text-primary-600">Touch</span></h2>
              <p className="text-gray-500 mb-8">Choose your preferred way to reach us. We typically respond within minutes.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((m, i) => (
                  <a
                    key={i}
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="fade-up flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary-200 transition-all duration-200 ease-out group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center shrink-0`}>
                      <m.icon size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-0.5 group-hover:text-primary-600 transition-colors duration-150">{m.title}</p>
                      <p className="text-gray-400 text-xs mb-1.5">{m.desc}</p>
                      <span className="text-primary-600 font-semibold text-sm">{m.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="section-line" />

            {/* Why Choose Us */}
            <div>
              <h2 className="font-heading text-gray-900 mb-2">Why Choose <span className="text-primary-600">Our Academy?</span></h2>
              <p className="text-gray-500 mb-8">Here&apos;s what makes us the trusted choice for online Quran education.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyUs.map((item, i) => (
                  <div key={i} className="fade-up flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-line" />

            {/* FAQ */}
            <div>
              <h2 className="font-heading text-gray-900 mb-2">Frequently Asked <span className="text-primary-600">Questions</span></h2>
              <p className="text-gray-500 mb-8">Find quick answers to common questions about our academy.</p>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="fade-up group rounded-2xl border border-gray-100 shadow-sm hover:border-primary-200 transition-all duration-200 ease-out overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="text-primary-500 shrink-0" size={20} />
                        <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                      </div>
                      <ChevronDown className="text-gray-400 shrink-0 transition-transform duration-200 group-open:rotate-180" size={18} />
                    </summary>
                    <div className="px-5 pb-5 pl-12">
                      <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar — Sticky Register Form (1/3) */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <HeroContactForm />
            </div>
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
            Still Have <span className="text-gold-400">Questions?</span>
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Don&apos;t hesitate to reach out. Our team is ready to help you start your Quran learning journey!
          </p>
          <Link href="/register" className="btn-gold text-lg !px-10 !py-4">
            Get Free Trial <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
