# Denostories

A Storybook implementation for the [Fresh framework](https://fresh.deno.dev/). Heavily inspired by [Ladle](https://ladle.dev/).

Denostories will also _automatically_ render each story and to give you live feedback and interrupt deploys when something goes wrong.

## Getting started

### 1. Add as a plugin.

```ts
// fresh.config.ts

import denostories from "https://deno.land/x/denostories/mod.ts";

export default defineConfig({
	plugins: [
		denostories(),
	],
});
```

### 2. Add some stories. Examples:

```ts
// components/__stories__/Button.stories.ts

import { Button } from "../Button.tsx";

export const Basic = () => <Button type="button">This is a button</Button>;
```

Or to make the story interactive:

```ts
// islands/__stories__/Button.stories.ts

import { Button } from "../../components/Button.tsx";

export const IslandSubmit = () => {
	return (
		<Button type="button" onClick={console.log}>
			This is a button that will log the event to the console when clicked.
		</Button>
	);
};
```

### 3. Run your stories

Just run `deno task start` and visit `http://localhost:8000/stories/` in your browser. **That's it!**

## Headless Checks

One thing to love about Fresh is that is that components are isomorphic by default, and can be seemlessly transitioned between browser and server environments.

Denostories takes advantage of this by automatically checking your stories (for basic rendering). When all your stories are successfully build without error, you will see:

```
✓ Denostories checks successful
```

in your terminal.

If a headless check fails to build, you'll see:
- a notice in your terminal
- an icon in the menu on the `/stories` page
- during build, a full-fledged error and process exit

### Data checks

In addition to simply checking if stories throw on build, you can check data _within_ a story via data attributes. We can set up a check for this as follows:

```ts
// components/__stories__/Button.stories.ts

import { Button } from "../Button.tsx";
import { Story } from "https://deno.land/x/denostories/mod.ts";

export const Basic: Story = () => <Button type="button">This is a <span data-ds-foo="bar">button</span></Button>;

Basic.checkData = {
  "foo": (value) => assertEquals(value, "bar"),
}
```

Note that this is a highly contrived (ie useless) example. However, `data-ds-` attributes can occur _anywhere_ in the DOM tree generated by a story. Therefore, they can be added within components to test component behaviour in response to inputs.

## Configuration

- `enabled` (*default:* `true`). Unlike other storybook implementations, Denostories simply runs stories as an additional route in your existing app. This means you may want to disable it in production. An easy way to do this is via an environmental variable.

```ts
// fresh.config.ts

import denostories from "https://deno.land/x/denostories/mod.ts";

export default defineConfig({
	plugins: [
		denostories({ enabled: !Deno.env.get('PRODUCTION_SPECIFIC_ENV_VARIABLE') }),
	],
});
```

- `route` (*default*: `"stories"`). Top-level URL route at which stories will be served.
- `match`  (*default*: `"**/*.stories.tsx"`) Glob pattern to search for stories.
- `runHeadlessChecks` (*default*: `true`)
- `exitBuildOnFailedCheck` (*default*: `true)

## Contributing

Please file issues before creating a PR in order to foster discussion. Be excellent to each other.