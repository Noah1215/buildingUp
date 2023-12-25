import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import { createClient } from "@/lib/supabase/server";

// constants
const DATE_FORMAT = "YYYY-MM-DD";
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_FORMAT = "hh:mm:ss";
const TIME_BLOCK_DURATION = 30;

export async function GET(
  request: NextRequest,
  { params }: { params: { date: string } }
) {
  try {
    console.log("API:", request.url);

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log(`Unauthorized access to ${request.url}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const date = params.date || dayjs().format(DATE_FORMAT);

    if (typeof params.date !== "string" || !DATE_REGEX.test(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const mentorId = await getMentorId();

    if (!mentorId) {
      console.log(`Failed to get mentor_id of user: ${mentorId}`);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    const [schedules, meetings] = await Promise.all([
      getSchedules(mentorId, date),
      getMeetings(mentorId, date),
    ]);

    if (!schedules || !meetings) {
      console.log(
        `Failed to fetch schedules/meetings of the mentor: ${mentorId}`
      );
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    const timeBlocks = generateTimeBlocks(schedules, TIME_BLOCK_DURATION);
    const openTimeBlocks = filterBookedTimeBlocks(timeBlocks, meetings);

    return NextResponse.json(openTimeBlocks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Helper functions

export function validateDate(date: string | string[] | undefined) {
  if (typeof date === "string" && DATE_REGEX.test(date)) {
    return date;
  }
  return null;
}

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
