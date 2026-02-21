import Header from "@components/header";
import Map from "@components/map";
import { Button } from '@mui/material';

export default function Home() {
    return (
        <div className="bg-yellow-200">
            <Header />
            <div className="grid grid-cols-2 p-2 mt-6">
                <div className="flexmin-h-screen flex flex-col items-center justify-center gap-8">
                    <h1 className="text-6xl font-bold tracking-tight">UMLibby</h1>

                    <p className="text-2xl">Track libs</p>
                    <Button variant="contained">Hello world</Button>
                </div>
                <Map />
            </div>
        </div>
    );
}