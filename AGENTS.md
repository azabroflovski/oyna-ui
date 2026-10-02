# AGENTS.md

Guide for AI coding agents working in this repo. Keep it up to date when the structure or conventions change.

## What this is

**Oyna UI** (npm package `oyna-ui`) — an open-source Vue 3 UI component library with a dark glass look, good docs and examples.
General purpose: not tied to any product, not an admin-panel kit.

State on 2026-10-02: both planned waves are built and documented — tokens, base stylesheet,
`useHotkey` and 38 components (see `src/index.ts`). `0.1.0` and `0.1.1` are on npm
(published by the owner on 2026-10-02, tags `v0.1.0`, `v0.1.1`; `npm publish` builds through `prepack` and stays the owner's to run). _Oyna_ is Uzbek for "glass". In prose the
library is always "Oyna UI" (the bare word is too common to search for); the short logo in the docs
header stays "OYNA". Names: the npm package is the unscoped `oyna-ui`, the same as the repository
and the site (the owner's choice on 2026-10-02: npm refuses the bare `oyna` as too similar to `opn`,
`ora` and `yn`). Vue only, so no `@oyna/vue`; the owner holds the npm organization `oyna`, kept for
later satellites such as `@oyna/nuxt`.
The repository is `github.com/azabroflovski/oyna-ui`, default branch `master`. Site: `oyna-ui.org`
(the owner chose `.org` over `.com` on 2026-10-02, to avoid a commercial association). The docs are
hosted on Cloudflare Workers as static assets (`wrangler.jsonc`), built from `master` by Cloudflare.

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
  Three ways to load them are offered (`oyna-ui/fonts.css`, a one-line import from Google Fonts;
  Fontsource packages; the consumer's own faces through the variables). Both variables end in system
  fonts, the display one in condensed system faces, so the look holds up without the web fonts.
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
Invoker from Dota 2. The owner wanted a UI kit with this look, found none, drew the interface by
hand, and then made the library out of it — for himself first, open for anyone who likes it.
README.md and `docs/guide/why.md` tell this story in his voice. In public text, say the look _comes
from_ invoke.wtf; never say that site is built with Oyna UI — it is not.

Only the visual language came over. Nothing product-specific did: no game terms, no game
components, and none of that project's images, icons or sounds. Its code is private and is not
described in this repository.

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
scripts/                         browser.ts (a small headless-Chrome driver), check.ts (see Commands),
                                 banner.html + banner.ts (the README banner, .github/banner.jpg)
```

## Commands

- `bun run dev` — playground. `bun run docs:dev` — docs site.
- `bun run fmt` formats everything; run it before committing.
- `bun run lint`, `bun run fmt:check`, `bun run typecheck`, `bun run test`, `bun run build`,
  `bun run docs:build` — what CI runs.
- `bun scripts/check.ts <folder> [base url]`, with `bun run docs:dev` running: opens every layer
  (select, menu, popover, tooltip, toasts, dialog, search), takes screenshots at desktop and at a real
  phone width, and runs axe-core on a set of pages. Look at the screenshots after any change to a
  layer or to the docs layout: unit tests do not show how things look. Not part of CI (needs Chrome).
- `bun run build && bun scripts/banner.ts` redraws the README banner from `scripts/banner.html`: static
  markup with the library's class names, styled by `dist/style.css`. Redo it when the look changes.
- To see the docs without web fonts, block them in a script: `page.block(['*fonts.googleapis.com*',
'*fonts.gstatic.com*'])` from `scripts/browser.ts`. Check this after touching the font variables.
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
- Reka UI is a runtime dependency (Tabs, Dialog, Select, Menu, Popover, Tooltip, PinInput, Combobox, Listbox under Command, Slider, Avatar) and is external in the build. It
  closes layers in order on Esc, so there is no `useEscStack`. What the library adds is
  `useLayer(open)` in `composables/layers.ts`: while a dialog (Command is one), a popover, a select, a combobox or a menu is open, `useHotkey` fires
  only for components inside the top layer. Any future modal layer must call it too.
- Checkbox, Radio and Switch are native inputs kept invisible over a drawn shape, not Reka: forms and
  the keyboard work for free. `useSplitAttrs` sends `class` / `style` to the label and the rest to
  the input.
- Everything that floats (dialog, popover, menu, select list, tooltip, toast) uses `--o-layer`.
- Touch (the owner's decision on 2026-10-02): the library adapts to a finger only inside
  `@media (pointer: coarse)`, at the end of each component's `<style>`; the desktop look does not
  change. There: key hints are hidden (the hotkey stays registered), a small control grows its
  target to about 44px with an invisible `::after` instead of changing shape (Tabs use padding: the
  list scrolls and would clip it), fields use 16px text (iOS zooms on anything smaller). Tooltip
  does not open on touch; the docs say so. `scripts/browser.ts` emulates a coarse pointer when
  `size()` is called with `mobile`.
- Icons: the library ships none. An `<svg>` in the slot of Button, Toggle or Badge is sized in `em`;
  a Menu item takes an icon component. The docs use `@lucide/vue` (a dev dependency only).
- Card has an optional header (`label`, `title`, an `actions` slot) and a `footer` slot; examples use
  them instead of hand-made header rows. Tag is for what the user applied (a filter, a label) and can
  be removed; Badge is for what the system says (a status). Tag has squarer corners to tell them apart.
- The owner said the component set is enough for now (2026-10-02): do not add components unasked.
  Later the same day he asked for four more: Command, Combobox, Slider, Avatar. Considered and left
  out: DatePicker (too costly), Divider (a neutral line), Breadcrumb / Stepper / Carousel (admin-panel
  territory); Drawer, Accordion and Pagination are the next candidates if he asks.
- Command is an `ODialog` holding a Reka Listbox; it filters by itself (every typed word must occur
  in the label, group or keywords) and keeps the first row lit, so Enter always runs something: Reka
  unlights a row when the pointer leaves the list, also when the row under it is filtered away. It
  has no opening key of its own. The docs Search is older and still hand-made, not an `OCommand`.
- Combobox's list reuses the select's classes (`o-select__list`, `o-select__option`); its field is
  an `o-input`. Slider's model is one number (Reka's is a list); `aria-label` goes to its thumb.
- A key looks like a key cap everywhere (`o-kbd`: a face lit from above on a dark lip); KeyCapture and
  the dialog's close button reuse that class. With a `code` an `OKbd` lights up while that physical
  key is held (`composables/pressedKeys.ts`, one listener for all). Hints under the docs screens pass
  the `code`, so pressing the key confirms the hint.
- A state change is either instant or one fade, never half of each. Switch has no transition at all:
  its thumb jumps sides, and colours fading under a thumb that has already jumped looked like a
  stutter (the owner noticed it).
- Loops (Spinner, Skeleton) are the one exception to "every transition uses `--o-duration`": each
  has its own `prefers-reduced-motion` rule that stops it. They pulse light; nothing rotates or slides.
- Contrast: text never goes below `--o-text-3` (white at 50 %), which stays above 4.5:1 even over
  the brightest glow of the default background; the edge of an empty checkbox or radio is white at
  40 %. axe-core cannot judge contrast over gradients, so this was worked out by hand: recheck it if
  the background or the text tokens change. Links in running text are underlined, not only coloured.
- Docs site: `layout: example` (full width, with the examples switch), `layout: wide` (full width,
  used by the theme editor at `/theme`), otherwise sidebar + content + page outline. On a phone the
  sidebar is hidden and Search (hotkey `/`) is the navigation: it finds pages by name and sections by their text, from an
  index built by `search.data.ts`. The link-preview
  Zoom is off on a phone (the owner's choice on 2026-10-02): the viewport tag in the config plus
  `touch-action` on `html`. axe-core reports it as `meta-viewport`; that finding is expected.
  A Markdown table is wrapped in `.table-scroll` (`markdown.config` in the config): on a phone a table
  of props scrolls inside its own box, and no page may scroll sideways at 390px.
  image `docs/public/og.png` is a screenshot of a hand-made HTML page; `site` in the config must be
  the real address of the docs.
- Toast is not Reka: a module-level list (`toast()`) shown by one `OToaster`.
- `OKeyCapture` takes its key press in the capture phase and stops it, so no hotkey sees it.
- The closed `OSelect` takes its label from `items`: Reka does not render the options while closed.
- A dialog focuses itself on open, not its first control, so Enter reaches the hotkey of its main button.
- No comment before the root element of a component template: it makes the template a fragment in
  development, and `class` / attributes stop falling through.
- The component count and the stylesheet size are quoted in README.md ("What you get") and on the
  docs home (`facts` in `Home.vue`, the "Nothing to set up" section). Refresh both when a component is added and before a release.
- Before a release: bump `version`, add a section to CHANGELOG.md, then `npm pack` and install the
  tarball in a fresh Vite project (typecheck + build) — the library is otherwise only tested from
  inside the repo. License: MIT (`LICENSE`).
- A release, in this order: push `master`; the owner runs `npm publish`; only then tag that commit
  `vX.Y.Z`, push the tag and create a GitHub Release with the version's CHANGELOG section as its
  notes (`gh release create`). The tag comes after a successful publish, so it never points at a
  commit that is not on npm. No publishing from CI for now.
- The panel on the docs home (`HomeDemo.vue`) is one small product screen, a deploy console, not a
  pile of unrelated components: pressing D runs a fake deploy through Button's loading state,
  Progress, Pips, a new Table row and a Toast. Sample content everywhere is from a developer's world
  (deploys, versions, endpoints); nothing from the game the look came from.
- An example screen (`docs/examples/`) may add layout and text styling only. If it needs to restyle
  a component, the component is missing something: fix the component. Building the dashboard this
  way found three gaps (Sparkline `tone`, Pips' empty marker space, wrapping numbers in Table).
- `oyna-ui` resolves to `src/index.ts` both in the docs build (Vite alias) and in typecheck
  (`paths` in tsconfig.json), so neither needs a built `dist`.
- Headless Chrome's window cannot go narrower than about 500px: a `--window-size=420` screenshot is
  a cropped 500px layout. `scripts/browser.ts` emulates a real phone width instead.
- The examples gallery (`ExamplesGallery.vue`, on `/examples/` and on the home page) shows a real
  screenshot of each example from `docs/public/examples/`. After changing an example's look, redraw
  them: `bun scripts/thumbs.ts <base url>` with the docs running. A new example needs an entry in
  the gallery, in `scripts/thumbs.ts`, in the sidebar's Examples group and in `scripts/check.ts`.
- Docs prose rules (`p`, `li`) are written with `:where(.content)` so they never beat a component's
  own styles: a `<p>` inside a component is not prose.
- A Table column's `key` need not be a field of the row (a column of actions drawn by its slot).
- Not every example is an emergency: most alerts in the examples are plain ones (unsaved changes,
  plan usage, where keys are stored). Danger is for the Incident screen and for real mistakes.
- An example lives in `docs/examples/<name>/` (a component plus its data file) with a page
  `docs/examples/<name>.md`. The page is the example and nothing else: no notes under it (the owner
  removed the "How it is built" sections) and no code inline: `<ExampleSource dir files>` adds a
  "View source" button (a dialog with a file list, the code of the chosen file, and a link to that
  file on GitHub) and a "GitHub" link to the folder. The repository URL and branch are `repo` and
  `branch` in `docs/.vitepress/config.ts`.
- Install commands for consumers are shown for npm, pnpm, yarn and bun (`::: code-group` in the
  docs, one block with a comment in README): the owner uses Bun, most users do not. Commands for
  working on this repository stay Bun only.
- In docs pages a live example is `<Demo>…</Demo>` followed by the code block showing the same markup.

Component prefix: `O` (`<OButton>`, `<OCard>`). CSS variable prefix: `--o-`.

## Open decisions (the owner's to make)

- npm package (proposed) vs a shadcn-style copy-in registry.
- Light theme: none planned; decide whether the tokens should allow one.

## Next steps

Done: the library (38 components), the docs site with four example screens and a theme editor, the
browser check. The owner has looked at the result in a browser. The scales in
`src/styles/tokens.css` (radii 8 / 14 / 24, four white fills) were proposed by the agent and never
discussed in detail; they remain the working choice.

The docs are live at `oyna-ui.org` and `0.1.1` is published. Nothing is queued: the owner keeps
polishing and decides what comes next.

Not planned (owner's call): a Nuxt module, a light theme, moving invoke.wtf to the library.

## Conventions

- Conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`. No `Co-Authored-By` trailers.
- Plain, pragmatic code: no abstractions before a second use.
- Code, commits, README and docs in English. Talk to the owner in Russian.
- Every component ships with a docs page and an example; a component without docs isn't done.
- Don't publish to npm or push to a public remote without the owner's say-so.
