"use client";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(weekday);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// getLocaleAwareWeekdays("ddd", "en") => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export function getLocaleAwareWeekdays(format: string, userLocale?: string) {
  const localAwareWeekdays = [0, 1, 2, 3, 4, 5, 6].map((day) =>
    dayjs()
      .locale(userLocale ?? dayjs().locale())
      .weekday(day)
      .format(format)
  );
  return localAwareWeekdays;
}
