"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
// dayjs
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(weekday);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
// MUI
import Box from "@mui/material/Box";
// Components
import DesktopCalendar from "./DesktopCalendar";

export default function Calendar() {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const firstDay = startOfMonth.subtract(startOfMonth.weekday(), "day");
  const lastDay = firstDay.add(34, "days");

  const [browserLocale, setBrowserLocale] = useState(dayjs().locale());
  const [browserTimezone, setBrowserTimezone] = useState(dayjs.tz.guess());

  const [month, setMonth] = useState(startOfMonth);
  const [meetings, setMeetings] = useState<any>([]);

  useEffect(() => {
    console.log("fetch meetings");
    getMeetings(firstDay.toISOString(), lastDay.toISOString())
      .then((data) => {
        console.log(data);
        setMeetings(data);
      })
      .catch((error) => console.log(error));
  }, [month]);

  return (
    <>
      <DesktopCalendar meetings={meetings} userLocale={browserLocale} />
    </>
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
