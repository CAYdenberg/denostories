import { HeadlessCheckResultI, StoryGroupI, StoryI } from "../types.ts";

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
