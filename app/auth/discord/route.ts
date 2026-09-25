import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const origin = new URL(request.url).origin;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(`${origin}/?error=discord_login_failed`, 303);
  }

  return NextResponse.redirect(data.url, 303);
}

export async function GET(request: Request) {
  return POST(request);
}
