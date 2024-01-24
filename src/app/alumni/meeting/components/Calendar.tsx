"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
// dayjs
import dayjs, { Dayjs } from "dayjs";
// MUI
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// Components
import DesktopCalendar from "./DesktopCalendar";
import MobileCalendar from "./MobileCalendar";

export default function Calendar() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.up("md"));

  const [month, setMonth] = useState(dayjs().startOf("month"));
  const [meetings, setMeetings] = useState<any>([]);

  useEffect(() => {
    console.log("Calendar", "useEffect", "fetch data");
    const startOfMonth = month.startOf("month");
    const firstDay = startOfMonth.subtract(startOfMonth.day(), "day");
    const lastDay = firstDay.add(34, "day");
    getMeetings(firstDay.toISOString(), lastDay.toISOString())
      .then((data) => {
        setMeetings(data);
      })
      .catch((error) => console.log(error));
    return () => {
      setMeetings([]);
    };
  }, [month]);

  return (
    <Box
      sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={() => {
            setMonth(month.subtract(1, "month"));
          }}
        >
          <ChevronLeftIcon sx={{ background: "#234561", color: "#FFF" }} />
        </IconButton>
        <Typography sx={{ fontSize: { xs: "19px", md: "25px" } }}>
          {month.format("MMM YYYY")}
        </Typography>
        <IconButton
          onClick={() => {
            setMonth(month.add(1, "month").startOf("month"));
          }}
        >
          <ChevronRightIcon sx={{ background: "#234561", color: "#FFF" }} />
        </IconButton>
      </Box>
      {isDesktop && <DesktopCalendar month={month} meetings={meetings} />}
      {isMobile && <MobileCalendar month={month} meetings={meetings} />}
    </Box>
  );
}

async function getMeetings(start: any, end: any) {
  try {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;

    const { data: meetings } = await supabase
      .from("meetings")
      .select(
        `mentor_id, start_time, end_time, duration, description, status, link`
      )
      .eq("alumni_id", user?.id)
      .gt("start_time", start)
      .lt("end_time", end)
      .order("start_time")
      .throwOnError();

    const response: any[] = [];

    if (meetings) {
      for (let meeting of meetings) {
        const { data: mentor } = await supabase
          .from("profiles")
          .select(`name`)
          .eq("user_id", meeting.mentor_id)
          .single()
          .throwOnError();
        response.push({ ...meeting, mentor_name: mentor?.name });
      }
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
