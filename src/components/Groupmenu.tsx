import { useState } from "preact/hooks";

import { StoryGroupI, StoryI } from "../types.ts";

import type { FunctionComponent } from "preact";
import { HeadlessCheckResult } from "./HeadlessCheckResult.tsx";
import { getFailureFromGroup, getFailureFromStory } from "../headless/utils.ts";

interface Props {
  group: StoryGroupI;
  search: string;
  topRoute: string;
  isRunningChecks: boolean;
}

export const GroupMenu: FunctionComponent<Props> = (
  { group, search, topRoute, isRunningChecks },
) => {
  const isOpen = true;
  // const [isOpen, setIsOpen] = useState(true);
  // const showOpen = isOpen || !!search;

  const allMatch = search &&
    group.title.toLowerCase().includes(search.toLowerCase());
  const isMatch = (story: StoryI): boolean => {
    if (!search) return true;
    if (allMatch) return true;
    return story.title.toLowerCase().includes(search.toLowerCase());
  };

  const anyMatch = !!group.stories.find(isMatch);

  if (search && !anyMatch) return null;

  return <li key={group.title} class="ds-groupmenu">{group.title}</li>;
  // <span className="ds-groupmenu__label"></span>
  {
    /* <button
        type="button"
        class="ds-groupmenu__title"
        onClick={() => setIsOpen((init) => !init)}
        aria-pressed={showOpen}
      >
        {
          /* <HeadlessCheckResult
          show={isRunningChecks}
          isFailure={!!getFailureFromGroup(group)}
        />
        }
      </button> */
  }
  {
    /* <ul class="ds-storymenu" aria-expanded={showOpen}>
        {group.stories.map((story) =>
          isMatch(story)
            ? (
              <li key={story.slug} className="ds-storymenu__item">
                <a
                  href={`/${topRoute}/${group.slug}/${story.slug}`}
                  class="ds-storymenu__a"
                >
                  <span class="ds-storymenu__title">{story.title}</span>
                  <HeadlessCheckResult
                    show={isRunningChecks}
                    isFailure={!!getFailureFromStory(story)}
                  />
                </a>
              </li>
            )
            : null
        )}
      </ul> */
  }
  // </li>
  // );
};
