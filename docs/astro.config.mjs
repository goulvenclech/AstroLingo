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
      projectName: "Astrolingo",
      archetypes: [
        {
          name: "Guide",
          collection: "guide",
          description: "Contribute to our learning language websites.",
          type: "docs-content",
        },
        {
          name: "Documentation",
          collection: "docs",
          description: "Everything you need to build your Astrolingo project.",
          type: "docs-content",
        },
        {
          name: "Reference",
          collection: "refs",
          description: "Astrolingo technical and components references.",
          type: "docs-content",
        },
        {
          name: "Blog",
          collection: "blog",
          description: "Project updates and latest news.",
          type: "blog-content",
        },
      ],
    }),
  ],
})
