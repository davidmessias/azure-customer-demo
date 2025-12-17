import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // During local dev, you can proxy /api to your local SWA emulator if you use it.
    // For a minimal setup, you can ignore this until you add local SWA tooling.
  }
});
