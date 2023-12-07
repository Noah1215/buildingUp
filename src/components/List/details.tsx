// Details.tsx
import React, {useEffect} from "react";
import Typography from "@mui/material/Typography/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
//import Tabs from "@mui/material/Tabs";
//import Tab from "@mui/material/Tab";

import Tooltip from "@mui/material/Tooltip";
import EmailIcon from "@mui/icons-material/Email";

type MenteeDataType = {
  email: string;
  phone: string;
  name: string;
  joined_at: string;
  current_trade: string;
  current_employer: string;
  current_wage: number;
  last_wage: number,
  raise: number;
  cohort: string;
  notes: string;
}
interface MenteeDetailsProps{
  menteeData: MenteeDataType|null;
  selectedMentee:string|null;
}

const Details: React.FC<MenteeDetailsProps> = ({ menteeData, selectedMentee }) => {
  if (!menteeData) {
    return <div>No mentee data available.</div>;
  }
  const selectedMenteeData = menteeData.find((mentee) => mentee.name === selectedMentee);

  if (!selectedMenteeData) {
    return <div>Select a mentee</div>;
  }
  //console.log(selectedMenteeData);
  {/* tabs
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
*/}

  let [firstName, middleName, lastName] = selectedMenteeData.name.split(" ");
  if (!lastName){
    lastName = middleName;
    middleName = '';
  }

  return (
    <div>
      {selectedMentee && selectedMentee === selectedMenteeData.name && (
        <>
          <Grid container alignItems="center">
            <Typography variant="h6" fontWeight="bold" align="left" style={{ marginRight: "8px", marginTop: "10px" }}>
              {selectedMenteeData.name}
            </Typography>
            <Tooltip title="Send a message">
              <EmailIcon />
            </Tooltip>
          </Grid>
          <Typography variant="subtitle1" fontWeight="bold" align="left" color="#0263E0" style={{ marginTop: "10px", marginBottom: "8px" }}>
            Details
          </Typography>
          <Divider />
          {/*
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="#0263E0" textColor="#0263E0">
            <Tab label="Details" sx={{ textAlign: "left" }} />
          </Tabs>
          */}
          
          {/* Personal info table */}
          <Typography variant="h6" fontWeight="bold" align="left" style={{ marginTop: "20px" }}>
            Personal Information
          </Typography>
          <TableContainer
            style={{ marginLeft: "-15px", marginTop: "8px", border: "none", backgroundColor: "transparent" }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">First Name</Typography>
                    <Typography variant="body1">{firstName}</Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Middle Name</Typography>
                    <Typography variant="body1">{middleName ? middleName: '\u00A0'}</Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Last Name</Typography>
                    <Typography variant="body1">{lastName}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2"> Phone Number </Typography>
                    <Typography variant="body1">{selectedMenteeData.phone}</Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography variant="body1">{selectedMenteeData.email}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Work Status */}
          <Typography variant="h6" fontWeight="bold" align="left" style={{ marginTop: "20px" }}>
            Work Status
          </Typography>
          <TableContainer
            style={{ marginLeft: "-15px", marginTop: "8px", border: "none", backgroundColor: "transparent" }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Job</Typography>
                    <Typography variant="body1">{selectedMenteeData.current_trade}</Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Union/Employer</Typography>
                    <Typography variant="body1">{selectedMenteeData.current_employer}</Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Cohort</Typography>
                    <Typography variant="body1">{selectedMenteeData.cohort}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Current Wage</Typography>
                    <Typography variant="body1">${selectedMenteeData.current_wage}</Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2"> Previous Wage </Typography>
                    <Typography variant="body1">${selectedMenteeData.last_wage}</Typography>
                  </TableCell>
                  <TableCell style={{ border: "none" }}>
                    <Typography variant="subtitle2">Wage Raise</Typography>
                    <Typography variant="body1">{selectedMenteeData.raise < 0 ? '-' : ''}${Math.abs(selectedMenteeData.raise)}</Typography>
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
            <Typography variant="subtitle2" fontWeight="bold" align="left">
              Memo
            </Typography>
            <TextField multiline rows={2} fullWidth variant="standard" margin="dense" />
          </Paper>
        </>
    )}
    </div>
  );
};

export default Details;
