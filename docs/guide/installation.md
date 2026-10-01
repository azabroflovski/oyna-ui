# Installation

Oyna UI is not published yet. This page describes how it will be used once it is.

## Install

```bash
bun add oyna
```

`vue` 3.5 or newer is a peer dependency.

## Register

Import the stylesheet once and register the components:

```ts
import oyna from 'oyna'
import { createApp } from 'vue'
import App from './App.vue'
import 'oyna/style.css'

createApp(App).use(oyna).mount('#app')
```

Or import only what you use; the rest is left out of your bundle:

```vue
<script setup lang="ts">
import { OButton, OCard } from 'oyna'
</script>
```

The stylesheet is plain CSS. You need neither Tailwind nor UnoCSS.

## Fonts

The library sets font variables and does not bundle font files. Load these families yourself, with
every weight listed: a missing weight is synthesized by the browser and looks lighter.

| Family | Weights | Used for |
| --- | --- | --- |
| Noto Sans | 400, 600, 700 | text |
| Barlow Condensed | 700, 800 | numbers and headings |
| Fira Sans Condensed | 700, 800 | Cyrillic numbers and headings |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Fira+Sans+Condensed:wght@700;800&family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

## Background

The glass needs something behind it. Put [`OBackground`](/components/background) at the top of your app:

```vue
<template>
  <OBackground />
  <RouterView />
</template>
```

## Dependencies

Tabs, Dialog, Select and Tooltip are built on [Reka UI](https://reka-ui.com), which handles focus and accessibility. It is installed with the library; you don't set it up.

## What the stylesheet does to the page

Besides the components, `style.css` sets on `body` a zero margin, the text font, white text and the
dark background colour, and makes scrollbars thin and translucent. Nothing else is reset.
