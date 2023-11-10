import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user?.id)
    .single();
  const userRole = data?.role;

  if (userRole !== "admin") {
    // TODO: REDIRECT TO CUSTOME ERROR PAGE OR LANDING PAGE FOR USER ROLE
    redirect("/error/unauthorized-route");
  }

  return children;
}
