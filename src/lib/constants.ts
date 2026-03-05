export const SITE_URL = "https://quranacademy.vercel.app";
export const SITE_NAME = "Hasnain Online Quran Academy";
export const SITE_DESCRIPTION =
  "Your gateway to comprehensive Islamic education. Learn Quran with Tajweed from certified teachers worldwide.";

// Contact numbers
export const WHATSAPP_PK = {
  number: "923105175338",
  display: "+92 310 5175338",
  label: "Pakistan",
  href: "https://wa.me/923105175338",
} as const;

export const WHATSAPP_UK = {
  number: "447916632814",
  display: "+44 7916 632814",
  label: "UK",
  href: "https://wa.me/447916632814",
} as const;

export const CONTACT_EMAIL = "info@hasnainquranacademy.com";

// Social media
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/HasnainQuranOnline",
  instagram: "https://www.instagram.com/onlinequran_hasnain",
  youtube: "https://youtube.com/@hamzanaeem-q5p?si=K6sIaE8BpiERxTyt",
} as const;

// Navigation links (shared between Navbar and Footer)
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
  { href: "/blog", label: "Blog" },
  { href: "/help-support", label: "Help & Support" },
  { href: "/register", label: "Register Now" },
] as const;
