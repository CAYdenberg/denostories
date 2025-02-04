import { RouteContext } from "$fresh/server.ts";

import { Layout } from "./components/Layout.tsx";
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

  return (
    <Layout groups={groups} topRoute={config.route}>
      <Component />
    </Layout>
  );
}
