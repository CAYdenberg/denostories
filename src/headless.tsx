import { renderToString } from "$fresh/src/server/deps.ts";
import { StoryGroupI } from "./types.ts";

export const runHeadless = (groups: StoryGroupI[]) => {
  return groups.reduce((acc, group) => [
    ...acc,
    ...group.stories.map((story) => {
      try {
        renderToString(<story.Component />);
      } catch (e: Error | unknown) {
        const message = e instanceof Error ? e.message : "(unknown error)";
        return `${group.title}: ${story.title}: ${message}`;
      }
      return "";
    }).filter(Boolean),
  ], [] as string[]);
};

const reportSuccess = (msg: string) => {
  console.log(
    `%c\u2713 %c${msg}`,
    "color: green",
    "color: white",
  );
};

const reportFailure = (msg: string) => {
  console.log(
    `%cX %c${msg}`,
    "color: red; font-style: italic",
    "color: white",
  );
};

export const report = (errors: string[]) => {
  if (!errors.length) {
    reportSuccess("Denostories checks successful");
    return;
  }

  errors.forEach((error) => {
    reportFailure(error);
  });
};
