import type { FunctionComponent } from "preact";

interface Story extends FunctionComponent {
  foo?: string;
}

export const BasicError: Story = () => {
  throw new Error("This will fail");
};

BasicError.foo = "bar";
