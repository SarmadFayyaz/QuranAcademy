import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as
    | "recovery"
    | "invite"
    | "signup"
    | "email"
    | null;
  const next = searchParams.get("next") ?? "/dashboard";
  const error_param = searchParams.get("error_description");

  // If Supabase returned an error, redirect to login with the message
  if (error_param) {
    const url = new URL("/login", origin);
    url.searchParams.set("error", error_param);
    return NextResponse.redirect(url);
  }

  const supabase = await createClient();

  // PKCE flow — exchange auth code for session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    // PKCE failed — try client-side confirm page as fallback
    const confirmUrl = new URL("/auth/confirm", origin);
    confirmUrl.searchParams.set("code", code);
    if (next !== "/dashboard") confirmUrl.searchParams.set("next", next);
    return NextResponse.redirect(confirmUrl);
  }

  // Token-based flow — verify OTP (password reset, invite, email confirmation)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      const dest = type === "recovery" ? "/dashboard/profile" : next;
      return NextResponse.redirect(`${origin}${dest}`);
    }
    // Server-side failed — try client-side confirm page as fallback
    const confirmUrl = new URL("/auth/confirm", origin);
    confirmUrl.searchParams.set("token_hash", token_hash);
    confirmUrl.searchParams.set("type", type);
    return NextResponse.redirect(confirmUrl);
  }

  // No auth params — redirect to client-side confirm (handles hash fragments)
  return NextResponse.redirect(`${origin}/auth/confirm`);
}
