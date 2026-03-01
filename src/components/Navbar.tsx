"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/teachers", label: "Teachers" },
  { href: "/register", label: "Register Now" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-primary-800 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={14} />
              +92 310 517 5338
            </span>
            <span className="hidden sm:flex items-center gap-1.5 border-l border-white/20 pl-4">
              <Phone size={14} />
              UK: +44 7916 632814
            </span>
          </div>
          <span className="hidden sm:block">Free 3-Day Trial Classes Available</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/assets/images/logo.jpg"
            alt="Hasnain Online Quran Academy"
            width={44}
            height={44}
            className="rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
          />
          <div>
            <span className="text-xl font-bold text-primary-800 font-heading tracking-tight">
              Hasnain Online
            </span>
            <span className="block text-[11px] text-gold-500 font-medium -mt-1 tracking-wider uppercase">
              Quran Academy
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-600 hover:text-primary-700 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-700 after:transition-all"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/register" className="btn-primary text-sm !px-5 !py-2.5">
            Get Free Trial
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-1 animate-in slide-in-from-top">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium transition"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="btn-primary w-full mt-3 text-center"
            onClick={() => setOpen(false)}
          >
            Get Free Trial
          </Link>
        </div>
      )}
    </header>
  );
}
