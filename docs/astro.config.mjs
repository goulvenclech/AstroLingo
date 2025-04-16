import { defineConfig } from "astro/config"
import astrolingo from "@goulvenclech/astrolingo"

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        // TODO: should be changed to "one-light" when Astro will support it
        light: "one-dark-pro",
        dark: "one-dark-pro",
      },
    },
  },
  integrations: [
    astrolingo({
      projectName: "Astropi",
      archetypes: [
        {
          path: "docs",
          name: "Documentation",
          collection: "docs",
          type: "docs-content",
        },
        {
          path: "refs",
          name: "Reference",
          collection: "refs",
          type: "docs-content",
        },
        {
          path: "contribute",
          name: "Contribute",
          collection: "contribute",
          type: "docs-content",
        },
        {
          path: "blog",
          name: "Blog",
          collection: "blog",
          type: "blog-content",
        },
      ],
    }),
  ],
})
