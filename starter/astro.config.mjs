import { defineConfig } from "astro/config"
import astrolingo from "@goulvenclech/astrolingo"

// https://astro.build/config
export default defineConfig({
  integrations: [
    astrolingo({
      projectName: "Astrolingo",
      archetypes: [
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
