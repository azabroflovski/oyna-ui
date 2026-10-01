# Inventory of the reference project

Step 1 of the plan in AGENTS.md: what in `~/invoker-game` (41 components, `uno.config.ts`, `app.vue`,
`useInput.ts`) becomes part of oyna. Status: **proposal, waiting for the owner**.

Main finding: only a handful of reference components are reusable as files. Most of the library has
to be *extracted* from markup that is repeated inline across the screens (buttons alone are written
out by hand ~60 times in 5 visual variants).

## 1. Ports almost as is

| Reference | oyna | What changes |
| --- | --- | --- |
| `ToggleChip` | `OToggle` | `v-model` instead of `on` + `toggle`; owns its hotkey instead of only showing it |
| `Sparkline` | `OSparkline` | generic `values`, colours from `--o-*`, "higher is better" as a prop |
| `LimitBar` | `OProgress` | `value` / `max`, `danger-below` threshold as a prop, width from the parent |
| `uno.config.ts` tokens | `tokens.css` | `accent`, `miss` → `danger`, fonts, `surface`, `card`; orb colours stay behind |
| `app.vue` base rules | `base.css` | scrollbars, `kbd` font, reduced-motion rule, `button` cursor |

## 2. Ports after removing product logic

| Reference | oyna | What stays behind |
| --- | --- | --- |
| `SettingsDialog` (the shell) | `ODialog` on Reka UI | the settings content; keeps overlay, title in display type, `Esc` close hint |
| `LangSwitch` | `OSelect` on Reka UI | i18n and routing; keeps trigger pill, popup, separator, option with a dim suffix |
| `NicknameForm` | `OInput` + `OField` | nickname rules; keeps the input, the hint that turns into an error, input + button row |
| `SummaryChips` | `OStat` (+ a grid) | durations and profile data; keeps the label / display-number tile |
| `ProgressPips` | `OPips` | "ghost" wording; keeps steps + an optional marker with a caption |
| `SplitsChart` | `OBarChart` | spell icons, `Split` type; keeps bars, highlighted worst bar, dot marker, dense mode |
| `SeasonBadges` | `OBadge` | medals and seasons; keeps the pill with a leading icon |
| `BestsTable`, leaderboard rows | `OTable` / `SList` | game data; keeps striped rows, display-type numbers, the "you" row with an accent ring |
| `KeyBindings` | `OKeyCapture` | ability images; keeps "click, then press a key to rebind" |
| `AppHeader` | docs example, not a component | brand, pages; the nav pill is just `OButton` with `shape="pill"` |
| `useInput.ts` | `useHotkey`, `useEscStack` | game actions, the anti-cheat `isTrusted` check; keeps `code`-based matching, ignoring editable targets, modifiers and key repeat |
| toast in `Game.vue` | `OToast` | — (later) |

## 3. Extracted from repeated inline markup (no component in the reference)

- **`OButton`** — five variants seen in the screens:
  `primary` (accent fill, dark text, `hover:brightness`), `secondary` (white 8–12 %),
  `soft` (accent 15 % fill, accent text), `ghost` (dim text only), `link` (accent text, 13 px).
  Sizes `sm` / `md` / `lg`; `shape="pill"`; icon-only; a `hotkey` prop that renders the key and binds it.
- **`OKbd`** — three looks: inline bold (`Esc` in a sentence), outlined (inside a toggle), key cap
  (filled, 1 px edge, display type).
- **`OSurface` / `OCard`** — `surface` fill, `strong` fill, and the two signal states:
  `signal="accent"` (accent 7 % fill + 2 px inset ring) and `signal="danger"`.
- **`OTabs`** — two looks: `segmented` (pills in a dark track; also used as a radio group) and
  `underline` (page sections). Reka UI underneath.
- **`SLabel`** — the uppercase, tracked, 50 % white section caption that appears on every card.
- **`OBackground`** — the reference uses a third-party image (`bg.png`), which cannot come over.
  Generated instead: colour gradients + noise + the vignette from `#app`.

## 4. Stays in the reference project

Screens and game pieces: `Game`, `StartScreen`, `RunScreen`, `ResultScreen`, `MobileScreen`,
`LeaderboardPage`, `MePage`, `PlayerPage`, `HomeFeed`, `HistorySection`, `AbilityBar`, `OrbRow`,
`ComboTrack`, `HintsPanel`, `DuelCard`, `MyDuels`, `ConfusionList`, `ProgressCard`,
`Achievement*`, `AlmostAchievements`, `SubmissionStatus`, `AccountBar`, `ProfileSettings`,
`SignInButtons`, `TelegramLogin`, `BrandBar`. Every composable except `useInput`.
All images, icons and sounds in `public/`.

## Proposed first release (v0.1)

Foundation: tokens, base stylesheet, `OBackground`, `useHotkey`, `useEscStack`.
Components (10): `OSurface`/`OCard`, `OButton`, `OKbd`, `OInput` + `OField`, `OToggle`, `OTabs`,
`ODialog`, `OStat`, `OProgress`, `OBadge`.

Second wave: `OSelect`, `OTooltip`, `OPips`, `OSparkline`, `OBarChart`, `OTable`, `OToast`,
`OKeyCapture`.

## Inconsistencies in the reference to settle before porting

The reference grew screen by screen; the library needs one scale for each of these.

- **Radius.** Seen: 6, 8, 12, 14, 16, 24 px and full. AGENTS.md says cards are 14 px, yet most
  reference cards are 16 px. Proposal: `--o-radius-sm: 8px` (inputs, small buttons),
  `--o-radius: 14px` (cards, large buttons), `--o-radius-lg: 24px` (dialogs), `full` (pills).
- **White fills.** Seen: 3, 6, 7, 8, 10, 12, 14, 15, 16, 22 %. Proposal: four steps —
  `--o-fill-1: 4%` (stripes), `--o-fill-2: 8%` (controls), `--o-fill-3: 12%` (hover, active),
  `--o-fill-4: 22%` (bars).
- **Ring strength.** Accent ring at 35 %, 45 % and 100 %. Proposal: 45 % for a signalled card,
  100 % for the active item and focus.
- **Input edge.** Inputs use a 1 px ring (the allowed exception). Keep 1 px at rest, 2 px accent on focus.
- **Dialog.** The reference dialog is nearly opaque (`rgb(18 18 24 / 0.96)`), not glass. Proposal:
  keep it nearly opaque — a dialog over blurred glass over a busy background is hard to read.
- **Text on accent.** `#111` everywhere; make it a token (`--o-on-accent`).
