import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    fresh({
      islandSpecifiers: ["@/src/components/Menu.tsx"],
    }),
    tailwindcss(),
  ],
});
