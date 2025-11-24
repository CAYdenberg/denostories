import { buildGroups } from "./buildGroups.tsx";
import { Config, setConfig } from "./config.ts";

import { Context, Middleware } from "fresh";
import Denostories from "./Denostories.tsx";

const injectDenostories = <T,>(options?: Partial<Config>): Middleware<T> => {
  const config = setConfig(options);

  return async (ctx: Context<T>) => {
    const pattern = new URLPattern({ pathname: `/${config.route}/:slug*` });
    if (!pattern.test(ctx.url)) {
      return ctx.next();
    }
    const params = pattern.exec(ctx.url)!.pathname.groups;

    const slugs = (params.slug || "").split("/");
    const groupSlug = slugs[0] || "";
    const storySlug = slugs[1] || "";

    const groups = await buildGroups(config);

    return ctx.render(
      <Denostories
        config={config}
        groups={groups}
        groupSlug={groupSlug}
        storySlug={storySlug}
      />,
    );
  };
};

export default injectDenostories;

