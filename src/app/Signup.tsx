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

type FormValues = {
  email: string;
  password: string;
};

export const Signup = () => {
  const {
    handleSubmit,
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Signup;
