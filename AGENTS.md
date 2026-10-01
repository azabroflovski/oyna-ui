# AGENTS.md

Guide for AI coding agents working in this repo. Keep it up to date when the structure or conventions change.

## What this is

**Oyna UI** (npm package `oyna`) — an open-source Vue 3 UI component library with a dark glass look, good docs and examples.
General purpose: not tied to any product, not an admin-panel kit.

State on 2026-10-01: both planned waves are built and documented — tokens, base stylesheet,
`useHotkey` and 30 components (see `src/index.ts`). The package is ready to publish
as `0.1.0` (`npm publish` builds it through `prepack`); publishing is the owner's to run. _Oyna_ is Uzbek for "glass". In prose the
library is always "Oyna UI" (the bare word is too common to search for); `oyna` is only the package
name, and the short logo in the docs header stays "OYNA". Names, decided by the owner on
2026-10-01: the npm package is the unscoped `oyna` (Vue only, so no `@oyna/vue`); the owner holds
the npm organization `oyna`, kept for later satellites such as `@oyna/nuxt`. Until the owner
publishes, the unscoped name is not held by anyone.
The repository is `github.com/azabroflovski/oyna-ui`, default branch `master`. Planned site: `oyna-ui.com`.

## Design language (the product — don't dilute it)

These rules are what makes the library recognisable. A component that breaks one needs the owner's say-so.

- **Surface.** A card is a translucent dark fill (`rgb(0 0 0 / 0.3)`, stronger `0.4`) over a rich
  background, radius 14px. No neutral borders. Text must stay readable over a busy background.
- **Ring = signal.** A 2px inset ring only when it means something: `accent` = the main thing / "you",
  `danger` = at stake. Exceptions: inputs, and the edges of keys and icons.
- **Colour.** One bright accent (`#a5ff4d`) and one danger (`#ff8a8a`) on a dark stage. Everything
  else is white at different opacities. Themable through CSS variables.
- **Type.** `display` (Barlow Condensed, with Fira Sans Condensed filling in Cyrillic) for numbers and
  headings; `sans` (Noto Sans) for text. The library sets font variables and does not bundle font
  files. Load every weight the components use: a missing weight is synthesized and looks lighter.
- **Motion.** Light, not movement: no scale or slide on routine changes. Feedback under ~300 ms.
  `prefers-reduced-motion` disables all of it.
- **Icons.** No emoji. Restrained line icons (Lucide).
- **Keyboard first.** Hotkeys are read from physical keys (`KeyboardEvent.code`), so they work on any
  layout. A button can display and own its hotkey. Layers close in order on Esc. Hotkeys are ignored
  while typing in inputs.
- **Background.** The glass needs something behind it. The library must ship a default background
  (generated: gradient / noise, no image files from elsewhere) so it looks right out of the box.

## Where the look comes from

The style was first built in the owner's project [invoke.wtf](https://invoke.wtf), a trainer for
Invoker from Dota 2 (Nuxt 4 + UnoCSS; a private repository, on the owner's machine at
`~/invoker-game`). The owner wanted a UI kit with this look, found none, drew the interface by hand,
and then made the library out of it — for himself first, open for anyone who likes it. README.md
and `docs/guide/why.md` tell this story in his voice. In public text, say the look _comes from_
invoke.wtf; never say that site is built with Oyna UI — it is not.

Use that project as a visual reference when porting: `uno.config.ts` (tokens, the `surface` / `card` shortcuts),
`app/app.vue` (reset, background, reduced-motion rule), `app/components/` (`ToggleChip`, `KeyBindings`,
`SettingsDialog`, `SummaryChips`, `ProgressPips`, `LimitBar`, `Sparkline`, `SplitsChart`, `AppHeader`),
`app/composables/useInput.ts` (physical-key handling).

Take the visual language only. Nothing product-specific comes over: no game terms, no game
components, and none of that project's images, icons or sounds (they are third-party assets).

## Stack

- **Vite** in library mode + `@vitejs/plugin-vue`; types from `vue-tsc` (`vite-plugin-dts`).
  ESM only, `vue` as a peer dependency, per-component entry points so imports tree-shake.
- **Styling: plain CSS with CSS variables** (`--o-*`) in the components, shipped as one `style.css`.
  Decided by the owner on 2026-10-01: no UnoCSS or Tailwind in the library, neither as a consumer
  requirement nor compiled at build time. Optional presets that expose the tokens to UnoCSS /
  Tailwind users can come later.
- **Reka UI** (headless) under Dialog, Tabs, Dropdown, Tooltip and the like: accessibility and focus
  handling are not rewritten here.
- **VitePress** for the docs, built with the library itself, with live examples.
- **Vitest** + `@vue/test-utils` for component tests.
- **Bun** as package manager and script runner.
- **oxlint** and **oxfmt** (Oxc, from the Vite team), not ESLint or Prettier; the owner's choice
  on 2026-10-02. Style: 2 spaces, single quotes, no semicolons, 120 columns, sorted imports
  (`.oxfmtrc.json`). Both are pinned to exact versions: oxfmt is before 1.0 and its output may
  change between versions. oxlint does not check Vue templates yet (a missing `key` in `v-for` goes
  unnoticed); `vue-tsc` still catches type errors there.
- TypeScript, `<script setup lang="ts">`.

Layout (one package until a second is really needed):

```
src/
  components/<Name>/<Name>.vue   one folder per component, with its test; styles in the SFC's <style>
  composables/                   useHotkey; layers.ts (which hotkeys work while a layer is open)
  styles/                        tokens.css, base.css
  index.ts                       plugin + named exports
docs/                            VitePress site with its own theme (.vitepress/theme), built from src/
  examples/                      full screens built only from library components (layout: example)
playground/                      Vite app for developing components
planning/                        inventory.md, mockup.html: what was agreed before building
```

