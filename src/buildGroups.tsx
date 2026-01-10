import { expandGlob, kebabCase, path, sentenceCase } from "./deps.ts";

import type { Story, StoryGroupI } from "./types.ts";
import { Config } from "./config.ts";
import { runChecks } from "./headless/run.tsx";
import { FunctionComponent } from "preact";
import { WalkEntry } from "@std/fs/walk";

let cache: Record<string, {
  group: StoryGroupI;
  components: Record<string, FunctionComponent>;
}> = {};

export const buildGroups = async (
  config: Config,
  refresh?: boolean,
  dieOnFailure = false,
): Promise<
  { groups: StoryGroupI[]; components: Record<string, FunctionComponent> }
> => {
  let groups: StoryGroupI[] = [];
  let components: Record<string, FunctionComponent> = {};

  if (refresh) {
    cache = {};
  }

  for await (const file of expandGlob(config.match)) {
    if (!file.isFile) continue;

    const data = await analyzeFile(file, dieOnFailure);

    components = {
      ...components,
      ...data.components,
    };

    groups = [...groups, data.group];
  }

  return { groups, components };
};

const analyzeFile = async (file: WalkEntry, dieOnFailure = false) => {
  if (cache[file.path]) return cache[file.path];

  const content = await import(/* @vite-ignore */ file.path) as Record<
    string,
    Story
  >;

  console.log(file.name);

  const base = path.basename(file.name).split(".")[0];

  let componentsForFile: Record<string, FunctionComponent> = {};
  const stories = Object.keys(content).map((key) => {
    const _key = key as keyof typeof content;
    const Component = content[_key];
    componentsForFile = {
      ...componentsForFile,
      [`${kebabCase(base)}/${kebabCase(_key)}`]: Component,
    };

    return {
      title: sentenceCase(_key),
      slug: kebabCase(_key),
      checks: runChecks(Component, dieOnFailure),
    };
  });

  const value = {
    group: {
      title: sentenceCase(base),
      slug: kebabCase(base),
      stories,
    },
    components: componentsForFile,
  };

  cache[file.path] = value;
  setupWatcher(file.path);

  return value;
};

const setupWatcher = async (path: string) => {
  const watcher = Deno.watchFs(path);
  for await (const _ of watcher) {
    delete cache[path];
    watcher.close();
  }
};
