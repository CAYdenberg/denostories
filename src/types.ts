import type { FunctionComponent } from "preact";

export interface Story extends FunctionComponent {
  checkData?: Record<string, (value: string) => void>;
}

export interface StoryI {
  title: string;
  slug: string;
  checks?: Array<HeadlessCheckResultI>;
}

export interface StoryGroupI {
  title: string;
  slug: string;
  stories: StoryI[];
}

export enum HeadlessCheckType {
  Build = "Build",
  CheckData = "CheckData",
}

export interface HeadlessCheckResultI {
  type: HeadlessCheckType;
  passed: boolean;
  message: string;
}
