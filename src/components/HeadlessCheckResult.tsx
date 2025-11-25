import { FunctionComponent } from "preact";

interface Props {
  show: boolean;
  isFailure: boolean;
}

export const HeadlessCheckResult: FunctionComponent<Props> = (
  { show, isFailure },
) => {
  if (!show) return null;

  return isFailure ? "failure" : "success";
};
