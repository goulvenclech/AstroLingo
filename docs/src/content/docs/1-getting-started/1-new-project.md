---
slug: "getting-started/new-project"
title: "New project"
abstract: "Create a new Astrolingo project from the starter template."
---

Run the following command to create a new Astropi project from the starter template:

```bash
# If you use pnpm
pnpm create astro --template github:goulvenclech/astrolingo/starter
# If you use npm
npm create astro --template github:goulvenclech/astrolingo/starter
# If you use yarn
yarn create astro --template github:goulvenclech/astrolingo/starter
```

Astro CLI will ask you a few questions to set up your project and init a Git repository.

## Starter structure

Astropi starter is a minimalistic Astro project with a few markdown files to get you started. Here is the project structure:

```
your_project/
├─ src/
│    ├─ content/ <- Where you put your markdown files
│    |  ├─ [...]
│    |  └─ config.ts <- Collections Zod schemas
│    └─ env.d.ts 
├─ astro.config.mjs <- Astro & Astropi configuration
├─ package.json
└─ README.md
```
## Starter configuration

The `astro.config.mjs` file contains the configuration for Astro and Astropi. You can customize it to fit your needs.

Here is the default Astropi configuration:

```ts
astrolingo({
      projectName: "Astropi", // Add your project name
      archetypes: [
        {
          path: "blog",
          name: "Blog",
          collection: "blog",
          type: "blog-content",
        },
      ],
}),
```





