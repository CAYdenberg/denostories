import { Menu } from "./Menu.tsx";

import type { FunctionComponent } from "preact";
import type { StoryGroupI } from "../types.ts";

interface Props {
  groups: StoryGroupI[];
  topRoute: string;
}

export const Layout: FunctionComponent<Props> = (
  { children, groups, topRoute },
) => {
  return (
    <div class="ds-layout">
      <main class="ds-layout__main">
        {children}
      </main>
      <nav class="ds-layout__aside">
        <Menu groups={groups} topRoute={topRoute} />
      </nav>
    </div>
  );
};
