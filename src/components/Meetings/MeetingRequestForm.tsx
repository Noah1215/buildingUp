"use client";
import React, { useEffect, useState, FormEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// MUI
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import MeetingDatePicker from "@/components/Meetings/MeetingDatePicker";
import MeetingTimePicker from "@/components/Meetings/MeetingTimePicker";
import MeetingDescriptionInput from "@/components/Meetings/MeetingDescriptionInput";

export default function MeetingRequestForm() {
  const [openTimeBlocks, setOpenTimeBlocks] = useState<string[]>([]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<string>("none");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    // TODO: add error handling while fetching data
    fetch(`/api/alumni/mentor/time-blocks?date=${date.valueOf()}`)
      .then((response) => response.json())
      .then((data) => {
        setTime(data[0] ?? "none");
        return setOpenTimeBlocks(data);
      }),
      { cache: "no-store" };
  }, [date]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!date || !date.isValid()) {
      alert("Please select valid date.");
      return false;
    }

    if (!time || time === "none") {
      alert("Please select valid time.");
      return false;
    }

    if (!description || description.trim().length === 0) {
      alert("Description cannot be empty.");
      return false;
    }

    const formData = {
      date: date.valueOf(),
      time,
      description: description.trim(),
    };

    const response = await fetch("/api/meetings", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);

    // TODO: If succeeds, redirect to confirmation page or display confirmation modal.
    // TODO: If fails (time slot is taken), display error message.
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      onSubmit={onSubmit}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            component="h3"
            sx={{
              // 24pt, 14pt, bold
              fontSize: { xs: "19px", md: "32px" },
              fontWeight: 500,
            }}
          >
            {"Meet your mentor!"}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Button
            type="submit"
            sx={{ width: "100%", height: "100%" }}
            variant="contained"
          >
            Request
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "1rem",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography>Date:</Typography>
          <MeetingDatePicker date={date} setDate={setDate} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>Time:</Typography>
          <MeetingTimePicker
            openTimeBlocks={openTimeBlocks}
            time={time}
            setTime={setTime}
          />
        </Box>
      </Box>

      <Box>
        <Typography>Description:</Typography>
        <MeetingDescriptionInput
          description={description}
          setDescription={setDescription}
        />
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Button
          type="submit"
          sx={{ width: "100%", height: "100%" }}
          variant="contained"
        >
          Request
        </Button>
      </Box>
    </form>
  );
}
