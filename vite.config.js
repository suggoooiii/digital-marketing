import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/digital-marketing/", // Add this line - your repo name

  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
