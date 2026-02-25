import { useState } from "react";
import type { ILibrary } from "@mytypes/library";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import TrendsGraph from "./trendsGraph";

export default function Card({ name, building, floor_count, capacity, image, id, fullness, place_id, selected, summary }: ILibrary) {

  const [isClicked, setIsClicked] = useState(false);

  if(!image || image.trim().length === 0){
    image = `static/${id}.png`
  }


const deleteMe: Record<string, number> = {
  "1am": 2,
  "2am": 3,
  "3am": 5,
  "4am": 10,
  "5am": 18,
  "6am": 31,
  "7am": 48,
  "8am": 68,
  "9am": 85,
  "10am": 96,
  "11am": 105,
  "12pm": 110,
  "1pm": 110,
  "2pm": 105,
  "3pm": 96,
  "4pm": 85,
  "5pm": 68,
  "6pm": 48,
  "7pm": 31,
  "8pm": 18,
  "9pm": 10,
  "10pm": 5,
  "11pm": 3,
  "12am": 2
};

  return (
  <div className="max-w-3xl rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 m-5">
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-6 flex flex-col justify-center space-y-3">
        <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
        <div className="text-gray-600 text-lg space-y-1">
          <p>Capacity: <b>{fullness == null ? 0 : fullness}/{capacity}</b></p>
          <p>Building: {building}</p>
          <p>Floor Count: {floor_count}</p>
        </div>

      </div>
      <img
        className="w-full md:w-80 h-60 md:h-auto object-cover md:rounded-tr-2xl md:rounded-bl-2xl"
        src={image || "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-11/dafoe-library.JPG?itok=77qX113_"}
        alt={name}
      />
    </div>
    <div className="p-4">
        <Accordion expanded={place_id === selected && selected !== "" || isClicked} onClick={() => setIsClicked(!isClicked)}  slotProps={{ transition: { unmountOnExit: true } }}>
        <AccordionSummary sx={{backgroundColor: "#c3ecb2"}} expandIcon={<NavigationIcon sx={{transform: "rotate(180deg)"}}/>}>Details</AccordionSummary>
        <AccordionDetails>{summary}</AccordionDetails>
        <AccordionDetails><TrendsGraph avg_data={deleteMe}/></AccordionDetails>
        </Accordion>
    </div>
    </div>
  );
}