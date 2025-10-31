import { Button } from "../components/Button.tsx";
import { Story } from "../mod.ts";
import { assertEquals } from "@std/assert";

export const Basic = () => <Button type="button">This is a button</Button>;

export const TypeSubmit: Story = () => {
  return (
    <Button type="submit" onClick={console.log}>This is a submit button</Button>
  );
};

TypeSubmit.checkData = {
  "type": (value) => assertEquals(value, "submit"),
};
