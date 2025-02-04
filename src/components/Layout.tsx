import { Menu } from "./Menu.tsx";

import type { FunctionComponent } from "preact";
import type { StoryGroup } from "../types.ts";

interface Props {
  groups: StoryGroup[];
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
