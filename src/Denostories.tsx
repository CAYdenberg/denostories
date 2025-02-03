import type { FunctionComponent } from "preact";
import { expandGlob, kebabCase, path, sentenceCase } from "./deps.ts";

import { Layout } from "./components/Layout.tsx";

import type { StoryGroup } from "./types.ts";

export default async function Denostories() {
  let groups: StoryGroup[] = [];

  for await (const file of expandGlob("**/*.stories.tsx")) {
    if (!file.isFile) continue;

    const content = await import(`file://${file.path}`) as Record<
      string,
      FunctionComponent
    >;

    const stories = Object.keys(content).map((key) => {
      const _key = key as keyof typeof content;

      return {
        title: sentenceCase(_key),
        slug: kebabCase(_key),
        Component: content[_key],
      };
    });

    const base = path.basename(file.name, ".stories.tsx");

    groups = [...groups, {
      title: sentenceCase(base),
      slug: kebabCase(base),
      stories,
    }];
  }

  const Component: FunctionComponent | undefined = groups[0]?.stories[0]
    ?.Component;

  return (
    <Layout groups={groups}>
      <Component />
    </Layout>
  );
}
