import { FunctionComponent } from "preact";
import { Story } from "../types.ts";
import { FileIcon } from "../deps.ts";

interface Props {
  stories: Story[];
  path: string;
}

export const Submenu: FunctionComponent<Props> = ({ stories, path }) => {
  return (
    <ul class="ds-submenu">
      {stories.map((story) => (
        <li key={story.slug}>
          <a href={`${path}/${story.slug}`} class="ds-submenu__a">
            <FileIcon size={16} />
            <span class="ds-submenu__title">{story.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
