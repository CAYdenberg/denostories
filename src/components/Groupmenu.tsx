import { useState } from "preact/hooks";

import { Story, StoryGroup } from "../types.ts";
import { ChevronIcon, FileIcon } from "./icons.ts";

import type { FunctionComponent } from "preact";

interface Props {
  group: StoryGroup;
  search: string;
  topRoute: string;
}

export const GroupMenu: FunctionComponent<Props> = (
  { group, search, topRoute },
) => {
  const [isOpen, setIsOpen] = useState(true);
  const showOpen = isOpen || !!search;

  const allMatch = search &&
    group.title.toLowerCase().includes(search.toLowerCase());
  const isMatch = (story: Story): boolean => {
    if (!search) return true;
    if (allMatch) return true;
    return story.title.toLowerCase().includes(search.toLowerCase());
  };

  const anyMatch = !!group.stories.find(isMatch);

  if (search && !anyMatch) return null;

  return (
    <li key={group.title} class="ds-groupmenu">
      <button
        type="button"
        class="ds-groupmenu__title"
        onClick={() => setIsOpen((init) => !init)}
        aria-pressed={showOpen}
      >
        <ChevronIcon size={16} className="ds-groupmenu__indicator" />
        <span>{group.title}</span>
      </button>
      <ul class="ds-storymenu" aria-expanded={showOpen}>
        {group.stories.map((story) =>
          isMatch(story)
            ? (
              <li key={story.slug} className="ds-storymenu__item">
                <a
                  href={`/${topRoute}/${group.slug}/${story.slug}`}
                  class="ds-storymenu__a"
                >
                  <FileIcon size={16} />
                  <span class="ds-storymenu__title">{story.title}</span>
                </a>
              </li>
            )
            : null
        )}
      </ul>
    </li>
  );
};
