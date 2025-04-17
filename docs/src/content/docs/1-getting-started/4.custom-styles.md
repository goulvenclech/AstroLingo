---
slug: "getting-started/custom-styles"
title: "Custom styles"
abstract: "Customize the look and feel of your Astrolingo project."
---

## Create your style file

Create a file named `main.css` in the `src/styles/` directory of your project, and add our base styles:

```css
@import "@goulvenclech/astrolingo/theme";
```

## Customize the theme variables

In `:root`, you can override the default theme variables to customize the look and feel of your project. For example:

```css
:root {
  --color-primary: blue;
  --radius: 5px;
}
```

Here's a list of the available CSS variables you can customize:

| CSS Variable                 | Description                                       | Expected Type   |
| :--------------------------- | :------------------------------------------------ | :-------------- |
| `--color-primary`            | Main color (accents, buttons, etc.).              | `<color>`       |
| `--color-primary-hover`      | Main color on hover.                              | `<color>`       |
| `--color-primary-foreground` | Text/icon color on `--color-primary` background.  | `<color>`       |
| `--color-font`               | Default text color (light mode).                  | `<color>`       |
| `--color-font-dark`          | Default text color (dark mode).                   | `<color>`       |
| `--color-background`         | Main background color (light mode).               | `<color>`       |
| `--color-background-dark`    | Main background color (dark mode).                | `<color>`       |
| `--color-foreground`         | Secondary background color (e.g., cards) (light). | `<color>`       |
| `--color-foreground-dark`    | Secondary background color (dark).                | `<color>`       |
| `--color-error`              | Color for error messages.                         | `<color>`       |
| `--color-success`            | Color for success messages.                       | `<color>`       |
| `--color-warning`            | Color for warning messages.                       | `<color>`       |
| `--color-info`               | Color for informational messages.                 | `<color>`       |
| `--font-main`                | Main font family for content.                     | `<font-family>` |
| `--font-mono`                | Font family for code (monospace).                 | `<font-family>` |
| `--radius`                   | Default border radius for elements.               | `<length>`      |

## Override styles

You can also override specific styles in your `main.css` file. For example, to change the color of all buttons:

```css
button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}
```

Or using Tailwind CSS `@apply` directive:

```css
button {
  @apply bg-primary text-primary-foreground;
}
```