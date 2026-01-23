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

  build: {
    // Increase chunk size warning limit (optional - hides warning)
    chunkSizeWarningLimit: 600,

    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion", "motion/react"],
          "vendor-gsap": ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
