"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
// MUI
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
// MUI SelectBox
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// MUI DatePicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// MUI TextField
import TextField from "@mui/material/TextField/TextField";

const DATE_FORMAT = "YYYY-MM-DD";

export default function MeetingRequestForm({
  searchParamsDate,
  openTimeBlocks,
}: {
  searchParamsDate: string;
  openTimeBlocks: string[];
}) {
  const [date, setDate] = useState<string>(searchParamsDate);
  const [time, setTime] = useState<string>(openTimeBlocks[0] ?? "none");
  const [description, setDescription] = useState<string>("");

  return (
    <Grid container spacing={2}>
      <Grid container xs={12} md={6} p={2} alignItems="center">
        <Typography>Meeting Request</Typography>
      </Grid>
      <Grid
        container
        xs={12}
        md={6}
        order={{ xs: 5, md: 0 }}
        p={2}
        justifyContent="flex-end"
      >
        <Button variant="contained" sx={{ width: { xs: "100%", md: "auto" } }}>
          Request
        </Button>
      </Grid>
      <Grid container xs={12} md={6} spacing={1}>
        <Grid xs={12}>
          <Typography>Date:</Typography>
        </Grid>
        <Grid xs={12}>
          <MeetingDatePicker date={date} setDate={setDate} setTime={setTime} />
        </Grid>
      </Grid>
      <Grid container xs={12} md={6} spacing={1}>
        <Grid xs={12}>
          <Typography>Time:</Typography>
        </Grid>
        <Grid xs={12}>
          <MeetingTimePicker
            openTimeBlocks={openTimeBlocks}
            time={time}
            setTime={setTime}
          />
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={1}>
        <Grid xs={12}>
          <Typography>Description:</Typography>
        </Grid>
        <Grid xs={12}>
          <DescriptionInput
            description={description}
            setDescription={setDescription}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function MeetingDatePicker({
  date,
  setDate,
  setTime,
}: {
  date: string;
  setDate: (date: string) => void;
  setTime: (times: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(pathname + "?" + params);
    router.refresh();
  };

  const onDateChange = (value: Dayjs | null) => {
    if (value) {
      setTime("");
      setDate(value.format(DATE_FORMAT));
      updateSearchParams("date", value.format(DATE_FORMAT));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slotProps={{ textField: { fullWidth: true } }}
        disablePast={true}
        maxDate={dayjs(date).add(2, "weeks")}
        value={dayjs(date)}
        onAccept={(value: Dayjs | null) => onDateChange(value)}
      />
    </LocalizationProvider>
  );
}

function MeetingTimePicker({
  openTimeBlocks,
  time,
  setTime,
}: {
  openTimeBlocks: string[];
  time: string;
  setTime: (times: string) => void;
}) {
  useEffect(() => {
    openTimeBlocks.length > 0 ? setTime(openTimeBlocks[0]) : setTime("none");
  }, [openTimeBlocks]);

  const onTimeChange = (e: SelectChangeEvent) => {
    setTime(e.target.value);
  };

  return (
    <Select
      fullWidth
      value={time}
      onChange={onTimeChange}
      disabled={openTimeBlocks.length === 0}
    >
      <MenuItem value={"none"} sx={{ display: "none" }}>
        No available times.
      </MenuItem>
      {openTimeBlocks.map((time: string) => (
        <MenuItem value={time} key={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  );
}

function DescriptionInput({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      color={"primary"}
      onChange={handleDescriptionChange}
    />
  );
}
