import { useState, useEffect } from "react";
import Header from "@components/header";
import CardList from "@components/cardList";
import Map from "@components/map";
import { Button } from '@mui/material';
import type { ILibrary } from "@mytypes/library";

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiBaseUrl = "http://localhost:8000"

export default function Home() {
    const [cards, setCards] = useState<ILibrary[]>([]);

    // On load of the page, fetch the data from the backend
    useEffect(() => {
        fetch(`${apiBaseUrl}/api/locations`)
            .then((res) => {
                if(!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Search results:", data)
                setCards(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
    }, []);

    return (
      <div className="min-h-screen bg-yellow-200">
            <Header />
            <div className="grid grid-cols-2 p-2 mt-6">
                <CardList cards={cards} />
                <Map />
            </div>
        </div>
    );
}