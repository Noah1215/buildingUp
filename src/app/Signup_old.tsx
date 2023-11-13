"use client";
import React from "react";
import Link from "next/link";

import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";

import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Stack from "@mui/material/Stack/Stack";

type Status = "Mobile" | "Desktop";

type FormValues = {
  email: string;
  password: string;
};

export const Signup = (props: { device: Status }) => {

  const { handleSubmit,
          register, 
          formState: { errors }, 
          control,
        } = useForm<FormValues>({
          defaultValues: {
            email: "",
            password: "",
          },
        });
  
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  if (props.device === "Mobile") {
    return (
      <>
        <form style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit(onSubmit)} noValidate
        >
          <TextField
            id="outlined-basic__email"
            label="Email"
            variant="outlined"
            margin="normal"
            color="warning"
            type="email"
            sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            id="outlined-basic__password"
            label="Password"
            variant="outlined"
            margin="normal"
            color="warning"
            type="password"
            sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </form>
        <DevTool control={control} />  
      </>
    );
  } else if (props.device === "Desktop") {
    return (
      <>
        <form style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit(onSubmit)} noValidate
        >
          <TextField
            id="filled-basic__email"
            label="Email"
            variant="filled"
            margin="normal"
            color="warning"
            type="email"
            sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <TextField
            id="filled-basic__password"
            label="Password"
            variant="filled"
            margin="normal"
            color="warning"
            type="password"
            sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
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
        <DevTool control={control} />
      </>
    );
  }
};

export default Signup;
