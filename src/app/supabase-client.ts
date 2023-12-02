import { createClient } from "@/lib/supabase/client";

export async function getUser() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getUserRole() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user?.id)
      .single()
      .throwOnError();
    return userRole?.role;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
