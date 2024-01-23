'use client'
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider"

import { sortCard } from "@/app/mentor/jobs/JobDataContext"

type JobDetailsProps = {
    mobileView?: boolean;
    titleAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
};

const JobDetails = ({
    mobileView = true,
    titleAlign = 'center',
}: JobDetailsProps) => {
    const { jobData, highlightedCard, setHighlightedCard } = sortCard();
    const selectedJob = jobData?.find((job) => job.id === highlightedCard);
    
    const handleApplyClick = () => {
        if (selectedJob?.link) {
            window.open(selectedJob.link, '_blank');
        }
    };

    const handleBackClick = () => {
        setHighlightedCard(0);  
    };

    return (
        <div style={{ paddingBottom: "70px" }}>
            {highlightedCard && highlightedCard === selectedJob?.id && (
                <>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: mobileView? "none": "15px" }}>
                    {mobileView && (
                        <Grid item>
                            <Button 
                                variant="text" 
                                sx={{ color: "#024761", backgroundColor: "transparent" }}
                                onClick={handleBackClick} 
                                >BACK</Button>
                        </Grid>
                    )}
                    <Grid item xs>
                        <Typography variant="h6" fontWeight="bold" align={titleAlign}>Job Detail</Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Direct to official site">
                            <Button 
                                variant="text" 
                                style={{ color: mobileView? "#024761": "white", backgroundColor: mobileView? "transparent": "#024761" }}
                                onClick={handleApplyClick}>APPLY</Button>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" spacing={1} sx={{mb:-1}}>
                    <Grid item>
                        <CardMedia
                            component="img"
                            image={selectedJob?.logo}
                            alt={`${selectedJob?.company} Logo`}
                            sx={{ width: 50, height: 50 }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">{selectedJob?.company}</Typography>
                    </Grid>
                </Grid>
                
                <TableContainer sx={{ border: "none", mt:"10px"}}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ padding: 1, border: "none"}}>
                                    <Typography sx={{ fontSize:12, color: "#6C757D"}}> Job title:</Typography>
                                    <Typography sx={{ fontSize:14, mb:-1 }}> {selectedJob?.job_title} </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ padding: 1, border: "none"}}>
                                    <Typography sx={{ fontSize:12, color: "#6C757D"}}> Salary:</Typography>
                                    <Typography sx={{ fontSize:14, mb:-1 }}> ${selectedJob?.salary.toLocaleString()} </Typography>
                                </TableCell>
                                <TableCell sx={{ padding: 1, border: "none"}}>
                                    <Typography sx={{ fontSize:12, color: "#6C757D"}}> Work Type:</Typography>
                                    <Typography sx={{ fontSize:14, mb:-1 }}> {selectedJob?.work_type} </Typography>
                                </TableCell>
                                <TableCell sx={{ padding: 1, border: "none"}}>
                                    <Typography sx={{ fontSize:12, color: "#6C757D"}}> Contract Type:</Typography>
                                    <Typography sx={{ fontSize:14, mb:-1 }}> {selectedJob?.contract_type} </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ padding: 1, border: "none" }} colSpan={2}>
                                    <Typography sx={{ fontSize: 12, color: "#6C757D" }}> Location:</Typography>
                                    <Typography sx={{ fontSize: 14 }}> {selectedJob?.location} </Typography>
                                </TableCell>
                                <TableCell sx={{ padding: 1, border: "none" }}>
                                    <Typography sx={{ fontSize: 12, color: "#6C757D" }}> Posted Date:</Typography>
                                    <Typography sx={{ fontSize: 14 }}> {selectedJob?.posted} </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Typography variant="subtitle1" fontWeight="bold" align="left" color="#0263E0" sx={{  }}>
                  Details
                </Typography>
                <Divider />
                
                <Typography sx={{ fontSize: 12, align:"left", color:"#6C757D", mt:"8px", mb:"0.5em" }}> Description: </Typography>
                <Typography sx={{ fontSize: 14, }} > {selectedJob?.description} </Typography>

                <Typography sx={{ fontSize: 12, align:"left", color:"#6C757D", mt:"8px", mb:"0.5em" }}> Responsibilities: </Typography>
                <Typography sx={{ fontSize: 14, }} > {selectedJob?.responsibilities} </Typography>

                <Typography sx={{ fontSize: 12, align:"left", color:"#6C757D", mt:"8px", mb:"0.5em" }}> Requirements: </Typography>
                <Typography sx={{ fontSize: 14, }} > {selectedJob?.requirements} </Typography>

                </> 
            )}
        </div>
    );
};

export default JobDetails;
