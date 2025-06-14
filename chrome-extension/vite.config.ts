import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { type ManifestV3Export, crx } from "@crxjs/vite-plugin";
import defineManifest from "./manifest.config";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest: defineManifest as ManifestV3Export }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
