import type { FunctionComponent } from "preact";

export interface StoryI {
  title: string;
  slug: string;
  Component: FunctionComponent;
  checks?: Array<HeadlessCheckResultI>;
}

export interface StoryGroupI {
  title: string;
  slug: string;
  stories: StoryI[];
}

export interface HeadlessCheckResultI {
  type: "build";
  passed: boolean;
  message: string;
}
