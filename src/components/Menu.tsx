import { useCallback, useState } from "preact/hooks";
import { GroupMenu } from "./Groupmenu.tsx";

import type { FunctionComponent } from "preact";
import type { StoryGroupI } from "../types.ts";

export interface MenuProps {
  topRoute: string;
  groups: StoryGroupI[];
  isRunningChecks: boolean;
}

export const Menu: FunctionComponent<MenuProps> = (
  { groups, topRoute, isRunningChecks },
) => {
  const [search, setSearch] = useState("");
  const handleChange = useCallback((ev: Event) => {
    const { value } = ev.target as HTMLInputElement;
    setSearch(value);
  }, []);

  return (
    <>
      <div class="ds-search">
        <input
          type="search"
          class="ds-search__input"
          value={search}
          onInput={handleChange}
        />
      </div>
      <ul class="ds-menu">
        {groups.map((group) => (
          <GroupMenu
            group={group}
            search={search}
            topRoute={topRoute}
            isRunningChecks={isRunningChecks}
          />
        ))}
      </ul>
    </>
  );
};
