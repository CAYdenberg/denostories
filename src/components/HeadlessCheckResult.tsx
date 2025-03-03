import { FunctionComponent } from "preact";
import { FailureIcon, SuccessIcon } from "./icons.ts";

interface Props {
  show: boolean;
  isFailure: boolean;
}

export const HeadlessCheckResult: FunctionComponent<Props> = (
  { show, isFailure },
) => {
  if (!show) return null;

  return isFailure
    ? <FailureIcon color="red" size={16} />
    : <SuccessIcon color="green" size={16} />;
};
