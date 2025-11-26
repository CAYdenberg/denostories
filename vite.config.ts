import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    fresh({
      clientEntry: "./client.ts",
      islandSpecifiers: ["@/src/components/Menu.tsx"],
    }),
    tailwindcss(),
  ],
});
