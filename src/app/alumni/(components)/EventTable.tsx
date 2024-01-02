"use client";
// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

interface Event {
  category: string;
  label: string;
  date: Date;
}

// TODO
const data: readonly Event[] = [
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

export default function EventTable() {
  return (
    <TableContainer
      sx={{
        height: {
          md: "270px",
        },
        overflowY: "auto",
      }}
    >
      <Table>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={`${index} ${row.label}`}
              sx={{
                border: "none",
                "&:hover": {
                  backgroundColor: "#EBF4FF",
                },
              }}
            >
              <TableCell
                sx={{
                  width: "70%",
                  paddingLeft: { xs: 0, md: "2rem" },
                  textAlign: "left",
                }}
              >
                [{row.category}] {row.label}
              </TableCell>
              <TableCell
                sx={{
                  width: "30%",
                  paddingRight: { xs: 0, md: "2rem" },
                  textAlign: "right",
                }}
              >
                {row.date?.toLocaleDateString("en-US")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
