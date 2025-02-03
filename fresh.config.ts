import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import denostory from "./src/plugin.ts";

export default defineConfig({
  plugins: [tailwind(), denostory()],
});
