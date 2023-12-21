import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { getOpenTimeBlocks } from "@/app/alumni/myMentor/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { date: string } }
) {
  try {
    console.log(request.url);
    const date = params!.date;
    const data = await getOpenTimeBlocks(date);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
