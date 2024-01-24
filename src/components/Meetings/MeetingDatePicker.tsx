import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// MeetingRequestForm
export default function MeetingDatePicker({
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
      <DatePicker
        slotProps={{ textField: { fullWidth: true } }}
        disablePast={true}
        maxDate={date.add(2, "weeks")}
        value={date}
        onAccept={(value: Dayjs | null) => onDateChange(value)}
      />
    </LocalizationProvider>
  );
}
