# Changelog

## Unreleased

- `OSelect` works inside `OField`, as `OInput` and `OCombobox` do: the field's label points at it,
  its hint and error are tied to it, and an error gives it the danger ring. In the field's column it
  keeps its own width.
- `OSelect` and `OCombobox` take `invalid`, the danger ring without a field, like `OInput`.
- Docs: a [Forms](https://oyna-ui.org/guide/forms) page, with a form in plain Vue, the same form
  with VeeValidate and Zod, and errors that come from the server.

## 0.2.0

Eight new components, glass layers, and one rename.

**Breaking**

- `OMenu` is now `ODropdownMenu`, its type `MenuItem` is `DropdownMenuItem`, and its classes are
  `.o-dropdown-menu…` instead of `.o-menu…`. Rename them in your code; nothing else about the
  component changed.
- `--o-layer` is more see-through (0.8, was 0.97): see "Layers are glass too" below. If you set this
  variable yourself, your value still wins.

**New components**

- Command: a palette of everything the app can do, opened with a key and searched by typing. It can
  also front a search of your own (`:filter="false"` with `v-model:query`); an item may have a
  `description`, and there is a `footer` slot.
- Combobox: a choice from a long list, found by typing. Inside a Field it takes its label, hint and
  error from it.
- Slider: a number picked by dragging.
- Avatar: a person as a picture or as initials.
- Drawer: a dialog standing at the right, the left or the bottom edge of the screen.
- Accordion: sections that open one under another, one at a time or several.
- Pagination: page numbers with arrows for a long list.
- ContextMenu: the items of a dropdown menu on a right click, or a long press on a touch screen.

**Changes**

- Layers are glass too: dialog, drawer, popover, menu, select and combobox lists, tooltip and toast
  blur the page under them (`--o-layer-blur`, 16px). The page behind a dialog is blurred more (8px,
  was 4px).
- Table takes `row-menu`: the actions of a row, opened by a right click on it.
- Table takes `hoverable`: the row under the pointer is lit a little.
- Popover focuses its panel on open, not its first control, as Dialog does: Enter reaches the hotkey
  of the main button instead of pressing whatever comes first.
- Hotkeys work while a checkbox, a radio or a switch has the focus: nobody types into those. Space
  and the arrow keys still belong to the control.
- The tokens as utilities for projects that use Tailwind 4 (`oyna-ui/tailwind.css`) or UnoCSS
  (`presetOyna` from `oyna-ui/unocss`): `bg-o-surface`, `text-o-text-2`, `rounded-o`, `font-o-display`.
  The library itself still needs neither.

## 0.1.1

- Touch screens (`pointer: coarse`): key hints on Button, Toggle and the dialog's close button are
  hidden; small buttons, the crosses of Alert and Tag, checkboxes, radios and switches get a target
  of about 44px without changing their shape; segmented tabs are taller; fields use 16px text, so
  iOS does not zoom the page on focus.
- Popover, Menu, Select and Tooltip stay 8px off the edge of the screen.

## 0.1.0

The first release.

- Tokens, the base stylesheet and the generated background.
- `oyna-ui/fonts.css`, a one-line import of the web fonts; without them the font variables fall back to
  system faces.
- Hotkeys read from physical keys: `useHotkey`, and the `hotkey` prop of Button and Toggle.
- Components: Alert, Background, Surface, Card, Button, Kbd, Badge, Tag, Input, Textarea, PinInput, Field, Checkbox,
  Radio, Switch, Toggle, Tabs, Select, KeyCapture, Dialog, Popover, Menu, Tooltip, Toaster, Spinner,
  Skeleton, Empty, Stat, Progress, Pips, Sparkline, BarChart, Table, Timeline.
