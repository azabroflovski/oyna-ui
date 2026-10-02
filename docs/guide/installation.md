# Installation

## Install

::: code-group

```bash [npm]
npm install oyna-ui
```

```bash [pnpm]
pnpm add oyna-ui
```

```bash [yarn]
yarn add oyna-ui
```

```bash [bun]
bun add oyna-ui
```

:::

`vue` 3.5 or newer is a peer dependency.

## Register

Import the stylesheet once and register the components:

```ts
import oyna from 'oyna-ui'
import { createApp } from 'vue'
import App from './App.vue'
import 'oyna-ui/style.css'

createApp(App).use(oyna).mount('#app')
```

Or import only what you use; the rest is left out of your bundle:

```vue
<script setup lang="ts">
import { OButton, OCard } from 'oyna-ui'
</script>
```

The stylesheet is plain CSS. You need neither Tailwind nor UnoCSS.

## Fonts

The look relies on two typefaces: a condensed display face for numbers and headings, and a plain sans for text. The library does not bundle font files, so loading them is one more line. Pick one of three ways.

**From Google Fonts, in one import.** The quickest:

```ts
import 'oyna-ui/style.css'
import 'oyna-ui/fonts.css'
```

The files come from Google's servers. If that is a problem for you — privacy rules, an offline app — use the next way.

**Served by you, with Fontsource.** The fonts become part of your own build:

::: code-group

```bash [npm]
npm install @fontsource/noto-sans @fontsource/barlow-condensed @fontsource/fira-sans-condensed
```

```bash [pnpm]
pnpm add @fontsource/noto-sans @fontsource/barlow-condensed @fontsource/fira-sans-condensed
```

```bash [yarn]
yarn add @fontsource/noto-sans @fontsource/barlow-condensed @fontsource/fira-sans-condensed
```

```bash [bun]
bun add @fontsource/noto-sans @fontsource/barlow-condensed @fontsource/fira-sans-condensed
```

:::

```ts
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/600.css'
import '@fontsource/noto-sans/700.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/barlow-condensed/800.css'
// only if your interface has Cyrillic text
import '@fontsource/fira-sans-condensed/700.css'
import '@fontsource/fira-sans-condensed/800.css'
```

**Your own typefaces.** Set `--o-font-sans` and `--o-font-display` to whatever you already load; see [Theming](/guide/theming).

| Family              | Weights       | Used for                      |
| ------------------- | ------------- | ----------------------------- |
| Noto Sans           | 400, 600, 700 | text                          |
| Barlow Condensed    | 700, 800      | numbers and headings          |
| Fira Sans Condensed | 700, 800      | Cyrillic numbers and headings |

Load every weight listed: a missing weight is synthesized by the browser and looks lighter.

### Without the fonts

Nothing breaks. Text falls back to the system's own sans, and headings to a condensed face the system has: Avenir Next Condensed on macOS and iOS, Arial Narrow on Windows, Roboto Condensed on Android. It is recognisably the same look, a little less sharp. The same fallbacks show for a moment while the real fonts are on their way.

## Background

The glass needs something behind it. Put [`OBackground`](/components/background) at the top of your app:

```vue
<template>
  <OBackground />
  <RouterView />
</template>
```

## Dependencies

Tabs, Dialog, Select, DropdownMenu, Popover, Tooltip and PinInput are built on [Reka UI](https://reka-ui.com), which handles focus and accessibility. It is installed with the library; you don't set it up.

## What the stylesheet does to the page

Besides the components, `style.css` sets on `body` a zero margin, the text font, white text and the
dark background colour, and makes scrollbars thin and translucent. Nothing else is reset.
