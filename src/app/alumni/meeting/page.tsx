import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
// MUI
import Typography from "@mui/material/Typography";
// Components
import Calendar from "./components/Calendar";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return (
    <Box
      component="article"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="header" sx={{ flex: 0 }}>
        <Typography
          component={"h1"}
          sx={{
            fontSize: { xs: "20px", md: "32px" },
            fontWeight: 600,
          }}
        >
          My Mentor
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Calendar />
      </Box>
    </Box>
  );
}
