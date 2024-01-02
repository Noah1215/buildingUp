import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import z from "zod";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const schema = z.object({
  time: z.string(),
  description: z.string(),
});

export async function POST(request: NextRequest) {
  console.log(request.method, request.url);

  const response = schema.safeParse(await request.json());

  if (!response.success) {
    return NextResponse.json({ error: "Invalid requests" }, { status: 400 });
  }

  // TODO: add date validation and collision check

  const { time, description } = response.data;

  console.log("time:", time);
  console.log("description:", description);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log(`Unauthorized access: ${request.method} ${request.url}`);
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

  const UTC_TIME = dayjs(time).utc();
  const date = UTC_TIME.format("YYYY-MM-DD");
  const startTime = UTC_TIME.toISOString();
  const duration = 30;
  const endTime = UTC_TIME.add(duration, "minute").toISOString();

  const { data, error } = await supabase
    .from("meetings")
    .insert({
      mentor_id: mentorId,
      alumni_id: user.id,
      date: date,
      start_time: startTime,
      end_time: endTime,
      duration: duration,
      description: description,
      status: "pending",
    })
    .select();

  if (error) {
    console.log("Failed to create a meeting request: ", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

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
