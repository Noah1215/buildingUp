"use client";

import { createBrowserClient } from "@supabase/ssr";

export default function AuthButton() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "ara19@gmail.com",
      password: "password1234",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <form action="/auth/sign-in" method="post">
      <button>Login</button>
      <button formAction="/auth/sign-out">Logout</button>
    </form>
  );
}
