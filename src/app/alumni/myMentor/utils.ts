import { cookies } from "next/headers";
import dayjs from "dayjs";
import { createClient } from "@/lib/supabase/server";

// constants
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const TIME_FORMAT = "hh:mm:ss";
export const TIME_BLOCK_DURATION = 30;

// functions
export async function getOpenTimeBlocks(
  date: string
): Promise<string[] | null> {
  console.log("No cache called");

  const mentorId = await getMentorId();

  if (!mentorId) {
    return null;
  }

  const [schedules, meetings] = await Promise.all([
    getSchedules(mentorId, date),
    getMeetings(mentorId, date),
  ]);

  if (!schedules || !meetings) {
    return [];
  }

  const timeBlocks = generateTimeBlocks(schedules, TIME_BLOCK_DURATION);
  const openTimeBlocks = filterBookedTimeBlocks(timeBlocks, meetings);

  return openTimeBlocks;
}

export function validateDate(date: string | string[] | undefined) {
  if (typeof date === "string" && DATE_REGEX.test(date)) {
    return date;
  }
  return null;
}

// Helper functions

function generateTimeBlocks(availabilities: any[], duration: number): string[] {
  const times: string[] = [];

  for (const availability of availabilities) {
    const start = dayjs(`${dayjs().format(DATE_FORMAT)} ${availability.start}`);
    const end = dayjs(`${dayjs().format(DATE_FORMAT)} ${availability.end}`);
    const numSlots = end.diff(start, "minute") / duration;

    for (let i = 0; i < numSlots; i++) {
      const time = start.add(i * duration, "minute").format(TIME_FORMAT);
      times.push(time);
    }
  }

  return times;
}

function filterBookedTimeBlocks(
  timeBlocks: string[],
  meetings: any[]
): string[] {
  const bookedTimeBlocks = meetings.map((meeting) => meeting.start);
  const openTimeBlocks = timeBlocks.filter(
    (timeBlock) => !bookedTimeBlocks?.includes(timeBlock)
  );

  return openTimeBlocks;
}

// Supabase queries

async function getMentorId() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: mentor } = await supabase
      .from("alumni")
      .select("mentor_id")
      .eq("user_id", user?.id)
      .single()
      .throwOnError();

    return mentor?.mentor_id;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
}

async function getSchedules(mentorId: string, date: string) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: availabilities } = await supabase
      .from("schedules")
      .select("*")
      .eq("mentor_id", mentorId)
      .eq("date", date)
      .throwOnError();

    return availabilities;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
}

async function getMeetings(mentorId: string, date: string) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: meetings } = await supabase
      .from("meetings")
      .select("*")
      .eq("mentor_id", mentorId)
      .eq("date", date)
      .throwOnError();

    return meetings;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
}
