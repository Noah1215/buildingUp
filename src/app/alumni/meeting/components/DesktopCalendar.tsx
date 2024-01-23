"use client";
// day.js
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
// MUI
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
// lib
import { useEffect, useState } from "react";
import { DesktopMeetingModal } from "./DesktopMeetingModal";

export default function DesktopCalendar({
  month,
  meetings,
}: {
  month: Dayjs;
  meetings: any[];
}) {
  const startOfMonth = month.startOf("month");
  const firstDay = startOfMonth.subtract(startOfMonth.day(), "day");
  const weekdays: string[] = [0, 1, 2, 3, 4, 5, 6].map((day) =>
    dayjs().day(day).format("ddd")
  );

  // Calendar
  const [dates, setDates] = useState<any>([]);
  // Modal
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

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
      }
      weeks.push(week);
    }
    setDates(weeks);
  }, [meetings]);

  return (
    <>
      <CalendarContainer>
        <CalendarHeader>
          {weekdays.map((dayOfWeek: string) => (
            <HeaderColumn key={dayOfWeek}>
              <HeaderText>{dayOfWeek}</HeaderText>
            </HeaderColumn>
          ))}
        </CalendarHeader>
        <CalendarBody>
          {dates.map((week: any[], index: number) => (
            <CalendarRow key={`row-${index}`}>
              {week.map((day) => (
                <CalendarColumn key={day.date.format("MM-DD")}>
                  <ColumnHeader>{day.date.format("D")}</ColumnHeader>
                  <ColumnBody>
                    {day.dailyMeetings.map((meeting: any) => (
                      <Button
                        key={meeting.start_time}
                        sx={{
                          backgroundColor: "#024761",
                          padding: "0",
                          "&:hover": {
                            backgroundColor: "#2f597d",
                          },
                        }}
                        onClick={() => {
                          setSelected(meeting);
                          setOpen(true);
                        }}
                      >
                        <CalendarItemText>
                          {dayjs(meeting.start_time).format("hh:mm A")}
                        </CalendarItemText>
                      </Button>
                    ))}
                  </ColumnBody>
                </CalendarColumn>
              ))}
            </CalendarRow>
          ))}
        </CalendarBody>
      </CalendarContainer>
      <DesktopMeetingModal open={open} setOpen={setOpen} meeting={selected} />
    </>
  );
}

const CalendarContainer = styled("section")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const CalendarNav = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const CalendarHeader = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const HeaderColumn = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 0%",
  padding: "0.25rem",
});

const HeaderText = styled("p")({
  fontSize: "19px",
  fontWeight: 400,
  margin: 0,
});

const CalendarBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 0%",
  overflow: "hidden",
  border: "1px solid #E0E0E0",
});

const CalendarRow = styled("div")({
  display: "flex",
  flexDirection: "row",
  flex: "1 1 0%",
});

const CalendarColumn = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 0%",
  border: "1px solid #E0E0E0",
});

const ColumnHeader = styled("div")({
  padding: "0.25rem",
});

const ColumnBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 0%",
  gap: "0.25rem",
});

const CalendarItemText = styled("p")({
  fontSize: "19px",
  fontWeight: 400,
  color: "white",
  margin: 0,
});
