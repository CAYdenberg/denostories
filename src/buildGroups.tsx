import type { FunctionComponent } from "preact";
import { expandGlob, kebabCase, path, sentenceCase } from "./deps.ts";

import type { Story, StoryDefault, StoryGroup } from "./types.ts";
import { Config } from "./config.ts";
import { Fragment } from "preact";

type FileContents =
  & Record<
    string,
    FunctionComponent
  >
  & {
    default: StoryDefault;
  };

let cache: StoryGroup[] = [];

export const buildGroups = async (
  config: Config,
  refresh?: boolean,
): Promise<StoryGroup[]> => {
  let groups: StoryGroup[] = [];

  if (cache.length && !refresh) {
    return cache;
  }

  for await (const file of expandGlob(config.match)) {
    if (!file.isFile) continue;

    const content = await import(`file://${file.path}`) as FileContents;

    let isIsland = false;
    let Decorator: FunctionComponent = (
      { children },
    ) => <Fragment>{children}</Fragment>;

    const stories = Object.keys(content).map((key) => {
      const _key = key as keyof typeof content;
      if (_key === "default") {
        isIsland = !!content["default"].isIsland;
        if (content["default"].decorator) {
          Decorator = content["default"].decorator;
        }
        return null;
      }

      return {
        title: sentenceCase(_key),
        slug: kebabCase(_key),
        Component: content[_key],
      };
    }).filter(Boolean) as Story[];

    const base = path.basename(file.name, ".stories.tsx");

    groups = [...groups, {
      title: sentenceCase(base),
      slug: kebabCase(base),
      stories,
      island: isIsland ? file.name : null,
      Decorator,
    }];
  }

  cache = groups;
  return groups;
};
