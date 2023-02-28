/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        // globals: true, // so we don't need to import describe and it every time
        environment: "jsdom",
        setupFiles: "./config/setup.ts", // path to the config file
    },
    build: {
        outDir: "../backend/employeeCreator/src/main/resources/static",
        emptyOutDir: true,
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
