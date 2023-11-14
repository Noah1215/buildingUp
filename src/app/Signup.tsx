"use client";
import React from "react";
import Link from "next/link";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";

type Status = "Mobile" | "Desktop";

const Signup = (props: { device: Status }) => {
  if (props.device === "Mobile") {
    return (
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-basic__email"
          label="Email"
          variant="outlined"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        />
        <TextField
          id="outlined-basic__password"
          label="Password"
          variant="outlined"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        />
      </form>
    );
  } else if (props.device === "Desktop") {
    return (
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="filled-basic__email"
          label="Email"
          variant="filled"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        />
        <TextField
          id="filled-basic__password"
          label="Password"
          variant="filled"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          component="footer"
        >
          <FormControlLabel
            control={<Checkbox color="warning" sx={{ color: "white" }} />}
            label={<span style={{ color: "white" }}>Remember me</span>}
          />

          <Link href="/findPassword" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "#727272",
                "&:hover": {
                  color: "white",
                  cursor: "pointer",
                },
              }}
            >
              Forgot the password?
            </Typography>
          </Link>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="warning"
          href="/"
          fullWidth
          sx={{ height: "3.5rem", margin: "3rem 0 6rem 0" }}
        >
          Login
        </Button>
      </form>
    );
  }
};

export default Signup;

