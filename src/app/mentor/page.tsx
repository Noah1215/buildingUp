import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Avatar from "@mui/material/Avatar";

import { deepOrange } from "@mui/material/colors";

import JobDistribution from "@/recharts/JobDistribution";
import CurrentJob from "@/recharts/CurrentJob";
import FrontTableHeader from "@/components/FrontTableHeader";
import ChartHeader from "@/components/ChartHeader";
import FrontMentorBox from "@/components/FrontMentorBox";
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
          marginBottom: "2rem",
        }}
      >
        <FrontMentorBox>
          <TableContainer sx={{ height: "270px", overflowY: "auto" }}>
            <Table>
              <FrontTableHeader title="Upcoming Events" size={3} />
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
        </FrontMentorBox>
        <FrontMentorBox>
          <TableContainer sx={{ height: "270px", overflowY: "auto" }}>
            <Table>
              <FrontTableHeader title="New Request" size={2} />
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
        </FrontMentorBox>
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          gap: "10%",
          flexDirection: { xs: "column", sm: "row" },
          marginBottom: "2rem",
        }}
      >
        <FrontMentorBox>
          <ChartHeader
            title="Job Distribution"
            updated="Last updated on April 2023"
          />
          <Box
            sx={{
              height: "370px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <JobDistribution />
          </Box>
        </FrontMentorBox>

        <FrontMentorBox>
          <ChartHeader
            title="Current Job by Education Level"
            updated="Last updated on April 2023"
          />
          <Box
            sx={{
              height: "370px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CurrentJob />
          </Box>
        </FrontMentorBox>
      </Box>
    </>
  );
};

export default mentorPage;
