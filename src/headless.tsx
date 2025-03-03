import { renderToString } from "$fresh/src/server/deps.ts";
import type { FunctionComponent } from "preact";
import { HeadlessCheckResultI, StoryGroupI, StoryI } from "./types.ts";

export const runChecks = (
  Component: FunctionComponent,
  dieOnFailure?: boolean,
): HeadlessCheckResultI[] => {
  let buildPassed = true;
  let message: string = "";
  try {
    renderToString(<Component />);
  } catch (e) {
    if (dieOnFailure) throw e;
    buildPassed = false;
    message = (e as Error)?.message || "(Unknown build error)";
  }
  return [
    {
      type: "build",
      passed: buildPassed,
      message,
    },
  ];
};

export const getFailureFromStory = (
  story: StoryI,
): HeadlessCheckResultI | null =>
  story.checks?.find((check) => !check.passed) || null;

export const getFailureFromGroup = (
  group: StoryGroupI,
): HeadlessCheckResultI | null => {
  const story = group.stories.find((story) => getFailureFromStory(story));
  return story ? getFailureFromStory(story) : null;
};

export const getFailureFromAll = (
  groups: StoryGroupI[],
): HeadlessCheckResultI | null => {
  const group = groups.find((group) => getFailureFromGroup(group));
  return group ? getFailureFromGroup(group) : null;
};
