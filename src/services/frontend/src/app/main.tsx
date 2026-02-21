import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from "./home.tsx";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { setupTheme } from '../themes/theme';

const theme = setupTheme();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
    </StrictMode>
);