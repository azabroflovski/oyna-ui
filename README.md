# Oyna UI

> Status: early. The API may still change between 0.x versions.

A Vue 3 component library with a dark glass look: translucent surfaces over a rich background,
no borders, light used as a signal, condensed display type for numbers and headings.

_Oyna_ is Uzbek for "glass" — and for "window" and "mirror".

## Why it exists

I was building [invoke.wtf](https://invoke.wtf), a trainer for Invoker from Dota 2, and wanted a UI
kit that looked the way I had in mind: dark glass over a rich background, no grey borders, light
instead of lines. I did not find one — most Vue UI kits look like admin panels — so I drew the
interface by hand.

Oyna UI is that look taken out of the project and made into a library. I made it for myself. If it
suits your project, use it too.

It is for interfaces that want character: dashboards, tools, landing pages, side projects.

## What you get

- **No Tailwind, no UnoCSS.** One plain stylesheet, 4.5 kB gzipped. Import it and you are done:
  nothing to configure, no build plugin, no class scanning.
- **27 components**, each with a docs page and a live example.
- **Themable with CSS variables.** Change the accent, the radius or the fonts on `:root`, or on any
  part of the page.
- **Hotkeys built in.** A button or a toggle shows its key and reacts to it. Keys are read by their
  position, so they work on any keyboard layout, and they stay quiet while the user types.
- **A background out of the box.** Generated in CSS: no image files to ship.
- **Accessible layers.** Dialog, Popover, Menu, Select, Tabs and Tooltip stand on [Reka UI](https://reka-ui.com),
  the only runtime dependency: focus, keyboard and screen readers are handled.
- **Tree-shakable and typed.** ESM, one file per component, TypeScript types included.
- **Reduced motion respected.** One variable turns every transition off.

## The look

- **Glass, not boxes.** A card is a translucent dark fill over the background. No neutral borders.
- **A ring is a signal.** An outline appears only when it means something: the main thing on the
  screen (accent) or something at stake (danger). Never decoration.
- **Two typefaces.** A condensed display face for numbers and headings, a plain sans for text.
- **One accent.** A single bright accent on a dark stage; everything else stays quiet.
- **Light, not motion.** Feedback under 300 ms, no bouncing. `prefers-reduced-motion` turns it off.
- **Keyboard first.** A button can show and own its hotkey; dialogs and layers close in order on Esc.

## Usage

```bash
bun add oyna
```

```ts
import oyna from 'oyna'
import { createApp } from 'vue'
import 'oyna/style.css'

createApp(App).use(oyna).mount('#app')
```

```vue
<template>
  <OCard>
    <OButton hotkey="Enter" @click="save"> Save </OButton>
  </OCard>
</template>
```

Theme with CSS variables:

```css
:root {
  --o-accent: #a5ff4d;
  --o-danger: #ff8a8a;
  --o-surface: rgb(0 0 0 / 0.3);
  --o-radius: 14px;
}
```

## Roadmap

- [x] Tokens, the base stylesheet and the default background.
- [x] First components: Surface / Card, Button, Kbd, Input / Field, Toggle, Tabs, Dialog, Stat, Progress, Badge.
- [x] Docs site built with the library itself, with live examples.
- [x] More components: Select, Tooltip, Toast, KeyCapture, Pips, Sparkline, BarChart, Table.
- [x] Form controls and layers: Checkbox, Radio, Switch, Textarea, Menu, Popover.
- [x] Example screens: a dashboard and a settings page.
- [ ] Nuxt module.
- [ ] First public release.

## Development

```bash
bun install
bun run dev        # playground
bun run docs:dev   # docs site
bun run fmt        # format with oxfmt
bun run lint && bun run typecheck && bun run test && bun run build
```

`typecheck` needs Node on your `PATH`; the rest runs on Bun alone.

See [AGENTS.md](./AGENTS.md) for the structure, conventions and open decisions.

## License

MIT (planned).
