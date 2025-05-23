---
slug: "getting-started/add-existing-project"
title: "Existing project"
abstract: "Add the Astrolingo integration to an existing Astro project."
---

Because Astropi is an Astro integration, you can easly add Astropi to your existing Astro project:

```bash
# If you use pnpm
pnpm astro add @goulvenclech/astrolingo
# If you use npm
npx astro add @goulvenclech/astrolingo
# If you use yarn
yarn astro add @goulvenclech/astrolingo
```

Then, add Astropi integration to your Astro configuration file `astro.config.mjs`:

```ts
import { astrolingo } from "@goulvenclech/astrolingo";

// [...]

export default defineConfig({
  // Other Astro configuration
  integrations: [
    astrolingo({
      projectName: "Your project name", // Add your project name
      archetypes: [],
    }),
  ],
};
```