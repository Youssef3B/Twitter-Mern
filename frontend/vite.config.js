import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  "eslint.options": { setting: true },
  build: {
    outDir: "dist", // This should be 'dist' by default
  },
});
