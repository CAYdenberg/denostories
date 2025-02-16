import type { FunctionComponent } from "preact";

interface Story extends FunctionComponent {
  foo?: string;
}

export const BasicError: Story = () => {
  // throw new Error("This will fail");

  return <h1>This component will error</h1>;
};

BasicError.foo = "bar";
