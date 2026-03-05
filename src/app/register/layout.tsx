import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for Free Trial",
  description:
    "Sign up for a free 3-day Quran trial class at Hasnain Online Quran Academy. No payment required. Start learning within 24 hours.",
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Register for Free Trial — Hasnain Online Quran Academy",
    description: "Sign up for a free 3-day Quran trial class. No payment required. Start learning within 24 hours.",
    url: "/register",
    type: "website",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
