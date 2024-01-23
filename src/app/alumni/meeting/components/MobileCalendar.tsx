"use client";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(weekday);
dayjs.extend(timezone);

// 구글 캘린더 처럼 반으로 갈라서 절반은 달력 절반은 이벤트 목록

export default function MobileCalendar({
  dates,
  userLocale,
  userTimezone,
}: {
  dates: any;
  userLocale?: string;
  userTimezone?: string;
}) {
  const browserLocale = dayjs().locale();
  const weekdays = [0, 1, 2, 3, 4, 5, 6].map((day) =>
    dayjs()
      .locale(userLocale ?? browserLocale)
      .weekday(day)
      .format("ddd")
  );

  const CalendarDates = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        row.push(
          <Box
            key={`row-${i}-col-${j}`}
            sx={{ width: "100%", padding: "0.5rem" }}
          >
            {dates[i][j].date}
          </Box>
        );
      }
      rows.push(
        <Box
          key={`row-${i}`}
          sx={{ display: "flex", flexDirection: "row", height: "100%" }}
        >
          {row}
        </Box>
      );
    }
    console.log("rows", rows);
    return rows;
  };

  return (
    <Box
      className="desktop-calendar"
      component="section"
      sx={{
        display: { xs: "flex", md: "none" },
        flexDirection: "column",
        height: "100%",
        flex: { xs: "none", md: "1" },
      }}
    >
      <Box>
        <h2>January</h2>
      </Box>
      <Box
        className="calendar-header"
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {weekdays.map((day) => (
          <Box key={day} sx={{ width: "100%", padding: "0.5rem" }}>
            {day}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          border: "1px solid #E0E0E0",
        }}
      >
        <CalendarDates />
      </Box>
    </Box>
  );
}

/*sx={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #E0E0E0",
            }}*/
