import { path } from "./deps.ts";

import Denostories from "./Denostories.tsx";
import { buildGroups } from "./buildGroups.tsx";
import { Config, setConfig } from "./config.ts";

import type { Plugin } from "$fresh/server.ts";

const decoder = new TextDecoder("utf-8");
const contents = Deno.readFileSync(
  path.join(path.dirname(path.fromFileUrl(import.meta.url)), "styles.css"),
);
const cssText = decoder.decode(contents);

export default function denostories(options?: Partial<Config>): Plugin {
  const config = setConfig(options);
  buildGroups(config, true);

  const { enabled, route } = config;

  return {
    name: "denostories",
    routes: enabled
      ? [
        { path: `${route}/[...slug]`, component: Denostories },
      ]
      : undefined,
    islands: {
      baseLocation: import.meta.url,
      paths: [
        "./components/Menu.tsx",
      ],
    },
    render: (ctx) => {
      ctx.render();

      if (!enabled) return {};

      return {
        styles: [{
          cssText,
        }],
      };
    },
  };
}
