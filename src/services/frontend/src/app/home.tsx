import { NavLink } from "react-router";
import Header from "@components/header";
import Button from '@mui/material/Button';

export default function Home() {
    return (
        <>
            <Header />
            <Button variant="contained">Hello world</Button>
            <div className="min-h-screen flex flex-col items-center justify-center gap-8">
                <h1 className="text-4xl font-bold tracking-tight">UMLibby</h1>

                <p className="text-sm">Track libs</p>
                <nav>
                    <NavLink to="/about" end>About</NavLink>
                </nav>
            </div>
        </>
    );
}
