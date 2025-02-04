import type { FunctionComponent } from "preact";
import { Layout } from "./components/Layout.tsx";
import { buildGroups } from "./buildGroups.tsx";
import { RouteContext } from "$fresh/server.ts";

export default async function Denostories(req: Request, ctx: RouteContext) {
  const groups = await buildGroups();

  const slugs = ctx.params.slug.split("/");
  const groupSlug = slugs[0] || "";
  const storySlug = slugs[1] || "";

  const group = groups.find((g) => g.slug === groupSlug) || groups[0];
  const story = group.stories.find((s) => s.slug === storySlug) ||
    group.stories[0];

  const Component: FunctionComponent | undefined = story.Component;

  return (
    <Layout groups={groups}>
      <Component />
    </Layout>
  );
}
