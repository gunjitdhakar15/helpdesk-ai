import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",   // 🔑 ensures relative paths
  build: {
    outDir: "dist", // Netlify expects dist
  },
});