## Commands

- `bun run dev` — playground. `bun run docs:dev` — docs site.
- `bun run fmt` formats everything; run it before committing.
- `bun run lint`, `bun run fmt:check`, `bun run typecheck`, `bun run test`, `bun run build`,
  `bun run docs:build` — what CI runs.
- `typecheck` needs Node on `PATH`: `vue-tsc` does not work under the Bun runtime (it patches `tsc`
  through `fs.readFileSync`, which Bun's module loader bypasses). Everything else runs on Bun alone.
- TypeScript stays on 6.x: `vue-tsc` does not support 7 yet.

## Rules the code follows

- Class names: `.s-<component>`, modifiers `.s-<component>--<value>`, parts `.s-<component>__<part>`.
  Styles are not scoped, so consumers can override them.
- Every transition uses `var(--o-duration)`; reduced motion sets it to `0ms`. Never hardcode a duration.
- Colours come from tokens; a tint of the accent or danger colour is `color-mix()` with the token, so
  a consumer's `--o-accent` reaches every shade.
- A new component is registered in three places in `src/index.ts` (import, `components`,
  `GlobalComponents`) and gets a page in `docs/components/` plus a sidebar entry in
  `docs/.vitepress/config.ts`.
- Reka UI is a runtime dependency (Tabs, Dialog, Select, Menu, Popover, Tooltip) and is external in the build. It
  closes layers in order on Esc, so there is no `useEscStack`. What the library adds is
  `useLayer(open)` in `composables/layers.ts`: while a dialog, a popover, a select or a menu is open, `useHotkey` fires
  only for components inside the top layer. Any future modal layer must call it too.
- Checkbox, Radio and Switch are native inputs kept invisible over a drawn shape, not Reka: forms and
  the keyboard work for free. `useSplitAttrs` sends `class` / `style` to the label and the rest to
  the input.
- Everything that floats (dialog, popover, menu, select list, tooltip, toast) uses `--o-layer`.
- Icons: the library ships none. An `<svg>` in the slot of Button, Toggle or Badge is sized in `em`;
  a Menu item takes an icon component. The docs use `@lucide/vue` (a dev dependency only).
- Loops (Spinner, Skeleton) are the one exception to "every transition uses `--o-duration`": each
  has its own `prefers-reduced-motion` rule that stops it. They pulse light; nothing rotates or slides.
- Toast is not Reka: a module-level list (`toast()`) shown by one `OToaster`.
- `OKeyCapture` takes its key press in the capture phase and stops it, so no hotkey sees it.
- The closed `OSelect` takes its label from `items`: Reka does not render the options while closed.
- A dialog focuses itself on open, not its first control, so Enter reaches the hotkey of its main button.
- No comment before the root element of a component template: it makes the template a fragment in
  development, and `class` / attributes stop falling through.
- The component count and the stylesheet size are quoted in README.md ("What you get") and on the
  docs home (`facts` in `Home.vue`). Refresh both when a component is added and before a release.
- Before a release: bump `version`, add a section to CHANGELOG.md, then `npm pack` and install the
  tarball in a fresh Vite project (typecheck + build) — the library is otherwise only tested from
  inside the repo. License: MIT (`LICENSE`).
- An example screen (`docs/examples/`) may add layout and text styling only. If it needs to restyle
  a component, the component is missing something: fix the component. Building the dashboard this
  way found three gaps (Sparkline `tone`, Pips' empty marker space, wrapping numbers in Table).
- `oyna` resolves to `src/index.ts` both in the docs build (Vite alias) and in typecheck
  (`paths` in tsconfig.json), so neither needs a built `dist`.
- Headless Chrome cannot go narrower than about 500px: a "phone" screenshot at 420px is a cropped
  500px layout, not a real one.
- An example lives in `docs/examples/<name>/` (a component plus its data file) with a page
  `docs/examples/<name>.md`. The page shows no code inline: `<ExampleSource dir files>` adds a
  "View source" button (a dialog with a file list, the code of the chosen file, and a link to that
  file on GitHub) and a "GitHub" link to the folder. The repository URL and branch are `repo` and
  `branch` in `docs/.vitepress/config.ts`.
- In docs pages a live example is `<Demo>…</Demo>` followed by the code block showing the same markup.

Component prefix: `O` (`<OButton>`, `<OCard>`). CSS variable prefix: `--o-`.

## Open decisions (the owner's to make)

- npm package (proposed) vs a shadcn-style copy-in registry.
- Light theme: none planned; decide whether the tokens should allow one.
- Mobile: the source style is desktop-first; decide how far components must adapt.

## Next steps

Done: inventory and mockup (`planning/`), scaffold, foundation, both waves of components, docs site.
The owner said to go on after seeing the inventory and the mockup but has not commented on their
details, so the component list and the scales in `planning/inventory.md` are working assumptions.

1. Owner's review of the look in a real browser: hotkeys, dialog, select, tooltip, toast and narrow
   screens were checked by tests and screenshots only, never by hand.
2. The owner publishes `0.1.0` to npm, picks the GitHub repository name and hosts the docs.
3. Docs polish: copy button on code, page outline, favicon and social image, search.
4. A browser test run that opens the layers (select, menu, popover, tooltip, toast, dialog): they
   have never been looked at, only unit-tested.
5. Nuxt module.

## Conventions

- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`. No `Co-Authored-By` trailers.
- Plain, pragmatic code: no abstractions before a second use.
- Code, commits, README and docs in English. Talk to the owner in Russian.
- Every component ships with a docs page and an example; a component without docs isn't done.
- Don't publish to npm or push to a public remote without the owner's say-so.
