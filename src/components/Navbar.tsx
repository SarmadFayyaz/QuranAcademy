"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, UserPlus, LogIn, LogOut, LayoutDashboard, Home, Info, GraduationCap, FileText, HelpCircle, ClipboardList, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { WHATSAPP_PK, WHATSAPP_UK, SOCIAL_LINKS } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/icons/SocialIcons";
import type { User } from "@supabase/supabase-js";

const PakistanFlag = () => (
  <svg viewBox="0 0 900 600" className="w-7 h-5 rounded-[3px] shadow-sm shrink-0 border border-gray-200">
    <rect fill="#01411C" width="900" height="600"/>
    <rect fill="#fff" width="225" height="600"/>
    <circle cx="517" cy="300" r="148" fill="#fff"/>
    <circle cx="547" cy="300" r="118" fill="#01411C"/>
    <polygon fill="#fff" points="650,180 665,233 720,233 676,265 691,318 650,286 609,318 624,265 580,233 635,233"/>
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 60 30" className="w-7 h-5 rounded-[3px] shadow-sm shrink-0 border border-gray-200">
    <rect fill="#012169" width="60" height="30"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#t)"/>
    <clipPath id="t"><path d="M30,0 L30,15 L0,0 Z M30,30 L30,15 L60,30 Z M0,30 L30,15 L0,0 Z M60,0 L30,15 L60,30 Z" /></clipPath>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

const navLinkIcons = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/teachers", label: "Teachers", icon: GraduationCap },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/help-support", label: "Help & Support", icon: HelpCircle },
  { href: "/register", label: "Register Now", icon: ClipboardList },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar — white */}
      <div className="bg-white border-b border-gray-100 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/images/logo.png"
              alt="Hasnain Online Quran Academy"
              width={80}
              height={80}
              className="w-[88px] h-[72px] object-contain"
            />
          </Link>

          {/* Center — phone & actions */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={WHATSAPP_PK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-800 font-semibold hover:text-primary-600 transition"
            >
              <PakistanFlag />
              {WHATSAPP_PK.display}
            </a>
            <a
              href={WHATSAPP_UK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-800 font-semibold hover:text-primary-600 transition"
            >
              <UKFlag />
              {WHATSAPP_UK.display}
            </a>
            <span className="text-gray-300">|</span>
            <Link
              href="/register"
              className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 font-medium transition text-sm"
            >
              <UserPlus size={16} />
              Register Now
            </Link>
            <span className="text-gray-300">|</span>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 font-medium transition text-sm"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <span className="text-gray-300">|</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 font-medium transition text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 font-medium transition text-sm"
              >
                <LogIn size={16} />
                Student Login
              </Link>
            )}
          </div>

          {/* Social icons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Nav bar — teal */}
      <nav className="bg-primary-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center justify-center gap-2 py-0">
            {navLinkIcons.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <l.icon size={15} />
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-1">
          {navLinkIcons.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t mt-2 space-y-2">
            <Link
              href="/register"
              className="btn-primary w-full text-center"
              onClick={() => setOpen(false)}
            >
              Get Free Trial
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition text-center"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="block w-full py-3 px-4 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium transition text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition text-center"
                onClick={() => setOpen(false)}
              >
                Student Login
              </Link>
            )}
            <div className="flex items-center justify-center gap-4 text-sm pt-1">
              <a href={WHATSAPP_PK.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-700 font-medium">
                <PakistanFlag />
                {WHATSAPP_PK.display}
              </a>
              <a href={WHATSAPP_UK.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-700 font-medium">
                <UKFlag />
                {WHATSAPP_UK.display}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
