import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { CodeInspectorPlugin } from "code-inspector-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), CodeInspectorPlugin({ bundler: "vite" })],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    }
  },
});
