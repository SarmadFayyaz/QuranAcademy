import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { WHATSAPP_PK, WHATSAPP_UK, CONTACT_EMAIL, SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/icons/SocialIcons";

const courses = [
  "Quran Recitation & Tajweed",
  "Quran Memorization (Hifz)",
  "Mathematics",
  "English",
  "Urdu",
  "Other Subjects",
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/images/logo.png"
                  alt="Hasnain Online Quran Academy"
                  width={112}
                  height={112}
                  className="w-[150px] h-[120px] object-contain bg-white rounded-lg p-2"
                />
                <span className="text-[11px] text-gold-400 font-bold mt-1 tracking-wide">
                  Run by Dr. Farhat Hashmi Students
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
              {NAV_LINKS.map((l) => (
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
                <a href={WHATSAPP_PK.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-gold-400 transition-colors">
                  <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                  {WHATSAPP_PK.display} (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <a href={WHATSAPP_UK.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-gold-400 transition-colors">
                  <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                  {WHATSAPP_UK.display} (UK WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={16} className="text-gold-400 mt-0.5 shrink-0" />
                {CONTACT_EMAIL}
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                Available Worldwide — Online Classes
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Hasnain Online Quran Academy. All
            rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
