"use client";

//React
import React from "react";
import { useState } from "react";
//Next
import Link from "next/link";
import { useRouter } from "next/navigation";
//Supabase
import { createClient } from "@/lib/supabase/client";
import { getUser, getUserRole } from "@/app/supabase-client";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Alert, Snackbar } from "@mui/material";

type Status = "Mobile" | "Desktop";

const SignInForm = (props: { device: Status }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
      //alert(error);
      setTimeout(() => {
        router.push("/");
      }, 3000);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSignIn();
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  const onEmailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const EmailValidation = () => {
    let check =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email == "") {
      return false;
    } else {
      return !check.test(email);
    }
  };

  const PasswordValidation = () => {
    //let check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    let check = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (password == "") {
      return false;
    } else {
      return !check.test(password);
    }
  };

  if (props.device === "Mobile") {
    return (
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleFormSubmit}
      >
        <TextField
          id="outlined-basic__email"
          label="Email"
          onChange={onEmailHandler}
          value={email}
          variant="outlined"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
          error={EmailValidation()}
          helperText={EmailValidation() ? "Invalid email format." : ""}
        />
        <TextField
          id="outlined-basic__password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={onPasswordHandler}
          value={password}
          variant="outlined"
          margin="normal"
          color="warning"
          sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
          error={PasswordValidation()}
          //helperText={ PasswordValidation() ? "Your password must have at least 8 letters, numbers and symbols (such as ! and %)." : ""}
          helperText={
            PasswordValidation()
              ? "Your password must have at least 8 letters and numbers."
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          fullWidth
          sx={{ height: "3.5rem" }}
        >
          Login
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    );
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleFormSubmit}
    >
      <TextField
        id="filled-basic__email"
        label="Email"
        onChange={onEmailHandler}
        onKeyDown={handleKeyPress}
        value={email}
        variant="filled"
        margin="normal"
        color="warning"
        sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        error={EmailValidation()}
        helperText={EmailValidation() ? "Invalid email format." : ""}
        FormHelperTextProps={{
          style: {
            color: "orange",
            backgroundColor: "#024761",
            margin: 0,
            paddingLeft: 15,
          },
        }}
      />
      <TextField
        id="filled-basic__password"
        label="Password"
        onChange={onPasswordHandler}
        onKeyDown={handleKeyPress}
        type={showPassword ? "text" : "password"}
        value={password}
        variant="filled"
        margin="normal"
        color="warning"
        sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
        error={PasswordValidation()}
        //helperText={ PasswordValidation() ? "Your password must have at least 8 letters, numbers and symbols (such as ! and %)." : ""}
        helperText={
          PasswordValidation()
            ? "Your password must have at least 8 letters and numbers."
            : ""
        }
        FormHelperTextProps={{
          style: {
            color: "orange",
            backgroundColor: "#024761",
            margin: 0,
            paddingLeft: 15,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          "Fail Login. Check your ID and Password"
        </Alert>
      </Snackbar>
    </form>
  );
};

export default SignInForm;
