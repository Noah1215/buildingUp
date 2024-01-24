import dayjs, { Dayjs } from "dayjs";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const TIME_BLOCK_DURATION = 30;

// MeetingRequestForm
export default function MeetingTimePicker({
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
