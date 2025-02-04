import { useEffect, useState } from "preact/hooks";

import { StoryGroup } from "../types.ts";
import { ChevronIcon, FileIcon } from "./icons.ts";

import type { FunctionComponent } from "preact";

interface Props {
  group: StoryGroup;
  search: string;
}

export const GroupMenu: FunctionComponent<Props> = ({ group, search }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <li key={group.title} class="ds-groupmenu">
      <button
        type="button"
        class="ds-groupmenu__title"
        onClick={() => setIsOpen((init) => !init)}
        aria-pressed={isOpen}
      >
        <ChevronIcon size={16} className="ds-groupmenu__indicator" />
        <span>{group.title}</span>
      </button>
      <ul class="ds-storymenu" aria-expanded={isOpen}>
        {group.stories.map((story) => (
          <li key={story.slug} className="ds-storymenu__item">
            <a
              href={`/stories/${group.slug}/${story.slug}`}
              class="ds-storymenu__a"
            >
              <FileIcon size={16} />
              <span class="ds-storymenu__title">{story.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};
