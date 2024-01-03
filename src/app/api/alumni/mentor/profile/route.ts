import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// Temporary mock data
export async function GET(request: NextRequest) {
  try {
    console.log(request.method, request.url);

    const profile = {
      name: "John Doe",
      userType: "MENTOR",
      phone: "123-456-7890",
      email: "example.gmail.com",
      employer: "Building Up",
      union: "Local 97",
      since: dayjs()
        .set("year", 2019)
        .set("month", 1)
        .set("date", 1)
        .toISOString(),
      avatar: "https://i.pravatar.cc/300",
    };

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
