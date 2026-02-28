import { useState, useEffect } from "react";
import type { ILibrary } from "@mytypes/library";
import { Accordion, AccordionSummary, AccordionDetails, Box, Paper, Typography } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import TrendsGraph from "@components/trendsGraph";

export default function Card({ name, building, floor_count, capacity, image, id, fullness, place_id, selected, summary }: ILibrary) {

  const [isClicked, setIsClicked] = useState(false);
  const [trends, setTrends] = useState<Record<string, number>>({});

  if(!image || image.trim().length === 0){
    image = `static/${id}.png`
  }

    // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const apiBaseUrl = "http://localhost:8000"

    useEffect(() => {
        if (!(place_id === selected && selected !== "") && !isClicked) return;
        if (Object.keys(trends).length > 0) return; // already loaded
        const controller = new AbortController();

        fetch(`${apiBaseUrl}/api/libraries/${id}/hourly-trends`, {
            signal: controller.signal
        })
            .then(res => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then(data => setTrends(data ?? {}))
            .catch(err => {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            });

        return () => controller.abort();

    }, [isClicked, place_id, selected, id]);
// max-w-3xl rounded-2xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 m-5
  return (<span>
  <Paper sx={{margin: 3, borderRadius: 4}}>
    <Box sx={{bgcolor: "primary.dark", color: "primary.contrastText", p: 1, borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit"}}>

    <Typography variant="h4">{name}</Typography>
    </Box>
    <Box sx={{display: "flex", flexDirection: {xs:"column", md: "row"}, margin: 2}}>
      <Box className="flex-1 p-6 flex flex-col justify-center space-y-3">
        <Box className="text-gray-600 text-lg space-y-1">
          <Typography>Capacity: <b>{fullness == null ? 0 : fullness}/{capacity}</b></Typography>
          <Typography>Building: {building}</Typography>
          <Typography>Floor Count: {floor_count}</Typography>
        </Box>

      </Box>
      <Box component="img" sx={{borderBottomLeftRadius: 4, borderTopLeftRadius: 4, maxHeight: 150, objectFit: "contain"}}
        className="w-full md:w-80 h-60 md:h-auto object-cover"
        src={image || "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-11/dafoe-library.JPG?itok=77qX113_"}
        alt={name}
      />
    </Box>
    <Box className="p-4">
        <Accordion expanded={place_id === selected && selected !== "" || isClicked} onClick={() => setIsClicked(!isClicked)}  slotProps={{ transition: { unmountOnExit: true } }}>
        <AccordionSummary sx={{backgroundColor: "#c3ecb2"}} expandIcon={<NavigationIcon sx={{transform: "rotate(180deg)"}}/>}>Details</AccordionSummary>
        <AccordionDetails>{summary}</AccordionDetails>
        <AccordionDetails><TrendsGraph avg_data={trends}/></AccordionDetails>
        </Accordion>
    </Box>
    </Paper>
    </span>
  );
}