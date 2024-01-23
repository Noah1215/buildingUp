import dayjs from "dayjs";

import { Avatar, Box, IconButton, Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function MobileMeetingModal({
  open,
  setOpen,
  meeting,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meeting: any;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          width: "100%",
        },
      }}
    >
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {meeting ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <Avatar
                sx={{ width: "50px", height: "50px" }}
                alt="Mentor Avatar"
                src="https://i.pravatar.cc/100"
              />
              <Box>
                <Box>{meeting.mentor_name}</Box>
                <Box>{dayjs(meeting.start_time).fromNow()}</Box>
              </Box>
            </Box>
            <Box>
              <Box>Date:</Box>
              <Box>{dayjs(meeting.start_time).format("L")}</Box>
            </Box>
            <Box>
              <Box>Time:</Box>
              <Box>
                {dayjs(meeting.start_time).format("LT")} -
                {dayjs(meeting.end_time).format("LT")}
              </Box>
            </Box>
            <Box>
              <Box>Status:</Box>
              <Box>{meeting.status}</Box>
            </Box>
            <Box>
              <Box>Link:</Box>
              <Box>{meeting.link ?? "N/A"}</Box>
            </Box>
            <Box>
              <Box>Description:</Box>
              <Box>{meeting.description ?? "N/A"}</Box>
            </Box>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon
                sx={{
                  color: "white",
                  background: "#4b5057",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          </>
        ) : (
          <Box>Oops, something went wrong</Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
