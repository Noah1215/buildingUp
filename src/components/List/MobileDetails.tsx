'use client'
import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

import { filterCard } from "@/app/mentor/mentee/MenteeDataContext";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const MobileDetails = () => {
  const { menteeData, setMenteeData, highlightedCard, setHighlightedCard, setShowMobileDetails } = filterCard();
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    const selectedMentee = menteeData?.find(mentee => mentee.username === highlightedCard);
    if (selectedMentee) {
      setEditNotes(selectedMentee.notes || "");
    }
  }, [menteeData, highlightedCard]);

  if (!menteeData) {
    return <div>No mentee data available.</div>;
  }
  const selectedMenteeData = menteeData.find((mentee) => mentee.username === highlightedCard);

  if (!selectedMenteeData) {
    return <div>Select a mentee</div>;
  }

  let [firstName, middleName, lastName] = selectedMenteeData.name.split(" ");
  if (!lastName) {
    lastName = middleName;
    middleName = '';
  }

  const handleBackClick = () => {
    setHighlightedCard("");  
    setShowMobileDetails(false);  
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditNotes(event.target.value);
  };

  const saveNotes = async () => {
    const menteeId = selectedMenteeData.username;
    const { error } = await supabase.from('mentees').update({ notes: editNotes }).eq('username', menteeId);
    if (error) {
      console.error('Error updating data:', error.message);
    }
    const updatedData = menteeData.map(mentee => mentee.username === selectedMenteeData.username ? { ...mentee, notes: editNotes } : mentee);
    setMenteeData(updatedData);
  };
  const imageUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFhYZGBgaHBwcGhoaGBgYHBghGhwaGhoaGh4cIS8lHB4rHxwYJjgmLC8xNTU1HCQ7QDszPy40NTEBDAwMEA8QHxISHjQrJSs0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAQMAwgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAgMHAQj/xAA/EAACAQIEAwUFBQYFBQEAAAABAhEAAwQSITEFQVEGImFxgRMykaGxB0JSwfAUI2JygtEVM5Lh8SRDorLiFv/EABgBAAMBAQAAAAAAAAAAAAAAAAACAwEE/8QAJREAAgICAgICAgMBAAAAAAAAAAECESExAxJBUTJxYZEiwfET/9oADAMBAAIRAxEAPwDs1FFFABRRRQAUUUUAeUVhduBRJMCqzxLjbMcqNkHUQz/2X1pJSUdjRi5aHWN4iqabk7dP9/IUoxPF2iZI9fZrPmQSfj6VVuL8ZFpZtq11zpn7oCb7loznyDCqhxTtTeiD7+s5ic22wgaDfSOQ051PtKWiqjGOy4cX4u9zQuXGvNrdpf5tcz+pPlVbxvEVVu/eUEe6LYECfw6GR4yKp1y7ib50W4455c2nrpA1rZhuzl0wxOUdWI7vP3jp46x58qOntmqXpFnOKs+9cZgp+8YV2noCSx9BWeG7UYdHi2u0jNcUhVjkMu3n486rycJRTmZ0dh0uK7GOkGPQmi8bA962QY2ACz6ZwOvKhRRjbOocI7bqQGJAmQEYgHSNZJ26E71arPaSwwXXUjYQfnXztg7xzgW2VATqNQCeU5iQTy0JGtO8JxnT3pI3AfKeXU7fCtfaOjEoyO74fjVljGaCdpgUyVga47w3iisO8xAIIyOdZOxjWP141YMHxW/b1RvaDTKhiWjdd/eiTHh61i5X5B8Xo6HXtKeFcat3hp3W5qwIIPQg7GmtWTT0Saa2e0UUVpgUUUUAFFFFABRRRQAUUUUAeVXO1Pa2xgVlzmuH3bakZj4sT7q+J9AaVdu+2hwo9lh1V75EsW9y0p2ZtpJ5LPj58MxGOv3sTn1v3nYd5lGrHkq+6APHkOQpW/QyXsv3G+P4i+guYlxbVwClm2/3W92dJkyN58huEicYu5PZ4dCq666EDqSz6dDO9eYjDpYg4i4GcGXkk+0JmUX8CCIzbnXQCo3EcUijvQW5KBlRQZ+4AFMfxDXc7VKrLaGGHtO65rtxnA0hGY9PvDSN41AmtDYWyhJCQfxF7ebodCGJPr1pXw3EXb7QGPd96XfQDoqQegiY1qwWeF32XuG3bG0t3n281A25k/lWPDps1ZWELb/Erid22hHiS66bjRCPPYUqxmNuue+uf+Z3gddC5qyngCj/ADcRM+8pZQpPPQLA28d6U4vguGnS4QOWUqQPQgn6amti0K4sr7W3P3UHgJP/ALaV4HuKNNBzAgjkJgkgVNxGEsrKqytru7sGPTZQI9ag4m9l0yL494nw9POqp2TaokNbYLbeIBZSQOo21j5VtsYrNmXKVIMSNdDI2iOnnNT0ur7K4hjuImSde8kyT5lj8qg4exaUozapaRXuLsXdyWS2PMZAY2hqy7DQ7bC37T94lpCHYmVZcwzFjI0Iif8AmxcJ4krSlxdoggmZEmVbrAkeXpVI/wD0N2/dzNGuoUAQAOp3HnIHhGlWvh1v2inLlLj7pPvA7DMuzTMGYPgYqU41stCV6La7M6I+YM65QbyjKzRsSRsdQecTzE1bezvGPbDI/duqBmWImfvAchMiPDciKoXAbwGcQY/7iEgMCJBjQajXaNxpE0xwmJ9lcW4WBa2QrsD/AJlpzo5HUGD4EN6LCTTCcU0dLorBGBEjUGs66jmCiiigAooooAKKKKAPKKKr/bTiTWMK7JOYkKIMEZp1FY8I1KzjP2iYlTjHCtnJYwqCRmkrrHvGR+XKp+C4OcOivcVhfdf8tPeUHbvDZjttp3uleYDsuiF8RiGgBpBg6a7ifeM/kAG1A3Yji1l2yZTlyQXdyHygaL/DMawQNOehqLl4RdRIFy5mzXnABmAoWVDHchzq7DwgToCIJCrDYL2pZ2fKASbjsdVXT0AnYa9YNTbN25cYuFCW1AVBlC+9HuidNOpnzkVXuJqxlDcEblQugjxHTaOtEV4CT8jFu0VuwGXCpCmB7RySzkT3oOijx35VF/x2++puZfBYHr+L4mk3sPM+c/L9RW9rYCxpPPcn4Cn6xE7SJlziQG5J82P996g3uIydI+EfOZqA48/CtlrD5iBI16kA/PetUUhXNsk/tYcZWJB5GZ9DUXNlbXcdeVY38OV3rVNMkK2xnhLpJy7z8+c/nRxO9mYgbe82wknn8DHpUO1dKggbnc+HQVkrCdTz/XifpWVk28DPB2SpWBJgmOg1JE667CfOmHAseVuArC5txrAJ1ZZM90n5xpzqvYjFEkhSQsR0zDxrPh11g2mh+R8DRKNo2MqZ2JIfJeU5HGUOTBzrsA45xybll5iRWviGe3cCEE5gwUmDmVhGQGdQZI8DB2Bpb2e4gCgLcoDTtEAS3hHPXbXarDjcMblp0k5klrZEZwRIMH1HTYA+PK8M6fyXPs/xAOqifuj10An46HxFPK5bwXtEqo13TOihrqqIGkl7gH4SuZo5E8jXT7bggEbESPWujjlao5+SNOzZRRRVCYUUUUAFFFFAHlVDtUhfEWFIYqssR90TAzHTfl61b6U8avBQCxAWDJneeXgNKSWho7KV2nsrdAVmy27ZIgkd4gzlUkgaHSeXhVOunD4c5nDHKDqQQTzJVTBOkCWgaCJpt2n4i9tC1uAzTlcRmUchH3Z8tNjVEs4hMrG+WuuSGT3Cuo1zTrr/AC8qkot5L9qwThxC9iSwT93aUGLaBi2WJ3jWZ1bXck76wDZHeJgAaKu5Yx1P3VAmfDlyj3ePue5ORIIKqAAZ0IIEAjz84O1QMRxFmERAMeMDp6nWnUWJ2ROfFTOQa/iOpPkOVR7jHZgR5gqPyFQVusfvR5T+VNsKhyz3mbkqgD/UzSFFNVC3ZCTCBjOv/j+bCpDBUBAIb+pT8lU0YlhHeIB2AU5o82O/9M+lLbjgkRv1NasmPB7iomOfPXY9KjNQa8phWE0UURQYZM01tw7wQdorOxhWbQfryrY2EZQTsVMny6jqKy0Mky+dmnDAFWhm10IAnWSDy7wkjlvVrw+jpBhl1XTJ3TCPbIEae6AeRKHUCa5p2bxhtuB9xzBE+4x2ZT4Fa6giZwCQA41VhsZOXNA5EsVbpKtz05pxpnTB2hUcILeOLrHsrxyusRlZ11WOYbXTpJ3Wum9mMwsC2c37tigLGSyr7pn+UgeYNcr4nxL2V9BeE2rygZjujAjQkRH3SDO+o2rq3Z55t+9nGhDdZEa9TpvT8d3ZPkqhxRRRVyAUUUUAFFFFAHlU3treBtv0SNJOsCT6ajzirlVN7UWCb6mBlVMzatmI1Gw5SB+t0noaOzkb4rOCYyIc3eYnTNJJOfYSdOmsTVbxdjL7m8ancNrEidKtvF7aI7soDEkxm7wQ82APdmeo5DSABVZx18vqx722hkkeJ2Hp4aUkX6KyjjImBYmpQwjfzek1JtYDMJkKOpmT4ADc1PfBKg1dpMDKSB6s33f5d+sU7l6FjB+RMbHWB61JwqEmA0+oitn7mMsrPMwTPlW/DYXMdJCCJMb+QFY5DKGcGH+HFiSd/SfWTPyqPe4eAx1Ez+IflVuNhBakBh45dhGvz6xSW9bQsIQny0B0A9daRSY8uNJFdvWTmIUT5Vpa2Rpz6Cru/CjkUAQzGFjZdonqdyf0aq+IwuS4ARu3yNUUkyUoNZDD4LuhzGpiPDc/CDU7gfCDdcqusAmD96CoUTyMmf6Y51JtJkItkSWykxuANQq+JJHw8avvYTguQuXHf0J3gH7o8QI+NI5sooJFbXs3lUHnzGzA8/n/AH1B0h4rhxUyQQRvpMjr+uVdXv8ADQ6lgO8CdOonbzqtcT4ecpEE5dRrBjfQ9Pz61O2PSKTZ4cA/dgKSCo3AYHVf5ST/AOQ8a6Dwq6UyBxKn3SY0zA7n4g+nOqthcOuYKeuk+YUjzgjTz8Ke2HY2wZBAGRgZ0I1XUdXVRPRprJOwSo2cbw6sGtuAQpZkJVWzADVWnaQZkRHpqy7IcSWw6IWJt+7mAJyzsr6TAMQ3SJ6lHxjiZCq6GWUw3LMAd/AxLT4HlNReCuj3c6EJmibYgBueaABHpHzimhexJ1o7kDXtR8GoFtQuwUR8KkV0nMFFFFABRRRQB5Vc7W2RkVtea6b8mH/qfjVjqNjsOHRlPMGPOlkrRsXTPnbinGHLMlwSdRIAExOsbTSW3bDjMjc4MZtJ1Ghk9fhV37XcBQOsb6CBuGOg+Mgf0jnSTsXwxbrOjrKMIIOu5B9IOvnU00kWy2R8Hw5CMz3EHOQQGnxMyPIVFx+JsgZLYDk7vlXX1iT8Yq1cU7CsGGW6wQe6GJbT+GfpNa07O2bXvvJ8wGJ8gJPxpeyWWVSbwiq8KwRd4VAD5beNXa1gbVpEmM0iSdeU6/WBp8ZqJcwIKqVttlGqssg+MGIH6mtq8MumO9dVAJ77hQPEZZcn/TSSfYrFKJC4rhWYd13hzItqsZjyOstzO/pWzgnAy2ZnG3dHOCTEAnnrvTfC2VWVSWdpDPBEaagT94+MnqermwiWkCllAUSzHQD1PM61ifgyXsj38BlQMAMqqcvV3ylc0/gAmueYjBM+JJGozE/mAP6QKs/HO1Ac5LRDuy5UCDuos8z95iOnhJFLOB4Ny8E6Lq5GoUbk/H6Uy/jkTZOwXCgjpdbWGESZ+4xmesqsdBNdC7N4aM3ioPxLQPhVft4UO9pFByD590sY6qBAnmSBVzwYCl48FHoB+ZrI5ZksKjK2mhPU/mf160l4thwcy9Dp5EAx86fEQo8qUuwKs/Vu74wAojzyz607FiznnEEVXaTqACQNNV91geRjunzNbFx5U5WIyXU3A2dtiOgzkKPAmo/aZWt4tGE5WRxpqJUFj8O7FK8a6lUVR1C8wuViYbpCTJ6IaTqO3g19pMSxRSp74ZCYMEAC6u28Tp4EVP7NWmuKb3tSuRhLMshgAJBy6mCd9p32qG/BfblGygiMmv48xYgyZ1zT610rsLwVcoVkIVBM6qJJ92P116VVaSRGTy2y98NBFpJMnKDPnrUusEUAADYaVnViAUUUUAFFFFABRRRQBQ+22CRzI3Uh9J0ZTm16g5RVZ+z3BSXYDZ2nw8KuHavCHOHEEDUqRO4In61D7D8NNsXzAys+dIM6Ed4eBDaeUHnUHll1iKY9a2IgiaR8XsWU7xyox9J9V1pvxPFrbUk9CfAeJPKuSce7Q3XumAI2UKCzeQ0+MVjRSL8lkfh2Y50lSegBB8TpIPjvWt+E3RuXfXYB/UaCTVSXiuNA7iOh5sFJ0PQRA86Y4TtXjU969lA6qjA9fE/rxAXqN3Mjxf2blHV7eUxAUFjPyA0/5rPiPHw6BFQQNR7RkgHqUBJY+fyp3gO0trElUxNm1cPJygE+ABnXXYGrVgeBcOJATDWZP8A8+fhFaooyUmcs4Zw29cYsogOe88AseuUDbppy51c+E8OtWkywWO5WcxJHNo0+Ogq5X+ztgqQq5J/CSB8JioowaWVhIAGkZUy6cyBuaHFmKSZq4XgMga7cgOwgSfdXf/c+Q6VJwCnJnbTNLAc9dpHWKU8R45bt964+aD7g56mJ/h0JMfPUVWsV9o91s4W0hUCRDlTuRrIP0rUkErLtxEu2ikBee8nw8B1pS/EUByZhnjbbT+EVzjG9urt3QZkPLJDE6ch/tSg4+67aKztzmQ0nm0xAocWYmjonGuFe3QhdH3RidATyPgeYpO3ZjEBAVRSkBsweDoiqJUr1BP8AVT3stxEOqrcMuABPPUayOniYmrubK5I02AXzOij4kURRknRynhN03Wt20QoksbhfL3skIYjYc9STpXW+zRUWyirCqdCTJaRqSetUDs5whvaTrALqGaBuxBJ6EmdPSum8NsZbYERzI8+vjTw2JP45JtFFFVIhRRRQAUUUUAFFFFACrjYULmImYU+IOsfKlPAbAQXCpOrzr5BY8NAvwp5xW3mtnSY1+H+00u4IgIcxE6EdOVTkslo/AX8VwCXD3wSOk7Ul4iuHw6F2RFVeZUHXkAOZPIVZr1wbtAEZiTsoiTPgNaqGJ4Zcv5cQxyhjNpDobaHZtdrrLqSRKhso5kzaKxfgT4ntfiCSLVqABMOYaPxFEUlRAPvRtS65xvGkZ3soUMTIyxJjUMvzMedX7CcHtfs12xbyo1wGWOuZiNC5Op8R0qrnspiHdx7J0d4VnYrkQAKsh5lkhZy9TVYxTRGfJJSpEHAfszNluWjZuHWBKzzLKJKsNtUOnQVeeDYaGVleVBJnmc36+Q6Vn2i4Vh7iKp7zDKCQGmVEBwV1VhpDDXzpJ2cxD2bjWbjd5AGBbuZ0aSr5T7pIDAj8St1FTaSZZNuJ0RX0qq8dsOLwZdVjvA7dDHQ6z6U8wPEbVwQjh4mcnfCxuCRsfCkHGuLWnb2aXELjdZgrJgZgdRqefSiStCRwyk8ZwNod687EaSoJEkwACV1YnkqiT5TSN+GXQ0CyllCucC7qcs5Q7gvCgmYkmav/AATAW3vDEMrMgZlsSsrAOVr0jQs5BI6LlHWZ/angbXLgv2YeUVGXMisuViVdc4ynQnQ9B1poRXkzlk0rRQMCuIQuFCqtvK0DDI6hWmHbI+ZVMHUZttac4LjZEG9aRk5XrEui+LKZZR1ILDrFWLsxwdsNne4VQlFS3bz5yqrJl22JJjTlHjAXrwxDfD2Tk3L5AMjGeY6760TpPBnE5NZG1jDIYdQpzCQw1DA8xyOlWDCWyQs6wCfLTKPrPpVcw2G/Z7gRf8u7mZBsLbr3nReiusuF5FH5EAWzhye8TsAo+EsfqPhSpZGk8CXD2WFxBAjPJ8Tmkk/OrdVe4NhWZzeZgVzMVA8yBPpVgqsFgnytWkjKiiimJhRRRQAUUUUAFFFFAHhpUUZbrQBDKcq7AlQI15bU1rXcSYPMGfypWrNTo5ZiuL457bWMZgmtZ2CPcQOUCXHyvDLmUDKxWSw3q7vbDDw+lbuMYRbqPaecroyGNwGBEjxG48RSvgGPLq1u5AxFqFurtP4bqdUcd4HxI3BqbRaLNWJ4WCZG/UEg7+FZiwyxBPynl/anBtTWH7KSawp2IFtXmSx0qucZwofHWy0wcPeDDkyh7YUN4S7Grq9pUUsxAAEkkwABqSSdhVV4VOIvXMVqLbBbdiRGZEYsXjo7kkdVVTzoFu2PeFcJtIkIiqNyFkST1g1XuLdn7Cu727apcKNDrIfMRvm31Ejyq62BpSbiKd+RyrXoFTYo7Ld7A4YcvYpH+lRFMgjTufif1yFKeEYkYS7+zXYWzdYthrh90M5zPh2PJsxJTqCRuKt4w1BqlWBE3Ds2kGNDqSQI2Imp2GwQX8z1qf8As9Y3WCgkkAAEkkwABuSTsKyjHKysdq8K7rZto5tu14ZLgDEplS4zHusD7oYbjepvZPstcwy3mfFXMQ94AEtIUb6gFiZ7287CsOG3DiLv7Tr7JVKWJkZ85Be9B+6cqqhjYMdmFXDDe6KeK8E5vyYYLDLbUKuwqRRRVCV2e0UUUAFFFFABRRRQAUUUUAFFFFAC3EmkvFOELdKurNbvW/8ALupGdZ3Ug6Oh5odD4HWmuKMMawVqk9lo6E6Y/H2tLmGTED8eHdUYjq1u6RB/lZqz/wAfxDaJw7Ek/wAbYe2vq3tD9KfIayDVgFavcJxGJ1xrqtoa/s1osUaDI9s5g3BoO6AF6zTJGGw28PCpuNeEaN4qHhrERWPI8VSGGH2NKscvemnNhNDS/FWt616Mi8kIWLV9WtXFVlYQysJB/RqMnBMZY0wuKDJytYpWuBfBbikOBH4s1b2tZHQjeYp5bfSsiwkiv+04qdPZYJf4va32HouQfCRWl+AXLpDYy97YAyLSJ7OxI2LJJa4f52I02q1M1RL7UzFRpRdqcWdqVKaZ4Yys9aaIkjfRRRTiBRRRQAUUUUAFFFFABRRRQAUUVgzgCSYHU0ALOJrDA9R9P0KiW3rzivGrJ7kyZGvIVoV+dSlstDQyR6zzVGR60s+smksaiW7A6VAe26mUaV/CeXka3I/jUgEHSt2NowtcTAXXQ86gYrGlzCaAbmpeJsIdNKAiIsyAPQUZBJbSI2Fshe8ZLHmST6eFThdg0uxHErI3dR/UPnUexxa07ZEYOR+HvR5xtQa4t7Q8TEg7VpuPWOHsxqRFYXX18qEI6NrvFObKwoHhSBbm7/gE67af70x4XxVLoHJun9qpElIZ0UUU4gUUUUAFFFFABRRRQAV4TWjFYlUXMxgfM+VQLF83O+2iD3V6+J60AT72JVVzH/mqjxnijNMmFHLlUviGLLtE6VUeNWbmIb2VslU++45/wilbHjGxJxLjOZ8lsF3OgC61d+CYXEphka+QW5gTKj7uY8yOtYdnOzlvDgEL3uZO5qyYlpQipuVlFGiFhrnwqYyBhrsaQjEZDB936f7Uyw94nYzS2PQu4jwaTmtu6HmFdgD6TE+lI/2XEAx+0OD45fHwq7BSa0X8Dn3FFlYcvXDK/bwWJAlsTl6Tl/vUbFcKd9XxLOOmcAD/AE60+bhSjXLNbU4Yv4YrbKf9kv8ACmJ2fR2jLm8d/wDyOtXThOCS0mVVA9Kl2sCFr26coJ3oJcnK5YMrt2BSvE4nKCT6Dr0rHEYsKdTShnZ2lttwP1zoRGhvhgzpcEwWQgHpNJOC4ttj3XQwR4inWAaEY0pv2ctzONm0bz5Gti8mSiXfh3EM667j51Os3lYd0z16jzqpYG+VIqTxC61si+n9YGxqqIstVFQOFcSS+gZTrzHSp9aYFFFFABULiGPW0pZj5Co2N4uqJm20nXQ/7VyrtB2ifE3PZIZBMEjn4eVbFWY3RbcFjGxl4kn92p9D4Cn/ABC+FXKKhcCwgsWgukx3j41oxt2WrG7Y0URrjk7bnQUxwOBCgVVzxYLj7OHJHeRmPmfdHyNXpFipSyyqVI0usCtTNoRUq4KhOaRjIVYhAZBEiouHvtZYBpa2djqSh6MeQ8aZXE51odQZBEg7jrQUHOHxCkA+Xz6/Kp6MCNKpQz2SuTMyD7s6rqNPEb6U1w3HUOmYDz06GNa1NCOLLCRRlFLv8RQgd4T5j1+lav8AEk/EP1v86bshaJ73ABr+ppRjcWBPeiPnUXG8aSCFbMei6/Sl1tHc5mOg2HTz6mlbsZIyEucxBnkDyHiOtZKmvjUpLfzrxU1oA2oYQjyrYbAdCKj3jsPGmGHOlAC20xGh3FNsO4ZCp1BEUrxQyufHWpOFuwaqsohLDK1hOKNg8UbZMKTpO2u3oa6fgsYtxQQdTyrln2i4SUS8BqphiOh2PxqT2I457S3kc95dD1jkwqjVqyadSo6nRVV/ZbvLE3Y5arty+7RSjHNu13aouxtodNmI+gph2G4Fl/6i4NT7gPIfiqtdkOBHEPncfu0Mn+Mjl5V1K3AgDQCqSdKkJFW7ZOd4Wldxql4h9KgXX0qSKnJ+0XFWXiLXVOttlC/0gSPma7nwLiiYmwl1DIYajoeYPka+c+Lvmv3W6u31irL9n/as4S5kc/uXPe/gP4h4daWSOhLtGjulw0vuDWpIvq6hlIIIkEazNa8lTYqwaMulY3bE1m3drNHFZQ1iy7bqM+CDbgN5gGnToDUVrccqKGTFJ4cv4APSsjwteSD4Cm6NXjvRQrYsTBZeQHgNKlpY0/KtqISdqkhAK0yyN7PSsTW64awVZoMsjskkUytqAJOwEn0rWtuuefaD2yAVsLh212uOPmin6mtSs1KzfwvtB+04+8FPcCAJ45W1PqTVrR9a5N9nh/6wfyP9Vrqj1WK8EuTdm3iFhbttrbbMpFcmw+IuYTE6e8jQRyYdPUV1kPVL7e8IJAxKDUCLkdOTVSDrBCavJZrPanDFQc8SAY6SKK5Bnryn6RJ92dqweFS2ioghVEAVJQ1qDV6DUyxldeol4aVIY1GxDgb7VhpwzFt+9f8Anf8A9jWIrfxVR7e7AgZ306amo4pTpgy8dh+2ZwxFq8SbROh3yf8AzXZsNdR0DowZSJBBkGvmKn/ZztZiMIf3bZknW2xJU+X4T5Urj6HklL7O+3LU1DNsqfCq9wX7ScJeAW4TZf8Aj9z/AFDT41bLF9HGZHV1PNSG+lJQlSWzWo0rRfBph7KKwa1RRlikP4VkpB5VPbCE1kmEIrKDsjTbEVrxDwKlvbMUuxV23b7124iAc2YD61tAsmWHslteVSWVUBLEBRuToKqHFvtIwtoFbIN5/Dup/qO/pXNu0Pa3EYskO+VOSJovr1rUhlF+S2dte3gYNZwzaahrg+YT+9c1OtFeMadKjZUkWn7Oj/1R/kb6rXUXrl32dITiWbkE19SI+ldRuCtWznmCtWboGUqwkEQQeYrSh1rPNTEym3uxa5jDECTA6CdKKuGte03ZmdUZg16GrxWDAMCCDqCNQZrxhWGnhaozIWcDkNT+Qre2gNGHSB8zTJGNnJO2eGyYy6OTQ4/qGvzBpHVx+0uxGItv+JIP9J/+qp1Tls6oZigooorB7Pa34XG3LZm27of4WK/So9E1lGqVFmwvbvHpoL5YdHCt84mmNv7T8cN/Zt5oR9DVImiikDf0Xs/anjY921/pP96j3vtLx7bMi/yp/cmqbRNFIP1+h7i+2WPue9iHjosL9BSW9fdzLszHqxJ+tYTWOaigv8ntFE0RWmX6PCa8isqKBWi4/Zsn7y6Y+6o+ZrpDnSqh9n+FCYfORq7t8F7o+hq3usj9f8U1EJvJjbFZqk1midaqvantlbsqyWmD3dpGqp4nqfCseXSFVJZLRK9aK4oe0WMOvt7nwFFHVhaLf9l2NuMLltmJRfdH4fKr70oop/JhqvbetbUoopkKyh/ah/2P5n+grn9FFJLZ1cfxCiiikGPK9oooAxagUUUChQKKKBj2vaKKAQUUUUGhRRRQYdf7LIP2HD6cvrNPk3FFFO/6Od7f2VL7R8bct2EFtiocw0bka6TuPSuZYf3h5jfX617RTR0SnsM560UUUAf/2Q=="
  
  return (
    <div style={{paddingBottom:"70px"}}>
      {highlightedCard && highlightedCard === selectedMenteeData.username && (
        <>
          <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: "10px" }}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedMenteeData.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Send a message">
                    <ChatOutlinedIcon />
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="text" onClick={handleBackClick} style={{ color: '#024761', backgroundColor: "transparent" }} >
                Back
              </Button>
            </Grid>
          </Grid>

          <Avatar src={imageUrl} alt="Mentee Avatar" sx = {{width:160, height:160,margin: "20px auto"}}   />
          <TableContainer
            style={{ marginLeft: "-15px", marginTop: "8px", border: "none", backgroundColor: "transparent" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>First Name</Typography>
                    <Typography sx={{ fontSize: 16 }}>{firstName}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Middle Name</Typography>
                    <Typography sx={{ fontSize: 16 }}>{middleName ? middleName : '\u00A0'}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Last Name</Typography>
                    <Typography sx={{ fontSize: 16 }}>{lastName}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Phone Number</Typography>
                    <Typography sx={{ fontSize: 16 }}>{selectedMenteeData.phone}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Email</Typography>
                    <Typography sx={{ fontSize: 16 }}>{selectedMenteeData.email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Job</Typography>
                    <Typography sx={{ fontSize: 16 }}>{selectedMenteeData.current_trade}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Union/Employer</Typography>
                    <Typography sx={{ fontSize: 16 }}>{selectedMenteeData.current_employer}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Cohort</Typography>
                    <Typography sx={{ fontSize: 16 }}>{selectedMenteeData.cohort}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Current Wage</Typography>
                    <Typography sx={{ fontSize: 16 }}>${selectedMenteeData.current_wage}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Previous Wage</Typography>
                    <Typography sx={{ fontSize: 16 }}>${selectedMenteeData.last_wage}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ padding: 1, borderBottom: '1px solid black' }}>
                    <Typography sx={{ fontSize: 14, color: '#6C757D' }}>Wage Raise</Typography>
                    <Typography sx={{ fontSize: 16 }}>{selectedMenteeData.raise < 0 ? '-' : ''}${Math.abs(selectedMenteeData.raise)}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Notes */}
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper elevation={0} style={{ marginLeft:"-15px",marginTop: "10px", padding: "10px", borderRadius: "10px", backgroundColor: "#EBF4FF" }}>
                <Typography variant="subtitle2" fontWeight="bold" align="left">
                  Memo
                </Typography>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  variant="standard"
                  margin="dense"
                  value={editNotes}
                  onChange={handleNotesChange}
                />
              </Paper>
            </Grid>
            <Grid item container justifyContent="flex-end">
              <Button variant="contained" style={{ backgroundColor: '#024761' }} onClick={saveNotes}>
                Save
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      
    </div>
  );
};

export default MobileDetails;
