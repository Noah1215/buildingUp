import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography/Typography";
import SvgIcon from "@mui/material/SvgIcon";

//components
import Tag from "../Button/Tag";

//icon
import TagIcon from "@mui/icons-material/CommentBankOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import ClockIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import RegisteredIcon from "@mui/icons-material/AccountBoxOutlined";
import CategoryIcon from "@mui/icons-material/LayersOutlined";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";

//type
import { eventDetail } from "../Card/EventCard";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";

type modalContentArr = {
  firstTitle: string;
  firstContent: string;
  secondTitle: string;
  secondContent: string;
  FirstIcon: typeof SvgIcon;
  SecondIcon: typeof SvgIcon;
};

type modalProps = {
  event: eventDetail;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailModal = ({ event, isOpen, setIsOpen }: modalProps) => {
  const { category, title, date, startTime, endTime, address, registered } =
    event;

  // modal content array
  const modalContents: modalContentArr[] = [
    {
      firstTitle: "Title:",
      firstContent: title,
      secondTitle: "Location:",
      secondContent: address,
      FirstIcon: TitleIcon,
      SecondIcon: LocationIcon,
    },
    {
      firstTitle: "Category:",
      firstContent: category,
      secondTitle: "Participants:",
      secondContent: `${registered} people`,
      FirstIcon: CategoryIcon,
      SecondIcon: RegisteredIcon,
    },
    {
      firstTitle: "Start Date:",
      firstContent: date,
      secondTitle: "End Date:",
      secondContent: date,
      FirstIcon: CalendarIcon,
      SecondIcon: CalendarIcon,
    },
    {
      firstTitle: "Start Time:",
      firstContent: startTime,
      secondTitle: "End Time:",
      secondContent: endTime,
      FirstIcon: ClockIcon,
      SecondIcon: ClockIcon,
    },
  ];

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          outline: "none",
          padding: "3rem 6rem",
          width: "75%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
        }}
      >
        <ModalHeader
          title={title}
          buttonContent="Register"
          setIsOpen={setIsOpen}
        />

        <Box sx={{ width: "100%", display: "flex", gap: "4rem" }}>
          {/* Left Box including Image and Tag */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "2rem",
            }}
          >
            <Box
              sx={{
                width: "120px",
                height: "120px",
                borderRadius: "60px",
                backgroundColor: "#D9D9D9",
                margin: "auto",
              }}
            />
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
            >
              <TagIcon sx={{ fontSize: "19px", marginRight: "0.4rem" }} />
              <Typography sx={{ fontWeight: "light" }}>Tag:</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "0.4rem" }}>
              <Tag content="#Tag1" />
              <Tag content="#Tag2" />
              <Tag content="#Tag3" />
            </Box>
          </Box>

          {/* Right Box including contents */}
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {modalContents.map((content, index) => (
              <ModalContent
                key={index}
                firstTitle={content.firstTitle}
                firstContent={content.firstContent}
                secondTitle={content.secondTitle}
                secondContent={content.secondContent}
                FirstIcon={content.FirstIcon}
                SecondIcon={content.SecondIcon}
              />
            ))}
          </Box>
        </Box>

        {/*Description  */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <DescriptionIcon sx={{ fontSize: "19px" }} />
            <Typography>Description:</Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "160px",
              backgroundColor: "#EBF4FF",
              borderRadius: "8px",
              marginTop: "1rem",
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
