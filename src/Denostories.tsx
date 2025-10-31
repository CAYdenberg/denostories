import { RouteContext } from "$fresh/server.ts";

import { Layout } from "./components/Layout.tsx";
import { HeadlessCheckMessages } from "./components/HeadlessCheckMessages.tsx";
import { buildGroups } from "./buildGroups.tsx";
import { getConfig } from "./config.ts";

import type { FunctionComponent } from "preact";

export default async function Denostories(_: Request, ctx: RouteContext) {
  const config = getConfig();

  const groups = await buildGroups(config);

  const slugs = ctx.params.slug.split("/");
  const groupSlug = slugs[0] || "";
  const storySlug = slugs[1] || "";

  const group = groups.find((g) => g.slug === groupSlug) || groups[0];
  const story = group.stories.find((s) => s.slug === storySlug) ||
    group.stories[0];

  const Component: FunctionComponent | undefined = story.Component;
  const checkResults = story.checks;

  return (
    <Layout
      groups={groups}
      topRoute={config.route}
      isRunningChecks={config.runHeadlessChecks}
    >
      <HeadlessCheckMessages results={checkResults} />
      <Component />
    </Layout>
  );
}
