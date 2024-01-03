"use client";
// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

interface Support {
  label: string;
  status: string;
}

// TODO
const data: readonly Support[] = [
  {
    label: "Financial Support",
    status: "Pending",
  },
];

export default function EventTable() {
  return (
    <TableContainer
      sx={{
        height: {
          md: 270,
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
                  width: "700%",
                  paddingLeft: { xs: 0, md: "2rem" },
                  textAlign: "left",
                }}
              >
                {row.label}
              </TableCell>
              <TableCell
                sx={{
                  width: "30%",
                  paddingRight: { xs: 0, md: "2rem" },
                  textAlign: "right",
                }}
              >
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
