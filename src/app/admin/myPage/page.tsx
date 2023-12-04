"use client"

import { Email, Lock, Person, Phone } from "@mui/icons-material";
import { Box, Typography, Avatar, Button, TextField, IconButton, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function MyPage() {
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
      <Typography variant="h4" align="center" gutterBottom>
        Edit Profile
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center' 
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
            //variant="rounded"
          />
        ) : (
          <Box
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
              borderRadius: "50%"
            }}
          >
          </Box>
        )}
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <Button
          onClick={handleUploadClick}
          variant="contained"
          sx={{ backgroundColor: "#333", color: "white", marginLeft: '10px' }}
        >
          Upload Image
        </Button>
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
            backgroundColor: "#D9D9D9" 
          }}
        >
          <TextField 
            label="Email" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0 }}
            InputProps={{
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
            backgroundColor: "#D9D9D9"
          }}
        >
          <TextField 
            label="Password"
            type="password" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0 }}
            InputProps={{
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
            backgroundColor: "#D9D9D9"
          }}
        >
          <TextField 
            label="FirstName"
            type="firstname" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0 }}
            InputProps={{
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
            backgroundColor: "#D9D9D9"
          }}
        >
          <TextField 
            label="LastName"
            type="lastname" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0 }}
            InputProps={{
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
            backgroundColor: "#D9D9D9"
          }}
        >
          <TextField 
            label="PhoneNumber"
            type="phonenumber" 
            variant="outlined" 
            sx={{ flexGrow: 1, mr: 0 }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Phone />
                </IconButton>
              )
            }}
          />
        </Box>
      </Stack>
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

    </Box>
  );
}
