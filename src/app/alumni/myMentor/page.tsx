import { cache } from "react";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
// MUI
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
// Components
import MeetingRequestForm from "@/components/MeetingRequestForm";
import {
  getOpenTimeBlocks,
  DATE_FORMAT,
  DATE_REGEX,
} from "@/app/alumni/myMentor/utils";

//export const fetchCache = "force-no-store";
// export const revalidate = 0; // seconds
//export const dynamic = "force-dynamic";
const cacheGetOpenTimeBlocks = cache(getOpenTimeBlocks);

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const date = searchParams?.date ?? dayjs().format(DATE_FORMAT);

  const isDateValid = typeof date === "string" && DATE_REGEX.test(date);
  if (!isDateValid) {
    notFound(); // wrong date format
  }

  console.log("date", date);
  const openTimeBlocks = (await getOpenTimeBlocks(date)) ?? [];

  return (
    <Grid
      container
      spacing={4}
      sx={{
        padding: {
          md: 6,
        },
      }}
    >
      <Grid xs={12} order={1}>
        My Mentor
      </Grid>
      <Grid xs={12} order={2}>
        <Paper elevation={4}>Mentor info section</Paper>
      </Grid>
      <Grid xs={12} order={3}>
        <MeetingRequestForm
          searchParamsDate={date}
          openTimeBlocks={openTimeBlocks}
        />
      </Grid>
    </Grid>
  );
}
