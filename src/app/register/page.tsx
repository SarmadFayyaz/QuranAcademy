"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, BookOpen, Clock, Users, Award, Phone, Mail, User, Globe } from "lucide-react";

const benefits = [
  { icon: CheckCircle, text: "Free 3-Day Trial — No Payment Required" },
  { icon: Users, text: "One-on-One Live Sessions with Certified Teachers" },
  { icon: Clock, text: "Flexible Scheduling — 24/7 Availability" },
  { icon: BookOpen, text: "Personalized Learning Plan for Every Student" },
  { icon: Award, text: "Completion Certificates & Progress Reports" },
  { icon: Globe, text: "Multilingual Teachers from Around the World" },
];

const courses = [
  "Quran Recitation with Tajweed",
  "Quran Memorization (Hifz)",
  "Islamic Studies",
  "Arabic Language",
  "Quran Translation & Tafseer",
  "Kids Quran Program",
];

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    course: "",
    time: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "📚 *New Registration — Hasnain Online Quran Academy*",
      "",
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📱 *Phone:* ${form.phone}`,
      `🌍 *Country:* ${form.country}`,
      `📖 *Course:* ${form.course}`,
      form.time ? `🕐 *Preferred Time:* ${form.time}` : "",
      form.message ? `💬 *Message:* ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/923105175338?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 pattern-overlay" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-gold-300 text-sm font-medium mb-6 border border-white/10">
            ✦ Start Your Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
            Register <span className="text-gold-400">Now</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Sign up for your free 3-day trial and begin learning Quran with our
            certified teachers today.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 30 C360 80 1080 0 1440 50 L1440 80 L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Registration Form + Benefits */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                Get Your <span className="text-primary-700">Free Trial</span>
              </h2>
              <p className="text-gray-500 mb-8">
                Fill out the form below and we&apos;ll get you started within 24 hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-primary-50 border border-primary-100 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-700 text-white flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your registration has been received. Our team will contact you
                    within 24 hours to schedule your free trial class.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+1 234 567 890"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Country
                      </label>
                      <div className="relative">
                        <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          required
                          placeholder="Your country"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Select Course
                    </label>
                    <select
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm text-gray-700 bg-white"
                    >
                      <option value="">Choose a course...</option>
                      {courses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred Time
                    </label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm text-gray-700 bg-white"
                    >
                      <option value="">Select preferred timing...</option>
                      <option>Morning (6 AM - 12 PM)</option>
                      <option>Afternoon (12 PM - 5 PM)</option>
                      <option>Evening (5 PM - 9 PM)</option>
                      <option>Night (9 PM - 12 AM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any special requirements or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-lg !py-4"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    No credit card required. Free 3-day trial with no obligations.
                  </p>
                </form>
              )}
            </div>

            {/* Benefits sidebar */}
            <div>
              <div className="sticky top-32">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-950 text-white">
                  <h3 className="text-2xl font-bold font-heading mb-6">
                    What You&apos;ll <span className="text-gold-400">Get</span>
                  </h3>
                  <ul className="space-y-4">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <b.icon size={20} className="text-gold-400 mt-0.5 shrink-0" />
                        <span className="text-white/80 text-sm">{b.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white/50 text-sm mb-3">Have questions?</p>
                    <a
                      href="https://wa.me/923105175338"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium text-sm transition"
                    >
                      <Phone size={16} />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Trust badge */}
                <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-gold-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Trusted by 5,000+ students worldwide
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Rated 4.9/5 by our student community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
