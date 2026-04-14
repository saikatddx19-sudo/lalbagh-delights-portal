import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    ssr: false, // ❗ VERY IMPORTANT
  },
});
