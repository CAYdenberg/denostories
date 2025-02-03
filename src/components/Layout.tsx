import { Menu } from "./Menu.tsx";

import type { FunctionComponent } from "preact";
import type { StoryGroup } from "../types.ts";

interface Props {
  groups: StoryGroup[];
}

export const Layout: FunctionComponent<Props> = ({ children, groups }) => {
  return (
    <div class="ds-layout">
      <main class="ds-layout__main">
        {children}
      </main>
      <nav class="ds-layout__aside">
        <Menu groups={groups} />
      </nav>
    </div>
  );
};
