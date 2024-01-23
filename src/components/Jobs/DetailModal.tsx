'use client'
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box/Box";

import { sortCard } from "@/app/mentor/jobs/JobDataContext";
import JobDetails from "./JobDetails";

const DetailModal = () =>{
    const { jobData, highlightedCard, setHighlightedCard  } = sortCard();
    const [isOpen, setIsOpen] = useState(false);

    const selectedJob = jobData?.find((job) => job.id === highlightedCard);
   
    useEffect(() => {
        if (highlightedCard) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [highlightedCard]);

    const handleCloseModal = () => {
        setIsOpen(false);
        setHighlightedCard(0); 
    };

    return (
    <>
    {highlightedCard && highlightedCard === selectedJob?.id && (
        <Modal open={isOpen} onClose={handleCloseModal}>
            <Box
                sx={{
                  position: "absolute" as "absolute",
                  top: { xs: "48%", lg: "50%" },
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  outline: "none",
                  padding: { xs: "1rem", lg: "2rem 6rem" },
                  width: { xs: "340px", lg: "75%" },
                  height: { xs: "500px", lg: "80%" },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  overflowY: "auto",
                }}
            >
                <JobDetails mobileView={false} titleAlign="left" />
            </Box>
        </Modal>
    )}
    </>
    );
};

export default DetailModal;