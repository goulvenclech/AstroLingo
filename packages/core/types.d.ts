/**
 * UserConfig is passed by the user in `astro.config.mjs` through the `astrolingo()` integration.
 * */
interface AstrolingoUserConfig {
  projectName: string
  archetypes: Array<Archetype>
}
// We generate collections based on the user's archetypes configuration.
type Archetype = {
  name: string
  collection: string
  description: string
  type: "blog-content" | "docs-content" | "docs-openapi"
}
// Used by "./virtual-user-config.ts"
declare module "virtual:astrolingo-user-config" {
  export const userConfig: AstrolingoUserConfig
}
