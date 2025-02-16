import type { FunctionComponent } from "preact";

export interface StoryI {
  title: string;
  slug: string;
  Component: FunctionComponent;
}

export interface StoryGroupI {
  title: string;
  slug: string;
  stories: StoryI[];
}
