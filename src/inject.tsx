import { buildGroups } from "./buildGroups.tsx";
import { Config, setConfig } from "./config.ts";

import { App } from "fresh";
import Denostories from "./Denostories.tsx";

// deno-lint-ignore no-explicit-any
const injectDenostories = (app: App<any>, options?: Partial<Config>) => {
  const config = setConfig(options);

  app.get(`/${config.route}/:slug*`, async (ctx) => {
    const groups = await buildGroups(config);
    const slugs = ctx.params.slug.split("/");
    const groupSlug = slugs[0] || "";
    const storySlug = slugs[1] || "";

    return ctx.render(
      <Denostories
        config={config}
        groups={groups}
        groupSlug={groupSlug}
        storySlug={storySlug}
      />,
    );
  });

  return app;
};

export default injectDenostories;

// function denostories(options?: Partial<Config>): Plugin {
//   const config = setConfig(options);
//   buildGroups(config, true).then((groups) => {
//     if (!config.runHeadlessChecks) return;
//     getFailureFromAll(groups)
//       ? logFailure("Denostories checks failed")
//       : logSuccess("Denostories checks successful");
//   });

//   const { enabled, route } = config;

//   return {
//     name: "denostories",
//     routes: enabled
//       ? [
//         { path: `${route}/[...slug]`, component: Denostories },
//       ]
//       : undefined,
//     islands: {
//       baseLocation: import.meta.url,
//       paths: [
//         "./components/Menu.tsx",
//       ],
//     },
//     render: (ctx) => {
//       ctx.render();

//       if (!enabled) return {};

//       return {
//         styles: [{
//           cssText,
//         }],
//       };
//     },
//     buildStart: async () => {
//       if (!config.exitBuildOnFailedCheck) return;
//       await buildGroups(config, true, true);
//     },
//   };
// }
