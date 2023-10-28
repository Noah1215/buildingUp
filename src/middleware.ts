import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const session = await supabase.auth.getSession();
  console.log(session.data.session);
  console.log("pathname: ", request.nextUrl.pathname);

  // if user is signed in and the current path is / redirect the user to /account
  if (session.data.session && request.nextUrl.pathname === "/") {
    console.log(session);
    return NextResponse.redirect(new URL("/alumni", request.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  // if (!session.data.session && request.nextUrl.pathname !== "/") {
  //   return NextResponse.redirect(new URL("", request.url));
  // }

  return response;
}
