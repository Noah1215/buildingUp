"use client";

import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button/Button";

export default async function SignOutButton() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    // router.push("/");
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="contained"
      color="warning"
      sx={{ height: "3.5rem", margin: "3rem 0 6rem 0" }}
    >
      Logout
    </Button>
  );
}
