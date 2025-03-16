import { DOMParser, HTMLDocument } from "../deps.ts";

import { renderToString } from "$fresh/src/server/deps.ts";
import { HeadlessCheckResultI, HeadlessCheckType, Story } from "../types.ts";

export const runChecks = (
  Component: Story,
  dieOnFailure?: boolean,
): HeadlessCheckResultI[] => {
  const { componentStr, buildResult } = runBuildCheck(Component, dieOnFailure);

  if (Component.checkData && componentStr) {
    const doc = new DOMParser().parseFromString(componentStr, "text/html");
    const keys = Object.keys(Component.checkData);

    const results = keys.map((key: string): HeadlessCheckResultI =>
      runDomCheck(doc, key, Component.checkData![key], dieOnFailure)
    );
    return [buildResult, ...results];
  }

  return [buildResult];
};

const isError = (err: Error | unknown): err is Error => {
  if ((err as Error)?.message) return true;
  return false;
};

const runBuildCheck = (Component: Story, dieOnFailure?: boolean) => {
  try {
    const componentStr = renderToString(<Component />);

    const buildResult = {
      type: HeadlessCheckType.Build,
      passed: true,
      message: "",
    };
    return { componentStr, buildResult };
  } catch (e) {
    if (dieOnFailure) throw e;

    const buildResult = {
      type: HeadlessCheckType.Build,
      passed: false,
      message: isError(e) ? e.message : "Unknown build error",
    };
    return { componentStr: "", buildResult };
  }
};

const runDomCheck = (
  doc: HTMLDocument,
  key: string,
  fn: (value: string) => void,
  dieOnFailure?: boolean,
): HeadlessCheckResultI => {
  const el = doc.querySelector(`[data-ds-${key}]`);
  const value = el?.getAttribute(`data-ds-${key}`);
  if (!value) {
    return {
      type: HeadlessCheckType.CheckData,
      passed: false,
      message: `Data attribute for ${key} not found`,
    };
  }

  try {
    fn(value);

    return {
      type: HeadlessCheckType.CheckData,
      passed: true,
      message: "",
    };
  } catch (e) {
    if (dieOnFailure) throw e;
    return {
      type: HeadlessCheckType.CheckData,
      passed: false,
      message: `Data check failed examining data attribute \`${key}\``,
    };
  }
};
