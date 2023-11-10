"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import Button from "@mui/material/Button/Button";

export default async function AuthButtonClient() {
  const supabase = createClient();
  const router = useRouter();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="contained"
      color="warning"
      fullWidth
      sx={{ height: "3.5rem", margin: "3rem 0 6rem 0" }}
    >
      Logout
    </Button>
  );
}
