import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/teachers", label: "Our Teachers" },
  { href: "/register", label: "Register Now" },
];

const courses = [
  "Quran Recitation",
  "Tajweed Course",
  "Quran Memorization",
  "Islamic Studies",
  "Arabic Language",
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <BookOpen className="text-white" size={22} />
              </div>
              <div>
                <span className="text-lg font-bold text-white font-heading">
                  Hasnain Online
                </span>
                <span className="block text-[10px] text-gold-400 font-medium -mt-0.5 uppercase tracking-wider">
                  Quran Academy
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your gateway to comprehensive Islamic education. Learn Quran online
              with certified teachers from the comfort of your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm hover:text-gold-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Courses</h4>
            <ul className="space-y-2.5">
              {courses.map((c) => (
                <li key={c} className="text-sm text-gray-400">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                +92 310 517 5338 (WhatsApp)
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                +44 7916 632814 (UK)
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={16} className="text-gold-400 mt-0.5 shrink-0" />
                info@hasnainquranacademy.com
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                Available Worldwide — Online Classes
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Hasnain Online Quran Academy. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
