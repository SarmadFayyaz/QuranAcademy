import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Login",
  description:
    "Sign in to your Hasnain Online Quran Academy account to continue your learning journey.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
