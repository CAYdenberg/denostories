import { useCallback, useState } from "preact/hooks";
import { GroupMenu } from "./Groupmenu.tsx";
import { SearchIcon } from "./icons.ts";

import type { FunctionComponent } from "preact";
import type { StoryGroup } from "../types.ts";

interface Props {
  groups: StoryGroup[];
}

export const Menu: FunctionComponent<Props> = ({ groups }) => {
  const [search, setSearch] = useState("");
  const handleChange = useCallback((ev: Event) => {
    const { value } = ev.target as HTMLInputElement;
    setSearch(value);
  }, []);

  return (
    <>
      <div class="ds-search">
        <SearchIcon className="ds-search__icon" color="#276ef1" />
        <input
          type="search"
          class="ds-search__input"
          value={search}
          onChange={handleChange}
        />
      </div>
      <ul class="ds-menu">
        {groups.map((group) => <GroupMenu group={group} search={search} />)}
      </ul>
    </>
  );
};
