"use client";

import { useState } from "react";
import { User, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import CountryPhoneFields from "@/components/CountryPhoneFields";
import { findCountryByCode } from "@/lib/countries";
import { WHATSAPP_PK } from "@/lib/constants";

export default function HeroContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "", message: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const checkRes = await fetch("/api/trials/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email }),
    });
    const checkJson = await checkRes.json();
    if (checkJson.exists) {
      setFormError("A trial request with this email already exists. Our team will contact you soon.");
      return;
    }

    const countryName = findCountryByCode(form.countryCode)?.name || form.countryCode;
    const supabase = createClient();
    await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      country: countryName,
      message: form.message || null,
      source: "hero",
    });

    await fetch("/api/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, country: countryName, source: "hero" }),
    });

    // Open WhatsApp with form content
    const lines = [
      `*New Free Trial Request*`,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      form.phone ? `*Phone:* ${form.phone}` : "",
      countryName ? `*Country:* ${countryName}` : "",
      form.message ? `*Message:* ${form.message}` : "",
    ].filter(Boolean);
    const waUrl = `https://wa.me/${WHATSAPP_PK.number}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(waUrl, "_blank");

    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <p className="text-xl font-bold text-gray-900 text-center mb-6 font-heading">Free Trial Class</p>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-2">Thank You!</p>
          <p className="text-gray-500">We&apos;ll contact you within 24 hours to schedule your free trial.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {formError && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {formError}
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-400" />
              <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm" />
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-400" />
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <CountryPhoneFields
              country={form.countryCode}
              phone={form.phone}
              onChange={(code, ph) => setForm({ ...form, countryCode: code, phone: ph })}
              inputClass="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
              iconClass="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-400"
            />
          </div>
          <div className="relative">
            <MessageCircle size={16} className="absolute left-3.5 top-3.5 text-primary-400" />
            <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Enter your message" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm resize-none" />
          </div>
          <button type="submit" className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 hover:scale-[1.01] active:scale-[0.99] text-white font-bold rounded-2xl transition-all duration-200 ease-out shadow-md hover:shadow-lg text-sm">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
