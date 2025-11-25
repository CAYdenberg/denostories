// deno-lint-ignore-file react-no-danger

import styles from "./styles.css.ts";

import { Layout } from "./components/Layout.tsx";
import { HeadlessCheckMessages } from "./components/HeadlessCheckMessages.tsx";

import type { Config } from "./config.ts";
import // @ts-types="preact"
{ // @ts-types="preact"
  Fragment, // @ts-types="preact"
  type FunctionComponent,
} from "preact";
import type { StoryGroupI } from "./types.ts";

interface Props {
  components: Record<string, FunctionComponent>;
  groups: StoryGroupI[];
  groupSlug: string;
  storySlug: string;
  config: Config;
}

const Denostories: FunctionComponent<Props> = (
  { components, groups, groupSlug, storySlug, config },
) => {
  const group = groups.find((g) => g.slug === groupSlug) || groups[0];
  const story = group.stories.find((s) => s.slug === storySlug) ||
    group.stories[0];

  const Component: FunctionComponent | undefined =
    components[`${group.slug}/${story.slug}`];
  const checkResults = story.checks;

  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Layout
        groups={groups}
        topRoute={config.route}
        isRunningChecks={config.runHeadlessChecks}
      >
        <HeadlessCheckMessages results={checkResults} />
        <Component />
      </Layout>
    </Fragment>
  );
};

export default Denostories;
