import { path } from "./deps.ts";

import Denostories from "./Denostories.tsx";

import type { Plugin } from "$fresh/server.ts";
import { buildGroups } from "./buildGroups.tsx";

interface Options {
  enabled: boolean;
}

const DEFAULT_OPTIONS: Options = {
  enabled: true,
};

const decoder = new TextDecoder("utf-8");
const contents = Deno.readFileSync(
  path.join(path.dirname(path.fromFileUrl(import.meta.url)), "styles.css"),
);
const cssText = decoder.decode(contents);

export default function denostories(options?: Partial<Options>): Plugin {
  buildGroups(true);

  const {
    enabled,
  } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return {
    name: "denostories",
    routes: enabled
      ? [
        { path: "stories/[...slug]", component: Denostories },
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
