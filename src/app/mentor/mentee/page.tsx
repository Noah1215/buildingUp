import React from "react";

import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import FilterListIcon from "@mui/icons-material/FilterList";

const Mentee = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Typography variant="h5" fontWeight="bold" align="left" style={{marginTop:"8px"}}>
            Mentee List
          </Typography>
          <Typography variant="subtitle1" align="left">
            Total: XX
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container alignItems="center">
            <Typography variant="h6" fontWeight="bold" align="left" style={{ marginRight: "8px", marginTop: "10px" }}>
              Noah Park
            </Typography>
            <Tooltip title="Send a message">
              <EmailIcon />
            </Tooltip>
          </Grid>
          <Typography variant="subtitle1" fontWeight="bold" align="left" color="#0263E0" style={{ marginTop: "10px", marginBottom: "8px" }}>
            Details
          </Typography>
          <Divider />

          {/* Personal info table */}
          <Typography variant="h6" fontWeight="bold" align="left" style={{ marginTop: "20px" }}>
            Personal Information
          </Typography>

          <TableContainer  style={{ marginLeft: "-15px", marginTop: "8px", border: 'none', backgroundColor: 'transparent' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      First Name
                    </Typography>
                    <Typography variant="body1">
                      Noah
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Middle Name
                    </Typography>
                    <Typography variant="body1">
                      -
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Last Name
                    </Typography>
                    <Typography variant="body1">
                      Park
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Phone Number
                    </Typography>
                    <Typography variant="body1">
                      123-456-7890
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Email
                    </Typography>
                    <Typography variant="body1">
                      example@gmail.com
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Work Status */}
          <Typography variant="h6" fontWeight="bold" align="left" style={{ marginTop: "20px" }}>
            Work Status
          </Typography>

          <TableContainer  style={{ marginLeft: "-15px", marginTop: "8px", border: 'none', backgroundColor: 'transparent' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Job
                    </Typography>
                    <Typography variant="body1">
                      Truck Driver
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Union
                    </Typography>
                    <Typography variant="body1">
                      Local 95
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Employer
                    </Typography>
                    <Typography variant="body1">
                      Sienna Electrician
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Current Wage
                    </Typography>
                    <Typography variant="body1">
                      $27.50
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Initial Wage
                    </Typography>
                    <Typography variant="body1">
                      $25.00
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: 'none' }}>
                    <Typography variant="subtitle2" >
                      Wage Raise
                    </Typography>
                    <Typography variant="body1">
                      $2.50
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Notes */}
          <Typography variant="h6" fontWeight="bold" align="left" style={{ marginTop: "20px" }}>
            Notes
          </Typography>
          <Paper elevation={0} style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#EBF4FF", marginTop: "8px" }}>
            <Typography variant="subtitle2" fontWeight="bold" align="left" >
              Memo
            </Typography>
          </Paper>

        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            style={{ marginTop: "-550px", marginBottom: "16px" }}
            InputProps={{
              startAdornment: <SearchIcon />,
              endAdornment: <FilterListIcon />,
            }}
          />
        <Grid item xs={12} container spacing={2}>
        </Grid>          
        </Grid>
      </Grid>
    </Container>
  );
};

export default Mentee;
