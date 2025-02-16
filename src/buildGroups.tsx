import type { FunctionComponent } from "preact";
import { expandGlob, kebabCase, path, sentenceCase } from "./deps.ts";

import type { StoryGroupI } from "./types.ts";
import { Config } from "./config.ts";

let cache: StoryGroupI[] = [];

export const buildGroups = async (
  config: Config,
  refresh?: boolean,
): Promise<StoryGroupI[]> => {
  let groups: StoryGroupI[] = [];

  if (cache.length && !refresh) {
    return cache;
  }

  for await (const file of expandGlob(config.match)) {
    if (!file.isFile) continue;

    const content = await import(`file://${file.path}`) as Record<
      string,
      FunctionComponent
    >;

    const stories = Object.keys(content).map((key) => {
      const _key = key as keyof typeof content;

      return {
        title: sentenceCase(_key),
        slug: kebabCase(_key),
        Component: content[_key],
      };
    });

    const base = path.basename(file.name, ".stories.tsx");

    groups = [...groups, {
      title: sentenceCase(base),
      slug: kebabCase(base),
      stories,
    }];
  }

  cache = groups;
  return groups;
};
