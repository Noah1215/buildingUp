import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { useState, useEffect } from "react";

import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";

export default async function TestPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  let session = await supabase.auth.getSession();

  let test = await supabase.from("test").select();

  let role = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", session.data.session?.user.id)
    .single();

  return (
    <div>
      <h1>TEST LOGIN PAGE</h1>
      <AuthButton />
      <h2>Session</h2>
      <div>{JSON.stringify(session)}</div>
      <h2>Role</h2>
      <div>{JSON.stringify(role)}</div>
      <h2>Test</h2>
      <div>{JSON.stringify(test)}</div>
    </div>
  );
}
