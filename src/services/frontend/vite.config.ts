import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@components": "/src/components",
            "@mytypes": "src/types",
        },
    },
    plugins: [react(), tailwindcss()],
});