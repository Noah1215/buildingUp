'use client'
import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid/Grid";
import { sortCard } from "@/app/mentor/jobs/JobDataContext";

const JobList = () => {
    const { sortedJobData, setHighlightedCard } = sortCard() 

    const handleCardClick = (jobId: number) => {
        setHighlightedCard(jobId);
    };

    return (
        <Grid container spacing={{ xs: 1, lg: 6 }} sx={{ mt: { xs: 3, lg: 1 }, pb:"70px" }}>
            {sortedJobData && sortedJobData.map((job) => (
                <Grid item xs={12} lg={4} >
                    <Card key={job.id}
                          onClick ={()=> handleCardClick(job.id)}
                          variant="outlined" sx={{ boxShadow: 3, borderRadius: '10px', cursor: 'pointer' }}>
                        <Grid container alignItems="center" sx={{ textAlign: 'center' }}>
                            <Grid item xs={4} sx={{ pl: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CardMedia
                                    component="img"
                                    alt={`Logo of ${job.company}`}
                                    image={job.logo}
                                    sx={{ maxWidth: '90px', maxHeight: '90px' }}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent sx={{ p: 2, textAlign: 'left' }}>
                                    <Typography fontSize="18px" fontWeight="medium">{job.company}</Typography>
                                    <Typography fontSize="14px">{job.job_title}</Typography>
                                    <Typography fontSize="14px">{job.contract_type}</Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12}>
                                <CardContent sx={{ mt: '-20px' }}>
                                    <Typography fontSize="14px">Posted: {job.posted}</Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default JobList;
