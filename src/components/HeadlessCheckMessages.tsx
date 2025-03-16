import type { FunctionComponent } from "preact";
import type { HeadlessCheckResultI } from "../types.ts";
import { Fragment } from "preact";

interface Props {
  results?: HeadlessCheckResultI[];
}

export const HeadlessCheckMessages: FunctionComponent<Props> = (
  { results },
) => {
  const failures = results?.filter((result) => !result.passed);

  if (!failures?.length) return null;

  return (
    <Fragment>
      {failures.map((failure, idx) => (
        <div key={idx} class="ds-message">{failure.message}</div>
      ))}
    </Fragment>
  );
};
