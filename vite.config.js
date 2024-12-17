import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000", // Your backend server
        // changeOrigin: true, // Changes the origin of the request to the target URL
        secure: false, // Disable SSL verification if your backend uses HTTP
      },
    },
  },

  plugins: [react()],
});
