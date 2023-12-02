import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  console.log(`${new Date(Date.now())} middleware ${request.url}`);
  const { supabase, response } = createClient(request);
  await supabase.auth.getSession();
  return response;
}
