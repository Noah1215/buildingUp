import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography/Typography";

type props = {
  title: string;
  size: number;
};

const FrontTableHeader = ({ title, size }: props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          colSpan={size}
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
            {title}
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default FrontTableHeader;
