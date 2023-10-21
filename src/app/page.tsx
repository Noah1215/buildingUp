"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box height="100vh" display="flex">
      <Box
        sx={{
          flex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSmallScreen ? (
          <div>
            <Typography variant="h4" color="#024761" sx={{ fontWeight: 600 }}>
              <span>Sign In</span>
            </Typography>
            <Typography variant="h4" sx={{ marginTop: "0.3rem" }}>
              <span>Building Up - Alumni</span>
            </Typography>
            <Typography marginTop="2rem">
              If you don’t have an account register
            </Typography>
            <Typography marginBottom="2rem ">
              You can {""}
              <a
                href="/register"
                style={{
                  textDecoration: "none",
                  color: "#4D47C3",
                  fontWeight: "bold",
                }}
              >
                Register here !
              </a>
            </Typography>

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
            <a href="/findPassword" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#727272",
                  "&:hover": {
                    color: "#024761",
                    cursor: "pointer",
                    fontWeight: "bold",
                  },
                }}
              >
                Forgot the password?
              </Typography>
            </a>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              style={{ margin: "3rem 0 6rem 0" }}
              href="/"
              fullWidth
              sx={{ height: "3.5rem" }}
            >
              Login
            </Button>
          </div>
        ) : (
          <img src="/img/logo.png" alt="logo" width="50%" />
        )}
      </Box>
      <Box
        sx={{
          flex: 4,
          backgroundColor: "#024761",
          display: isSmallScreen ? "none" : "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            margin: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "white", marginBottom: "5rem" }}
          >
            Welcome!
          </Typography>

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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={<Checkbox color="warning" sx={{ color: "white" }} />}
                label={<span style={{ color: "white" }}>Remember me</span>}
              />

              <a href="/findPassword" style={{ textDecoration: "none" }}>
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
              </a>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="warning"
              style={{ margin: "3rem 0 6rem 0" }}
              href="/"
              fullWidth
              sx={{ height: "3.5rem" }}
            >
              Login
            </Button>
          </form>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <a href="/register" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#727272",
                  "&:hover": {
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                Don't have an account? Register
              </Typography>
            </a>
          </div>
        </div>
      </Box>
    </Box>
  );
}
