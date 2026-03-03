"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function ConfirmAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();

      // 1. Try hash fragment tokens (Supabase puts access_token in the hash)
      if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
        // Supabase browser client auto-detects hash tokens on init
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.replace("/dashboard");
          return;
        }
      }

      // 2. Try PKCE code exchange
      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          const next = searchParams.get("next") ?? "/dashboard";
          router.replace(next);
          return;
        }
      }

      // 3. Try token_hash + type (direct OTP verification)
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type") as "recovery" | "invite" | "signup" | "email" | null;
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (!error) {
          const dest = type === "recovery" ? "/dashboard/profile" : "/dashboard";
          router.replace(dest);
          return;
        }
      }

      // 4. Check if there's already a valid session (e.g. auto-detected from hash)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/dashboard");
        return;
      }

      setError("Authentication failed. The link may have expired or already been used.");
    };

    run();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md text-center p-8">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Link Expired</h2>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <a href="/login" className="btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Verifying your account...</p>
      </div>
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmAuth />
    </Suspense>
  );
}
