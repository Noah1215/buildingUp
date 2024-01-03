import { createClient } from "@/lib/supabase/server";

export async function getSession() {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

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

export async function getUserName() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: userName } = await supabase
      .from("users")
      .select("name")
      .eq("id", user?.id)
      .single()
      .throwOnError();
    return userName?.name;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
