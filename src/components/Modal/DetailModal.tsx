import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button";

//components
import Tag from "../Button/Tag";

//icon
import CancelIcon from "@mui/icons-material/Cancel";
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

type modalProps = {
  event: eventDetail;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailModal = ({ event, isOpen, setIsOpen }: modalProps) => {
  const { category, title, date, startTime, endTime, address, registered } =
    event;
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
          height: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="semibold" fontSize={19}>
            Event Detail
          </Typography>
          <Box>
            <Button
              sx={{
                backgroundColor: "#024761",
                color: "#FFF",
                transition: "transform 0.3s ease",
                ":hover": {
                  backgroundColor: "#024761",
                  color: "#FFF",
                  cursor: "pointer",
                  transform: "scale(1.1)",
                },
                padding: "0.3rem 1rem",
                fontWeight: "medium",
                fontSize: "14px",
                borderRadius: "9px",
              }}
            >
              Register
            </Button>
            <CancelIcon
              onClick={() => setIsOpen(false)}
              sx={{
                position: "absolute",
                top: "3%",
                left: "95%",
                fontSize: "40px",
                color: "#495057",
                transition: "transform 0.3s ease",
                ":hover": { cursor: "pointer", transform: "scale(1.2)" },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: "4rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "2rem",
            }}
          >
            <Box
              sx={{
                width: "180px",
                height: "180px",
                borderRadius: "90px",
                backgroundColor: "#D9D9D9",
                margin: "auto",
              }}
            />
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "2rem" }}
            >
              <TagIcon sx={{ fontSize: "19px", marginRight: "0.4rem" }} />
              <Typography>Tag:</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "0.4rem" }}>
              <Tag content="#Tag1" />
              <Tag content="#Tag2" />
              <Tag content="#Tag3" />
            </Box>
          </Box>
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "3rem",
              }}
            >
              <div style={{ width: "40%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TitleIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                      border: "1px solid #000",
                      borderRadius: "5px",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>Title:</Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>{title}</Typography>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocationIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>
                    Location:
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>{address}</Typography>
              </div>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "3rem",
              }}
            >
              <div style={{ width: "40%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CategoryIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>
                    Category:
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>
                  {category}
                </Typography>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RegisteredIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>
                    Participants:
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>
                  {registered} people
                </Typography>
              </div>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "3rem",
              }}
            >
              <div style={{ width: "40%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CalendarIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>
                    Start Date:
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>{date}</Typography>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CalendarIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>
                    End Date:
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>{date}</Typography>
              </div>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "3rem",
              }}
            >
              <div style={{ width: "40%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ClockIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>
                    Start Time:
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>
                  {startTime}
                </Typography>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ClockIcon
                    sx={{
                      fontSize: "19px",
                      marginRight: "0.2rem",
                    }}
                  />
                  <Typography sx={{ fontWeight: "light" }}>
                    End Time:
                  </Typography>
                </div>
                <Typography sx={{ fontWeight: "medium" }}>{endTime}</Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
