import type { FunctionComponent } from "preact";
import { expandGlob, kebabCase, path, sentenceCase } from "./deps.ts";

import type { StoryGroup } from "./types.ts";

let cache: StoryGroup[] = [];

export const buildGroups = async (refresh?: boolean): Promise<StoryGroup[]> => {
  let groups: StoryGroup[] = [];

  if (cache.length && !refresh) {
    return cache;
  }

  for await (const file of expandGlob("**/*.stories.tsx")) {
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
