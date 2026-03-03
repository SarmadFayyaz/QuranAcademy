import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for Free Trial",
  description:
    "Sign up for a free 3-day Quran trial class at Hasnain Online Quran Academy. No payment required. Start learning within 24 hours.",
  alternates: { canonical: "/register" },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
