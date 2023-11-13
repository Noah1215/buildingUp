"use client";

import React from "react";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";

type Status = "Mobile" | "Desktop";

const SignInForm = (props: { device: Status }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (error) {
      alert(error);
      router.push("/error");
    } else {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user?.id)
        .single();
      const userRole = data?.role;

      if (userRole === "admin") {
        router.push("/admin");
      } else if (userRole === "mentor") {
        router.push("/mentor");
      } else if (userRole === "alumni") {
        router.push("/alumni");
      } else {
        router.push("/error");
      }
    }
  };

  if (props.device === "Mobile") {
    return (
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-basic__email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          variant="outlined"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        />
        <TextField
          id="outlined-basic__password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          variant="outlined"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        />
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
          onClick={handleSignIn}
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
    );
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="filled-basic__email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        variant="filled"
        margin="normal"
        color="warning"
        sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
      />
      <TextField
        id="filled-basic__password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
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
        onClick={handleSignIn}
        variant="contained"
        color="warning"
        fullWidth
        sx={{ height: "3.5rem", margin: "3rem 0 6rem 0" }}
      >
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
