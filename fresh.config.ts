import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import denostories from "./mod.ts";

export default defineConfig({
  plugins: [
    tailwind(),
    denostories({
      enabled: !!Deno.env.get("ENABLE_STORIES"),
    }),
  ],
});
