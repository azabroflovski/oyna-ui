# AGENTS.md

Guide for AI coding agents working in this repo. Keep it up to date when the structure or conventions change.

## What this is

**oyna** — an open-source Vue 3 UI component library with a dark glass look, good docs and examples.
General purpose: not tied to any product, not an admin-panel kit.

State on 2026-10-01: both planned waves are built and documented — tokens, base stylesheet,
`useHotkey` and 21 components (see `src/index.ts`). Nothing is published, and `package.json` is
`private` until the first release. *Oyna* is Uzbek for "glass". The npm name `oyna` was free that
day but is NOT registered yet — take it before the first public mention. `oyna` is taken on GitHub:
the owner is choosing the repository name.

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

The style was first built in the owner's private project at `~/invoker-game` (Nuxt 4 + UnoCSS). Use it
as a visual reference when porting: `uno.config.ts` (tokens, the `surface` / `card` shortcuts),
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
- ESLint + `@antfu/eslint-config` (no Prettier): 2 spaces, single quotes, no semicolons.
- TypeScript, `<script setup lang="ts">`.

Layout (one package until a second is really needed):

```
src/
  components/<Name>/<Name>.vue   one folder per component, with its test; styles in the SFC's <style>
  composables/                   useHotkey; layers.ts (which hotkeys work while a layer is open)
  styles/                        tokens.css, base.css
  index.ts                       plugin + named exports
docs/                            VitePress site with its own theme (.vitepress/theme), built from src/
playground/                      Vite app for developing components
planning/                        inventory.md, mockup.html: what was agreed before building
```

## Commands

- `bun run dev` — playground. `bun run docs:dev` — docs site.
- `bun run lint`, `bun run typecheck`, `bun run test`, `bun run build`, `bun run docs:build` — what CI runs.
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
- Reka UI is a runtime dependency (Tabs, Dialog, Select, Tooltip) and is external in the build. It
  closes layers in order on Esc, so there is no `useEscStack`. What the library adds is
  `useLayer(open)` in `composables/layers.ts`: while a dialog or a select is open, `useHotkey` fires
  only for components inside the top layer. Any future modal layer must call it too.
- Toast is not Reka: a module-level list (`toast()`) shown by one `OToaster`.
- `OKeyCapture` takes its key press in the capture phase and stops it, so no hotkey sees it.
- The closed `OSelect` takes its label from `items`: Reka does not render the options while closed.
- A dialog focuses itself on open, not its first control, so Enter reaches the hotkey of its main button.
- No comment before the root element of a component template: it makes the template a fragment in
  development, and `class` / attributes stop falling through.
- The component count and the stylesheet size are quoted in README.md ("What you get") and on the
  docs home (`facts` in `Home.vue`). Refresh both when a component is added and before a release.
- In docs pages a live example is `<Demo>…</Demo>` followed by the code block showing the same markup.

Component prefix: `O` (`<OButton>`, `<OCard>`). CSS variable prefix: `--o-`.

## Open decisions (the owner's to make)

- npm package (proposed) vs a shadcn-style copy-in registry.
- Package name `oyna` (current) vs `@oyna/ui`, if more packages are likely (`@oyna/nuxt`); the
  `@oyna` scope has not been checked.
- GitHub repository name: `oyna` is taken there.
- Light theme: none planned; decide whether the tokens should allow one.
- Mobile: the source style is desktop-first; decide how far components must adapt.
- License: MIT proposed.

## Next steps

Done: inventory and mockup (`planning/`), scaffold, foundation, both waves of components, docs site.
The owner said to go on after seeing the inventory and the mockup but has not commented on their
details, so the component list and the scales in `planning/inventory.md` are working assumptions.

1. Owner's review of the look in a real browser: hotkeys, dialog, select, tooltip, toast and narrow
   screens were checked by tests and screenshots only, never by hand.
2. Icons: decide how Lucide icons reach a component (a slot is enough so far).
3. Register the npm and GitHub names; drop `private` from `package.json`; first release.
4. Nuxt module. Full example screens in the docs.

## Conventions

- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`. No `Co-Authored-By` trailers.
- Plain, pragmatic code: no abstractions before a second use.
- Code, commits, README and docs in English. Talk to the owner in Russian.
- Every component ships with a docs page and an example; a component without docs isn't done.
- Don't publish to npm or push to a public remote without the owner's say-so.
