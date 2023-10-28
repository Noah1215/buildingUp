"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const Signup = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "ara19@gmail.com",
      password: "password1234",
    });
    console.log(data, error);
    router.refresh();
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box height="100vh" display="flex" component="main">
      <Box
        sx={{
          flex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="section"
      >
        {isSmallScreen ? (
          <Box component="article">
            <Box component="header">
              <Typography variant="h4" color="#024761" sx={{ fontWeight: 600 }}>
                <span>Sign In</span>
              </Typography>
              <Typography variant="h4" sx={{ marginTop: "0.3rem" }}>
                <span>Building Up - Alumni</span>
              </Typography>
            </Box>
            <Typography marginTop="2rem" component="p">
              If you don't have an account register,
            </Typography>
            <Typography marginBottom="1rem " component="p">
              Contact your mentor!
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
            <Link href="/findPassword" style={{ textDecoration: "none" }}>
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
            </Link>
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
          </Box>
        ) : (
          <Image
            src="/img/logo.png"
            alt="logo"
            width={324}
            height={71}
            priority
          />
        )}
      </Box>
      <Box
        sx={{
          flex: 4,
          backgroundColor: "#024761",
          display: isSmallScreen ? "none" : "flex",
          alignItems: "center",
        }}
        component="section"
      >
        <Box
          style={{
            width: "80%",
            margin: "auto",
          }}
          component="article"
        >
          <Typography
            variant="h4"
            sx={{ color: "white", marginBottom: "5rem" }}
            component="header"
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

            <Box
              style={{
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
              variant="contained"
              color="warning"
              style={{ margin: "3rem 0 6rem 0" }}
              fullWidth
              sx={{ height: "3.5rem" }}
              onClick={signInWithEmail}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
