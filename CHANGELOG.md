# Changelog

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
