import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

// TODO: Change to POST
export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  let session = await supabase.auth.getSession();

  // don't allow sign in if already signed in
  if (session.data.session) {
    console.log("user is already signed in");
    redirect("/test");
  }

  console.log("/auth/sign-in");
  await supabase.auth.signInWithPassword({
    email: "ara19@gmail.com",
    password: "password1234",
  });

  return NextResponse.redirect(new URL("/test", req.url), {
    status: 301,
  });
}
