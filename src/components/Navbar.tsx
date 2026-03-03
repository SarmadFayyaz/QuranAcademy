"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, UserPlus, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/teachers", label: "Teachers" },
  { href: "/register", label: "Register Now" },
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
              src="/assets/images/logo.jpg"
              alt="Hasnain Online Quran Academy"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>

          {/* Center — phone & actions */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+923105175338"
              className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition"
            >
              <Phone size={16} />
              +92 310 517 5338
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="tel:+447916632814"
              className="flex items-center gap-2 text-gray-500 text-sm hover:text-primary-600 transition"
            >
              <Phone size={14} />
              UK: +44 7916 632814
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
              href="https://www.facebook.com/HasnainQuranOnline"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/onlinequran_hasnain"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-all group hover:bg-primary-600"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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
          <div className="hidden md:flex items-center gap-1 py-0">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-5 py-3.5 text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-1">
          {navLinks.map((l) => (
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
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-1">
              <Phone size={14} />
              +92 310 517 5338
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
