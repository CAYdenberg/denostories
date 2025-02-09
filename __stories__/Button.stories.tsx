import { Button } from "../components/Button.tsx";

export const Basic = () => <Button type="button">This is a button</Button>;

export const TypeSubmit = () => {
  return (
    <Button type="submit" onClick={console.log}>This is a submit button</Button>
  );
};

export default {
  isIsland: true,
};
