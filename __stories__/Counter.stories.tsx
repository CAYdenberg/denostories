import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export const Basic = () => {
  const count = useSignal(3);
  return <Counter count={count} />;
};
