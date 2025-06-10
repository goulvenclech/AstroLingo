import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      'astro:content': resolve(__dirname, 'test/stubs/astro-content.ts'),
      'virtual:astrolingo-user-config': resolve(__dirname, 'test/stubs/virtual-astrolingo-user-config.ts'),
    },
  },
})
