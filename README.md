# Denostories

A Storybook implementation for the [Fresh framework](https://fresh.deno.dev/). Heavily inspired by [Ladle](https://ladle.dev/).

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

## Contributing

Please file issues before creating a PR in order to foster discussion. Be excellent to each other.