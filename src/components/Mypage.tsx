"use client"

import { Email, Lock, Person, Phone, UploadFile } from "@mui/icons-material";
import { Box, Typography, Avatar, Button, TextField, IconButton, Stack, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function Mypage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e:any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e:any) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById('imageInput');
    if (inputElement) {
      inputElement.addEventListener('change', handleImageChange);
    }
  }, []);

  const handleUploadClick = () => {
    const inputElement = document.getElementById('imageInput');
    if (inputElement) {
      inputElement.click();
    }
  };

  const handleBackClick = () => {
    console.log("Go Back");
  };

  const handleSaveClick = () => {
    console.log("Save");
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={6} md={6} sx={{ textAlign: 'left', paddingLeft: '30px' }}>
          <Typography variant="h5" fontWeight='bold' align="left" gutterBottom>
            My Page
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} sx={{ textAlign: 'right', paddingRight: '30px' }}>
          <Button
            variant="contained"
            onClick={handleSaveClick}
            sx={{ backgroundColor: "#024761", color: "white", width: '100px', height: '35px', borderRadius: '10px' }}
          >
            Save
          </Button>
        </Grid>        
      </Grid>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {image ? (
          <Avatar
            src={image}
            alt="Profile Image"
            sx={{ 
              width: "12rem", 
              height: "12rem" 
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: { xs: "8rem", md: "12rem" },
              height: { xs: "8rem", md: "12rem" },
              //width: "50%",
              //height: "50%",
              backgroundColor: "#D9D9D9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              //borderRadius: { xs: "4rem", md: "6rem" },
              //borderRadius: "50%",
              position: 'relative'
            }}
          >
          </Avatar>          
        )}
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <IconButton
          onClick={handleUploadClick}
          sx={{
            color: 'black',
            position: 'absolute',
            bottom: '-10px',
            right: '-10px',
            zIndex: 1
          }}
        >
          <UploadFile
            sx={{
              width: '3rem',
              height: '3rem',  
            }}
          />
        </IconButton>
      </Box>

      <Stack spacing={0.5} width="80%">        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'black' 
          }}
        >
          Email address
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            borderRadius: '10px',
            //backgroundColor: "#D9D9D9" 
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TextField 
            //label="Email"
            type="email"
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0, '& input': {height: '10px'} }}
            InputProps={{
              style: {
                borderRadius: '10px'
              },
              endAdornment: (
                <IconButton>
                  <Email />
                </IconButton>
              )
            }}
          />
        </Box>

        <Typography 
          variant="subtitle1"
          sx={{ 
            fontWeight: 'bold', 
            color: 'black' 
          }}
        >
          Password
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: '10px',
            //backgroundColor: "#D9D9D9",
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TextField 
            //label="Password"
            type="password" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0, '& input': {height: '10px'} }}
            InputProps={{
              style: {
                borderRadius: '10px'
              },
              endAdornment: (
                <IconButton>
                  <Lock />
                </IconButton>
              )
            }}
          />
        </Box>

        <Typography 
          variant="subtitle1"
          sx={{ 
            fontWeight: 'bold', 
            color: 'black' 
          }}
        >
          Password Confirm
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: '10px',
            //backgroundColor: "#D9D9D9",
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TextField 
            //label="Password Confirm"
            type="password" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0, '& input': {height: '10px'} }}
            InputProps={{
              style: {
                borderRadius: '10px'
              },
              endAdornment: (
                <IconButton>
                  <Lock />
                </IconButton>
              )
            }}
          />
        </Box>

        <Typography 
          variant="subtitle1"
          sx={{ 
            fontWeight: 'bold', 
            color: 'black' 
          }}
        >
          First Name
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: '10px',
            //backgroundColor: "#D9D9D9",
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TextField 
            //label="FirstName"
            type="text" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0, '& input': {height: '10px'} }}
            InputProps={{
              style: {
                borderRadius: '10px'
              },
              endAdornment: (
                <IconButton>
                  <Person />
                </IconButton>
              )
            }}
          />
        </Box>

        <Typography 
          variant="subtitle1"
          sx={{ 
            fontWeight: 'bold', 
            color: 'black' 
          }}
        >
          Last Name
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: '10px',
            //backgroundColor: "#D9D9D9",
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TextField 
            //label="LastName"
            type="text" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0, '& input': {height: '10px'} }}
            InputProps={{
              style: {
                borderRadius: '10px'
              },
              endAdornment: (
                <IconButton>
                  <Person />
                </IconButton>
              )
            }}
          />
        </Box>

        <Typography 
          variant="subtitle1"
          sx={{ 
            fontWeight: 'bold', 
            color: 'black' 
          }}
        >
          Phone Number
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: '10px',
            //backgroundColor: "#D9D9D9",
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TextField 
            //label="PhoneNumber"
            type="tel"
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0, '& input': {height: '10px'} }}
            InputProps={{
              style: {
                borderRadius: '10px'
              },
              endAdornment: (
                <IconButton>
                  <Phone />
                </IconButton>
              )
            }}
          />
        </Box>
      </Stack>
      {/*
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '80%',
          mt: 3
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBackClick}
          sx={{ backgroundColor: "#024761", color: "white", width: '200px', height: '70px', borderRadius: '40px', mr: 10 }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={handleSaveClick}
          sx={{ backgroundColor: "#024761", color: "white", width: '200px', height: '70px', borderRadius: '40px', mr: 10 }}
        >
          Save
        </Button>
      </Box>
      */}
    </Box>
  );
}
