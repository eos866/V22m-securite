import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// base "./" : le site fonctionne quel que soit le chemin GitHub Pages.
// Le site compilé est écrit dans docs/ (GitHub Pages : branche main, dossier /docs).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { outDir: "docs", emptyOutDir: true },
});
