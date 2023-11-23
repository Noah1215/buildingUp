import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Avatar from "@mui/material/Avatar";

import { deepOrange } from "@mui/material/colors";
interface Irow {
  category?: string;
  label: string;
  date?: Date;
  num?: number;
}

const rows: readonly Irow[] = [
  {
    category: "Workshop",
    label: "Alumni Workshop",
    date: new Date(2023, 10, 28),
  },
  {
    category: "Workshop",
    label: "Trainees Workshop",
    date: new Date(2023, 10, 24),
  },
  {
    category: "Seminar",
    label: "Trainees Seminar",
    date: new Date(2023, 10, 20),
  },
  {
    category: "Party",
    label: "Trainees Dinner Workshop",
    date: new Date(2023, 10, 18),
  },
];

const requests: readonly Irow[] = [
  { label: "Support Requset", num: 2 },
  { label: "Meeting Requset", num: 3 },
];

const mentorPage = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          gap: "10%",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Paper
          sx={{
            width: { xs: "100%", md: "40%" },
            overflow: "hidden",
            borderRadius: "0.5rem",
            marginBottom: { xs: "2rem", md: 0 },
            elevation: 0,
            boxShadow: {
              xs: "none",
              md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            },
          }}
        >
          <TableContainer sx={{ height: "270px", overflowY: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{
                      backgroundColor: { xs: "#FFF", md: "#024761" },
                      borderBottom: { xs: "1px solid #C4C4C4", md: "none" },
                      padding: { xs: "0.4rem 0", md: "0.8rem 2rem" },
                      border: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: { xs: "#000", md: "#FFF" },
                        fontSize: "1.3rem",
                        fontWeight: { xs: "600", md: "400" },
                      }}
                    >
                      Upcoming Events
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      border: "none",
                      "&:hover": {
                        backgroundColor: "#EBF4FF",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        width: "10%",
                        paddingLeft: { xs: 0, md: "2rem" },
                        textAlign: "left",
                      }}
                    >
                      [{row.category}]
                    </TableCell>
                    <TableCell sx={{ width: "50%", textAlign: "left" }}>
                      {row.label}
                    </TableCell>
                    <TableCell sx={{ width: "30%", textAlign: "center" }}>
                      {row.date?.toLocaleDateString("en-US")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper
          sx={{
            width: { xs: "100%", md: "40%" },
            overflow: "hidden",
            borderRadius: "0.5rem",
            marginBottom: { xs: "2rem", md: 0 },
            boxShadow: {
              xs: "none",
              md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            },
          }}
        >
          <TableContainer sx={{ height: "270px", overflowY: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      backgroundColor: { xs: "#FFF", md: "#024761" },
                      borderBottom: { xs: "1px solid #C4C4C4", md: "none" },
                      padding: { xs: "0.4rem 0", md: "0.8rem 2rem" },
                      border: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: { xs: "#000", md: "#FFF" },
                        fontSize: "1.3rem",
                        fontWeight: { xs: "600", md: "400" },
                      }}
                    >
                      New Request
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      border: "none",
                      "&:hover": {
                        backgroundColor: "#EBF4FF",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ width: "60%", paddingLeft: { xs: 0, md: "2rem" } }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "30%",
                      }}
                    >
                      {row.num !== undefined ? (
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 20,
                            height: 20,
                            margin: "auto",
                          }}
                        >
                          <Typography sx={{ fontSize: "1rem" }}>
                            {row.num}
                          </Typography>
                        </Avatar>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default mentorPage;
