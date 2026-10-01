# Button

An action. One accent button per screen is the main thing; the rest stay quiet. A button can display its hotkey and own it.

<Demo>
  <OButton variant="primary" size="lg" hotkey="Enter">Save changes</OButton>
  <OButton size="lg">Cancel</OButton>
</Demo>

```vue
<OButton variant="primary" size="lg" hotkey="Enter" @click="save">
  Save changes
</OButton>

<OButton size="lg" @click="cancel">
  Cancel
</OButton>
```

## Variants

Five levels of weight. Use `primary` once per screen.

<Demo>
  <OButton variant="primary">Primary</OButton>
  <OButton>Secondary</OButton>
  <OButton variant="soft">Soft</OButton>
  <OButton variant="ghost">Ghost</OButton>
  <OButton variant="link">Link →</OButton>
</Demo>

```vue
<OButton variant="primary">
Primary
</OButton>

<OButton>
Secondary
</OButton>

<OButton variant="soft">
Soft
</OButton>

<OButton variant="ghost">
Ghost
</OButton>

<OButton variant="link">
Link →
</OButton>
```

## Sizes and shapes

Three sizes, a pill shape for navigation, and an icon-only button. Give an icon-only button an `aria-label`.

<Demo>
  <OButton size="sm">Small</OButton>
  <OButton>Medium</OButton>
  <OButton size="lg">Large</OButton>
  <OButton shape="pill">Pill</OButton>
  <OButton icon shape="pill" aria-label="Help">?</OButton>
</Demo>

```vue
<OButton size="sm">
Small
</OButton>

<OButton>
Medium
</OButton>

<OButton size="lg">
Large
</OButton>

<OButton shape="pill">
Pill
</OButton>

<OButton icon shape="pill" aria-label="Help">
?
</OButton>
```

## Link and current page

With `href` the button renders a link. `aria-current` marks the current page in a navigation, as in the header of this site.

<Demo>
  <OButton shape="pill" href="#link-and-current-page">Guide</OButton>
  <OButton shape="pill" href="#link-and-current-page" aria-current="page">Components</OButton>
</Demo>

```vue
<OButton shape="pill" href="/guide">
Guide
</OButton>

<OButton shape="pill" href="/components" aria-current="page">
Components
</OButton>
```

## Hotkey

Pass a physical key code: the button shows the key and reacts to it on any keyboard layout. See [Hotkeys](/guide/hotkeys) for when a key is ignored.

<Demo>
  <OButton variant="soft" hotkey="KeyR">Retry</OButton>
  <OButton hotkey="Escape">Close</OButton>
  <OButton hotkey="KeyS" hotkey-label="S · save">Custom label</OButton>
</Demo>

```vue
<OButton variant="soft" hotkey="KeyR" @click="retry">
Retry
</OButton>

<OButton hotkey="Escape" @click="close">
Close
</OButton>

<OButton hotkey="KeyS" hotkey-label="S · save">
Custom label
</OButton>
```

## Disabled

A disabled button does not react to its hotkey either.

<Demo>
  <OButton disabled>Disabled</OButton>
  <OButton variant="primary" disabled>Disabled</OButton>
</Demo>

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'ghost' \| 'link'` | `'secondary'` | Visual weight |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `shape` | `'rounded' \| 'pill'` | `'rounded'` | Pill for navigation and chips |
| `icon` | `boolean` | `false` | A square (or round, with `pill`) button holding only an icon |
| `hotkey` | `string` | — | Physical key (`KeyboardEvent.code`) that clicks the button; shown inside it |
| `hotkeyLabel` | `string` | from `hotkey` | Text shown for the key |
| `disabled` | `boolean` | `false` | Also turns the hotkey off |
| `href` | `string` | — | Renders a link instead of a button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Set `submit` inside a form |
