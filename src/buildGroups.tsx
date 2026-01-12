import { expandGlob, kebabCase, path, sentenceCase } from "./deps.ts";

import type { Story, StoryGroupI } from "./types.ts";
import { Config } from "./config.ts";
import { runChecks } from "./headless/run.tsx";
import { FunctionComponent } from "preact";
import { WalkEntry } from "@std/fs/walk";
import { getFailureFromAll } from "./headless/utils.ts";
import { logFailure, logSuccess } from "./log.ts";

let cache: Record<string, {
  group: StoryGroupI;
  components: Record<string, FunctionComponent>;
}> = {};

export const buildGroups = async (
  config: Config,
  refresh?: boolean,
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

    const data = await analyzeFile(
      file,
      config,
    );

    components = {
      ...components,
      ...data.components,
    };

    groups = [...groups, data.group];
  }

  if (config.log) {
    const failure = getFailureFromAll(groups);
    failure ? logFailure(failure.message) : logSuccess("Denostories: Ok");
  }

  return { groups, components };
};

const analyzeFile = async (
  file: WalkEntry,
  config: Config,
) => {
  if (cache[file.path]) return cache[file.path];

  const content = await import(/* @vite-ignore */ file.path) as Record<
    string,
    Story
  >;

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
      checks: config.runHeadlessChecks
        ? runChecks(Component, config.exitBuildOnFailedCheck)
        : undefined,
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
