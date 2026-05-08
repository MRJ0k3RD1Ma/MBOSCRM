import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    allowedHosts: ["ddefa3e9038f.ngrok-free.app"],
    proxy: {
      "/api": {
        target: "https://new.mbosapp.uz/",
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    force: true,
  },
});
