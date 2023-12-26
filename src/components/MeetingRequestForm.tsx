"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

// MUI TextField
import TextField from "@mui/material/TextField/TextField";

const TIME_BLOCK_DURATION = 30;

export default function MeetingRequestForm() {
  const [openTimeBlocks, setOpenTimeBlocks] = useState<string[]>([]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<string>("none");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    // TODO: add error handling while fetching data)
    fetch(`/api/alumni/mentor/time-blocks?date=${date.valueOf()}`)
      .then((response) => response.json())
      .then((data) => {
        setTime(data[0] ?? "none");
        return setOpenTimeBlocks(data);
      }),
      { cache: "no-store" };
  }, [date]);

  const printStates = () => {
    console.log("date: ", date);
    console.log("time: ", time);
    console.log("description: ", description);
    console.log("openTimeBlocks: ", openTimeBlocks);
    console.log("dayjs()", dayjs().format());
  };

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
        <Button
          variant="contained"
          sx={{ width: { xs: "100%", md: "auto" } }}
          onClick={printStates}
        >
          Request
        </Button>
      </Grid>
      <Grid container xs={12} md={6} spacing={1}>
        <Grid xs={12}>
          <Typography>Date:</Typography>
        </Grid>
        <Grid xs={12}>
          <MeetingDatePicker date={date} setDate={setDate} />
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
}: {
  date: Dayjs;
  setDate: (date: Dayjs) => void;
}) {
  const onDateChange = (value: Dayjs | null) => {
    if (value) {
      setDate(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        slotProps={{ textField: { fullWidth: true } }}
        disablePast={true}
        maxDate={date.add(2, "weeks")}
        value={date}
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
      {openTimeBlocks.length > 0 ? (
        openTimeBlocks.map((time: string) => (
          <MenuItem value={time} key={time}>
            {dayjs(time).local().format("hh:mm")} -{" "}
            {dayjs(time)
              .add(TIME_BLOCK_DURATION, "minute")
              .local()
              .format("hh:mm")}
          </MenuItem>
        ))
      ) : (
        <MenuItem value={"none"} sx={{ display: "none" }}>
          No available times.
        </MenuItem>
      )}
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
