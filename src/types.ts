import type { FunctionComponent } from "preact";

export interface Story extends FunctionComponent {
  checkDataAttr?: Record<string, (value: string) => void>;
}

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
