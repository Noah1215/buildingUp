import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname !== "/") {
    console.log("User is not authenticated. Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user?.id)
    .single();
  const userRole = data?.role;

  if (user && !request.nextUrl.pathname.startsWith(`/${userRole}`)) {
    console.log(
      `Path ${request.nextUrl.pathname} is not starting with /${userRole}, redirecting to /${userRole}`
    );
    return NextResponse.redirect(new URL(`${userRole}`, request.url));
  }

  return response;
}
