import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// Constants
const TIME_BLOCK_DURATION = 30;

export async function GET(request: NextRequest) {
  try {
    console.log(request.method, request.url);
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get("date");

    // Validate date parameter
    if (!dateParam || !dayjs(dateParam).isValid()) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    // Convert UNIX epoch to dayjs object
    const date = dayjs(+dateParam);

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log(`Unauthorized access to ${request.url}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mentorId = await getMentorId();

    if (!mentorId) {
      console.log(`Failed to get mentor_id of user: ${user.id}`);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    // Server timezone is UTC and timestamp is stored in ISO string format.
    const startOfDay = date.startOf("day").utc().toISOString();
    const endOfDay = date.endOf("day").utc().toISOString();

    const schedules = await getSchedules(mentorId, startOfDay, endOfDay);

    // Failed to fetch schedules
    if (!schedules) {
      console.log(
        `Failed to fetch schedules. mentor: ${mentorId} date: ${dateParam}`
      );
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    // No schedules for the day, there is no open time blocks
    if (schedules.length === 0) {
      return NextResponse.json([]);
    }

    const meetings = await getMeetings(mentorId, startOfDay, endOfDay);

    // Failed to fetch meetings
    if (!meetings) {
      console.log(
        `Failed to fetch meetings. mentor: ${mentorId} date: ${dateParam}`
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

function generateTimeBlocks(schedules: any[], duration: number): string[] {
  let timeBlocks: string[] = [];

  for (const schedule of schedules) {
    const startTime = dayjs(schedule["start_time"]);
    const endTime = dayjs(schedule["end_time"]);
    const numSlots = endTime.diff(startTime, "minute") / duration;

    for (let i = 0; i < numSlots; i++) {
      const blockStartTime = startTime
        .add(i * duration, "minute")
        .toISOString();
      timeBlocks.push(blockStartTime);
    }
  }

  return timeBlocks;
}

function filterBookedTimeBlocks(
  timeBlocks: string[],
  meetings: any[]
): string[] {
  const bookedTimeBlocks = meetings.map((meeting) =>
    dayjs(meeting["start_time"]).toISOString()
  );
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

async function getSchedules(
  mentorId: string,
  startOfDay: string,
  endOfDay: string
) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: availabilities } = await supabase
      .from("schedules")
      .select("*")
      .eq("mentor_id", mentorId)
      .gte("start_time", startOfDay)
      .lte("end_time", endOfDay)
      .throwOnError();

    return availabilities;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
}

async function getMeetings(
  mentorId: string,
  startOfDay: string,
  endOfDay: string
) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: meetings } = await supabase
      .from("meetings")
      .select("*")
      .eq("mentor_id", mentorId)
      .gte("start_time", startOfDay)
      .lte("end_time", endOfDay)
      .throwOnError();

    return meetings;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
}
