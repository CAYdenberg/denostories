import type { FunctionComponent } from "preact";
import type { StoryGroup } from "../types.ts";
import { Submenu } from "./Submenu.tsx";
import { ChevronIcon } from "../deps.ts";

interface Props {
  groups: StoryGroup[];
}

export const Menu: FunctionComponent<Props> = ({ groups }) => {
  return (
    <ul class="ds-menu">
      {groups.map((group) => (
        <li key={group.title}>
          <button type="button" class="ds-menu__item" data-is-open={false}>
            <ChevronIcon size={16} />
            <span>{group.title}</span>
          </button>
          <Submenu stories={group.stories} path={`/stories/${group.slug}`} />
        </li>
      ))}
    </ul>
  );
};
