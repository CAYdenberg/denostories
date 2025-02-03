import type { FunctionComponent } from "preact";

export interface Story {
  title: string;
  slug: string;
  Component: FunctionComponent;
}

export interface StoryGroup {
  title: string;
  slug: string;
  stories: Story[];
}
