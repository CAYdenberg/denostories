import { expandGlob, kebabCase, path, sentenceCase } from "./deps.ts";

import type { Story, StoryGroupI } from "./types.ts";
import { Config } from "./config.ts";
import { runChecks } from "./headless/run.tsx";
import { FunctionComponent } from "preact";

let cache: {
  groups: StoryGroupI[];
  components: Record<string, FunctionComponent>;
};

export const buildGroups = async (
  config: Config,
  refresh?: boolean,
  dieOnFailure?: boolean,
): Promise<
  { groups: StoryGroupI[]; components: Record<string, FunctionComponent> }
> => {
  let groups: StoryGroupI[] = [];
  let components: Record<string, FunctionComponent> = {};

  if (cache && !refresh) {
    return cache;
  }

  for await (const file of expandGlob(config.match)) {
    if (!file.isFile) continue;

    const content = await import(/* @vite-ignore */ file.path) as Record<
      string,
      Story
    >;

    const base = path.basename(file.name, ".stories.tsx");

    const stories = Object.keys(content).map((key) => {
      const _key = key as keyof typeof content;
      const Component = content[_key];
      components = {
        ...components,
        [`${kebabCase(base)}/${kebabCase(_key)}`]: Component,
      };

      return {
        title: sentenceCase(_key),
        slug: kebabCase(_key),
        checks: runChecks(Component, dieOnFailure),
      };
    });

    groups = [...groups, {
      title: sentenceCase(base),
      slug: kebabCase(base),
      stories,
    }];
  }

  cache = { groups, components };

  return { groups, components };
};
