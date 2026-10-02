# Changelog

## Unreleased

- **Breaking:** `OMenu` is now `ODropdownMenu`, its type `MenuItem` is `DropdownMenuItem`, and its
  classes are `.o-dropdown-menu…` instead of `.o-menu…`. Rename them in your code; nothing else about
  the component changed.
- Command: a palette of everything the app can do, opened with a key and searched by typing.
- Combobox: a choice from a long list, found by typing.
- Slider: a number picked by dragging.
- Avatar: a person as a picture or as initials.
- Drawer: a dialog standing at the right, the left or the bottom edge of the screen.
- Accordion: sections that open one under another, one at a time or several.
- Pagination: page numbers with arrows for a long list.
- ContextMenu: the items of a dropdown menu on a right click, or a long press on a touch screen.
- Table takes `row-menu`: the actions of a row, opened by a right click on it.
- Table takes `hoverable`: the row under the pointer is lit a little.
- Popover focuses its panel on open, not its first control, as Dialog does: Enter reaches the hotkey
  of the main button instead of pressing whatever comes first.
- Combobox inside a Field takes its label, hint and error from it.
- Hotkeys work while a checkbox, a radio or a switch has the focus: nobody types into those. Space
  and the arrow keys still belong to the control.
- Layers are glass too: dialog, drawer, popover, menu, select and combobox lists, tooltip and toast
  blur the page under them (`--o-layer-blur`, 16px) and `--o-layer` is more see-through (0.8, was
  0.97). The page behind a dialog is blurred more (8px, was 4px).

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
