import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

import { renderToString } from "$fresh/src/server/deps.ts";
import { HeadlessCheckResultI, Story, StoryGroupI, StoryI } from "../types.ts";

export const runChecks = (
  Component: Story,
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
