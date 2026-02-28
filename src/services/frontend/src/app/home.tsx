import { useState, useEffect } from "react";
import Header from "@components/header";
import CardList from "@components/cardList";
import Map from "@components/map";
import type { ILibrary } from "@mytypes/library";
import { Box, Container } from "@mui/material";

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiBaseUrl = "http://localhost:8000"

export default function Home() {
    const [cards, setCards] = useState<ILibrary[]>([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");

    const fetchData = () => {
        fetch(`${apiBaseUrl}/api/locations`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                console.log("results:", data)
                setCards(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    // On load of the page, fetch the data from the backend
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => { clearInterval(interval); };
    }, []);

    const filteredCards = selectedPlaceId ? cards.filter((c) => c.place_id === selectedPlaceId) : cards;

    return (
        <Box sx={{width: "100%", display: "grid", placeItems: "center"}}>
            <Header locname="University of Manitoba" />
            <Container maxWidth="xl">
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", flex: 1, minHeight: 0, p: 2 }} onClick={() => setSelectedPlaceId("")} >
                        <CardList cards={filteredCards} selected={selectedPlaceId} />
                        <Box className="flex h-screen w-full p-5 pr-15" onClick={(e) => e.stopPropagation()} >
                            {/* @ts-ignore */}
                            <Map onMarkerClick={(placeId) => setSelectedPlaceId(placeId)} />
                        </Box>
                </Box>
            </Container>
        </Box>
    );
}