"use client";
import { useEffect, useRef, useState } from "react";
// day.js
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// MUI
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from "@mui/material";
// Components
import { MobileMeetingModal } from "./MobileMeetingModal";

const StyledList = styled(List)({
  display: "flex",
  gap: "0.5rem",
});

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  flex: 1,
  aspectRatio: "1",
  justifyContent: "center",
  "&.Mui-selected": {
    borderRadius: "50%",
    backgroundColor: "#99cb85",
  },
}));

const StyledListItemText = styled(ListItemButton)(({ theme }) => ({
  justifyContent: "center",
  padding: 0,
}));

export default function DesktopCalendar({
  month,
  meetings,
}: {
  month: Dayjs;
  meetings: any[];
}) {
  const today = dayjs();
  const startOfMonth = month.startOf("month");
  const firstDay = startOfMonth.subtract(startOfMonth.day(), "day");
  const weekdays: string[] = [0, 1, 2, 3, 4, 5, 6].map((day) =>
    dayjs().day(day).format("ddd")
  );
  // Calendar
  const [dates, setDates] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today);
  const meetingList = useRef<any[]>([]);
  const prevMonth = useRef<Dayjs | null>(null);
  // Modal
  const selectedMeeting = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("meetingList.current", meetingList.current);
    meetingList.current = [];
    // if (!prevMonth.current) {
    //   setSelectedDate(today);
    // } else {
    //   setSelectedDate(month);
    // }
    if (month.isSame(today, "month")) {
      setSelectedDate(today);
    } else {
      setSelectedDate(month);
    }
    prevMonth.current = month;
    console.log("meetingList.current", meetingList.current);
  }, [month]);

  useEffect(() => {
    const weeks = [];
    for (let i = 0; i < 5; i++) {
      const week: any = [];
      for (let j = 0; j < 7; j++) {
        const currDate = dayjs(firstDay).add(i * 7 + j, "day");

        const dailyMeetings = meetings.filter(
          (meeting) =>
            dayjs(meeting["start_time"]).isSameOrAfter(
              currDate.startOf("day")
            ) &&
            dayjs(meeting["start_time"]).isSameOrBefore(currDate.endOf("day"))
        );
        week.push({
          date: currDate,
          dailyMeetings: dailyMeetings,
        });

        if (currDate.isSame(selectedDate, "day")) {
          meetingList.current = dailyMeetings;
        }
      }
      weeks.push(week);
    }
    setDates(weeks);
  }, [meetings]);

  console.log("MobileCalendar");

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          {weekdays.map((weekday) => (
            <Box key={weekday} sx={{ flex: 1, textAlign: "center" }}>
              {weekday}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "fleX", flexDirection: "column", gap: "0.5rem" }}>
          {dates.map((week: any[], index: number) => (
            <StyledList disablePadding key={`row-${index}`}>
              {week.map((day) => (
                <StyledListItemButton
                  key={day.date.format("MM-DD")}
                  selected={day.dailyMeetings.length > 0}
                  onClick={() => {
                    setSelectedDate(day.date);
                    meetingList.current = day.dailyMeetings;
                  }}
                >
                  <StyledListItemText>
                    {day.date.format("D")}
                  </StyledListItemText>
                </StyledListItemButton>
              ))}
            </StyledList>
          ))}
        </Box>
      </Box>
      <Divider />
      <Box sx={{}}>
        <List
          disablePadding
          subheader={
            <ListSubheader sx={{ padding: 0 }}>
              {selectedDate.format("MMMM D")}
            </ListSubheader>
          }
          sx={{ padding: 0 }}
        >
          {meetingList.current.length > 0 &&
            meetingList.current.map((meeting: any) => (
              <ListItemButton
                key={meeting.start_time}
                sx={{ background: "#eef3ff", color: "#234561", padding: 0 }}
                onClick={() => {
                  selectedMeeting.current = meeting;
                  setOpen(true);
                }}
              >
                <ListItemText sx={{ paddingLeft: "2rem" }}>{`${dayjs(
                  meeting.start_time
                ).format("LT")} -
                    ${dayjs(meeting.end_time).format("LT")} | ${
                      meeting.mentor_name
                    }`}</ListItemText>
              </ListItemButton>
            ))}
        </List>
      </Box>
      <MobileMeetingModal
        open={open}
        setOpen={setOpen}
        meeting={selectedMeeting.current}
      />
    </Box>
  );
}
