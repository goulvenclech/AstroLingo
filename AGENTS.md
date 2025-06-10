# AI Agent Guide (AGENTS.md)

## Purpose

This document describes how AI agents should contribute to the **AstroLingo** codebase. Follow these rules so that generated code, tests and docs integrate smoothly with the project and remain maintainable.

## 1. Project Context

* **Repository**: `goulvenclech/astrolingo`
* **Stack**: Node (PNPM), TypeScript, Astro, TailwindCSS.
* **Architecture**: Monorepo.
  * Core utilities and components → `packages/core/`
  * Gamified components → `packages/games/`
  * Documentation website → `docs/`
  * Starter template → `starter/`
* **Key principles**: accessibility, simple components, typed utilities.

## 2. Coding Style

* Use modern **TypeScript** and **Astro** syntax.
* Prefer clarity over cleverness. Keep functions small and focused.
* Reuse existing utilities instead of introducing abstractions prematurely.
* Keep everything in English.

## 3. Naming Conventions

| Element               | Convention         | Example                  |
| --------------------- | ------------------ | ------------------------ |
| Components            | `PascalCase.astro` | `Button.astro`           |
| Modules / files       | `kebab-case.ts`    | `collections-entries.ts` |
| Functions / variables | `camelCase`        | `generateNavigation()`   |
| Types / interfaces    | `PascalCase`       | `Archetype`              |

## 4. Tests

* Use **Vitest** for unit tests (`pnpm run test`).
* Tests focus on observable behaviour.

## 5. User Interface & Internationalisation

* Default language is **English**; keep user-facing strings in English.
* Follow accessible HTML practices and reuse existing components when possible.

## 6. Comments & Documentation

* Favour self-documenting code. Comment only when the intent isn’t obvious.
* Keep comments short, in English, explaining *why* not *how*.
* Public APIs may include JSDoc/TSDoc blocks.

## 7. Leveraging Existing Docs

Before creating new code or docs, look through `README.md` files and docs to stay consistent with existing conventions and avoid duplication.

## 8. Deliverables for Each Contribution

1. Production-ready implementation code.
2. Corresponding unit tests.
3. Updated documentation if behaviour or public APIs change.
4. Add a changeset (`pnpm exec changeset`) when a package version should bump.
5. A concise pull request description of scope, rationale and testing strategy.

## 9. Out of Scope

* Do **not** modify CI or release workflows unless explicitly instructed.
* Avoid adding new dependencies without a strong justification and prior discussion.

## 10. Contact & Feedback

If some aspect is unclear from the repository sources, mention your assumption in the pull request and ask for clarification.

*Follow these guidelines to keep AI-generated contributions consistent and easy to review.*