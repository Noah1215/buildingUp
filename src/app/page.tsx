import React from "react";
import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import Signup from "./Signup";

export default function Home() {
  return (
    <Box height="100vh" display="flex" component="main">
      {/*Left Box */}
      <Box
        sx={{
          flex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component="section"
      >
        {/* Mobile */}
        <Box component="article" sx={{ display: { xs: "block", md: "none" } }}>
          <header>
            <Typography variant="h4" color="#024761" sx={{ fontWeight: 600 }}>
              <span>Sign In</span>
            </Typography>
            <Typography variant="h4" sx={{ marginTop: "0.3rem" }}>
              <span>Building Up - Alumni</span>
            </Typography>
          </header>
          <Typography marginTop="2rem" component="p">
            If you don't have an account register,
          </Typography>
          <Typography marginBottom="1rem " component="p">
            Contact your mentor!
          </Typography>
          <Signup device="Mobile" />
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
        {/* Desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Image
            src="/img/logo.png"
            alt="logo"
            width={324}
            height={71}
            priority
          />
        </Box>
      </Box>
      {/*Right Box*/}
      <Box
        sx={{
          flex: 4,
          backgroundColor: "#024761",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
        }}
        component="section"
      >
        <article
          style={{
            width: "80%",
            margin: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "white", marginBottom: "5rem" }}
            component="header"
          >
            Welcome!
          </Typography>

          <Signup device="Desktop" />
        </article>
      </Box>
    </Box>
  );
}
