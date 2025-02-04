"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button onClick={handleSignOut}>
      <LogoutIcon
        sx={{ color: "#024761", fontSize: "2rem", marginRight: "0.5rem" }}
      />
      <Typography
        variant="h6"
        color="#024761"
        sx={{ fontSize: "1rem", whiteSpace: "nowrap" }}
      >
        Log Out
      </Typography>
    </Button>
  );
}
