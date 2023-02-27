/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/employeeCreator",
    test: {
        // globals: true, // so we don't need to import describe and it every time
        environment: "jsdom",
        setupFiles: "./config/setup.ts", // path to the config file
    },
});
