"use client";
import { useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Box, Paper, Modal, Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function DesktopMeetingModal({
  open,
  setOpen,
  meeting,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meeting: any;
}) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      slotProps={{
        backdrop: {
          invisible: true,
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        elevation={8}
        sx={{
          position: "absolute",
          bottom: "2rem ",
          right: "2rem",
          width: "30rem",
          height: "35rem",
        }}
      >
        {meeting ? (
          <Box
            sx={{
              position: "relative",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <Avatar
                sx={{ width: "80px", height: "80px" }}
                alt="Mentor Avatar"
                src="https://i.pravatar.cc/100"
              />
              <Box>
                <Box>{meeting.mentor_name}</Box>
                <Box>{dayjs(meeting.start_time).fromNow()}</Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box>Date:</Box>
                <Box>{dayjs(meeting.start_time).format("MM/DD/YYYY")}</Box>
              </Box>
              <Box>
                <Box>Time:</Box>
                {meeting ? (
                  <Box>
                    {`${dayjs(meeting.start_time).format("hh:mm A")} - ${dayjs(
                      meeting.end_time
                    ).format("hh:mm A")}`}
                  </Box>
                ) : (
                  <Box>N/A</Box>
                )}
              </Box>
              <Box>
                <Box>Status</Box>
                {meeting ? <Box>{meeting.status}</Box> : <Box>N/A</Box>}
              </Box>
            </Box>
            <Box>
              <Box>Link</Box>
              <Box>{meeting.link ?? "N/A"}</Box>
            </Box>
            <Box>
              <Box>Description</Box>
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
          </Box>
        ) : (
          <Box>Loading...</Box>
        )}
      </Paper>
    </Modal>
  );
}
