import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jsx}"],
      },
      includeAssets: [],
      manifest: {
        name: "notema",
        short_name: "notema",
        start_url: "/",
        display: "browser",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [],
      },
    }),
  ],
});
