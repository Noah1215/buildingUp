import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// DEV ONLY - SERVICE_ROLE_KEY has the ability to bypass Row Level Security. Never share it publicly.
const supabaseKey = process.env.NEXT_SECRET_SUPABASE_SERVICE_ROLE_KEY;
// ANON_KEY is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies.
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  let { data: users, error } = await supabase.from("users").select();

  console.log(users);
  console.log(error);

  return NextResponse.json({ users: users }, { status: 200 });
}
