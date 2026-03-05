"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle, BookOpen, Clock, Users, Award,
  Mail, User, MessageCircle, Star,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import CountryPhoneFields from "@/components/CountryPhoneFields";
import { findCountryByCode } from "@/lib/countries";
import { WHATSAPP_PK, WHATSAPP_UK } from "@/lib/constants";

const features = [
  { icon: Users, text: "Qualified Male & Female Teachers" },
  { icon: Clock, text: "24/7 Flexible Scheduling" },
  { icon: BookOpen, text: "Special Classes for Kids & Adults" },
  { icon: Award, text: "Free 3-Day Trial — No Payment Required" },
  { icon: Star, text: "One-on-One Live Sessions" },
  { icon: CheckCircle, text: "Personalized Learning Plan" },
];

const testimonials = [
  { name: "Fatima Ahmed", location: "London, UK", text: "The online classes have truly transformed my understanding of Tajweed. My teacher is incredibly patient and knowledgeable." },
  { name: "Omar Hassan", location: "New York, USA", text: "My children love their Quran classes. The teachers are kind and make learning fun and engaging for young students." },
  { name: "Aisha Khan", location: "Toronto, Canada", text: "Flexible scheduling was exactly what I needed. I can balance work and Quran studies perfectly now." },
  { name: "Yusuf Ali", location: "Sydney, Australia", text: "The Hifz program is exceptional. My son has memorized 10 Juz in just one year with their structured approach." },
  { name: "Sarah Mahmood", location: "Dubai, UAE", text: "Best online Quran academy I have found. Professional teachers and excellent customer support throughout." },
  { name: "Ibrahim Syed", location: "Chicago, USA", text: "My daughter started as a complete beginner. Now she reads Quran fluently with proper Tajweed. Highly recommend!" },
];

const inputClass =
  "w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm bg-white";
const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-400";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check email uniqueness for active trials
      const checkRes = await fetch("/api/trials/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const checkJson = await checkRes.json();
      if (checkJson.exists) {
        setError("A trial request with this email already exists. Our team will contact you soon.");
        setLoading(false);
        return;
      }

      // 1. Save to database
      const countryName = findCountryByCode(form.countryCode)?.name || form.countryCode;
      const supabase = createClient();
      await supabase.from("contact_submissions").insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: countryName,
        message: form.message || null,
        source: "register",
      });

      // 2. Send WhatsApp notification to admin
      await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, country: countryName, source: "register" }),
      });

      setLoading(false);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Main Registration Section ── */}
      <section className="relative bg-gradient-to-b from-teal-50/60 to-white py-12 md:py-20 overflow-hidden">
        <div className="hero-blob w-[500px] h-[500px] bg-primary-300 -top-40 -left-40 opacity-[0.08]" />
        <div className="hero-blob w-[400px] h-[400px] bg-gold-300 -bottom-32 -right-32 opacity-[0.06]" />
        <div className="relative section-container px-4 sm:px-6">
          {/* Logo + Heading — spans full width */}
          <div className="flex items-center justify-center gap-5 mb-10">
            <Image
              src="/assets/images/logo.png"
              alt="Hasnain Online Quran Academy"
              width={80}
              height={80}
              className="rounded-full shadow-lg shrink-0"
            />
            <div>
              <p className="text-2xl font-bold text-gray-900 font-heading mb-1">
                Hasnain Online Quran Academy
              </p>
              <p className="text-gray-400 text-sm">Your Gateway to Islamic Education</p>
              <div className="flex items-center gap-3 mt-2">
                <a href={WHATSAPP_PK.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-green-700 font-medium text-sm hover:text-green-800 transition-colors duration-150">
                  <MessageCircle size={14} />
                  {WHATSAPP_PK.display}
                </a>
                <span className="text-gray-300">|</span>
                <a href={WHATSAPP_UK.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-green-700 font-medium text-sm hover:text-primary-600 transition-colors duration-150">
                  <MessageCircle size={14} />
                  UK: {WHATSAPP_UK.display}
                </a>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* ── Left: Form ── */}
            <div>
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {submitted ? (
                <div className="p-10 rounded-2xl bg-white shadow-xl border border-gray-100 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={40} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-3 font-heading">
                    Thank You!
                  </p>
                  <p className="text-gray-500 mb-6">
                    Our team will contact you within 24 hours to schedule your free trial class.
                  </p>
                  <Link href="/" className="btn-primary">
                    Back to Home
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2 font-heading">
                    Free Trial Class
                  </p>
                  <p className="text-gray-400 text-sm text-center mb-8">
                    Register now and start learning within 24 hours
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <User size={18} className={iconClass} />
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" className={inputClass} />
                      </div>
                      <div className="relative">
                        <Mail size={18} className={iconClass} />
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" className={inputClass} />
                      </div>
                    </div>

                    {/* Country + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <CountryPhoneFields
                        country={form.countryCode}
                        phone={form.phone}
                        onChange={(code, ph) => setForm({ ...form, countryCode: code, phone: ph })}
                        inputClass={inputClass}
                        iconClass={iconClass}
                      />
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <MessageCircle size={18} className="absolute left-3.5 top-4 text-primary-400" />
                      <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Enter your message" className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm resize-none bg-white" />
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-4 bg-primary-600 hover:bg-primary-700 hover:scale-[1.01] active:scale-[0.99] text-white font-bold rounded-2xl transition-all duration-200 ease-out shadow-md hover:shadow-lg text-base disabled:opacity-50">
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* ── Right: Promotional Panel ── */}
            <div className="hidden lg:block">
              <div className="sticky top-32 space-y-6">
                {/* Feature Highlights */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-0">
                  {features.map((f, i) => (
                    <div key={i} className={`flex items-center gap-3 py-3.5 ${i < features.length - 1 ? "border-b border-gray-100" : ""}`}>
                      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                        <f.icon size={20} />
                      </div>
                      <span className="text-gray-700 font-medium text-sm">{f.text}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Trust badge — spans full width */}
          <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center shadow-md">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-gold-400 text-lg">&#9733;</span>
              ))}
            </div>
            <p className="text-sm font-medium">
              Trusted by 5,000+ students worldwide
            </p>
            <p className="text-xs text-white/60 mt-1">
              Rated 4.9/5 by our student community
            </p>
          </div>
        </div>
      </section>

      {/* ── Student Testimonials ── */}
      <section className="section-padding bg-gray-50/80">
        <div className="section-container px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 font-heading mb-2">
            What Our <span className="text-primary-600">Students Say</span>
          </h2>
          <p className="text-gray-400 text-sm text-center mb-10">
            Hear from families who have experienced our classes firsthand
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
