# Kbd

A key. It looks like a key cap: a face lit from above, standing on a dark lip.

<Demo>
  <p>Press <OKbd>Esc</OKbd> to close, <OKbd>⌘</OKbd> <OKbd>K</OKbd> to search.</p>
  <OKbd variant="cap">Q</OKbd>
  <OKbd variant="cap">W</OKbd>
  <OKbd variant="cap">E</OKbd>
  <OKbd variant="cap">Shift</OKbd>
</Demo>

```vue
<p>Press <OKbd>Esc</OKbd> to close, <OKbd>⌘</OKbd> <OKbd>K</OKbd> to search.</p>

<OKbd variant="cap">Q</OKbd>
<OKbd variant="cap">W</OKbd>
<OKbd variant="cap">E</OKbd>
<OKbd variant="cap">Shift</OKbd>
```

- `key`, the default — a small cap inside a sentence. It is sized by the text around it.
- `cap` — a large cap on its own, in display type: a list of bindings, a tutorial.
- `outline` — a flat key for inside a control, where a cap has no room. It takes the colour of the text around it.

## Lights up when pressed

Give a key its physical `code` and it lights up for as long as that key is held. Try <OKbd code="KeyQ">Q</OKbd>, <OKbd code="KeyW">W</OKbd>, <OKbd code="KeyE">E</OKbd> or <OKbd code="Space">Space</OKbd> right here:

<Demo>
  <OKbd variant="cap" code="KeyQ">Q</OKbd>
  <OKbd variant="cap" code="KeyW">W</OKbd>
  <OKbd variant="cap" code="KeyE">E</OKbd>
  <OKbd variant="cap" code="Space">Space</OKbd>
</Demo>

```vue
<OKbd variant="cap" code="KeyQ">Q</OKbd>
<OKbd variant="cap" code="KeyW">W</OKbd>
<OKbd variant="cap" code="KeyE">E</OKbd>
<OKbd variant="cap" code="Space">Space</OKbd>
```

The cap does not sink or move: the library answers with light. The `code` is the key's position on the keyboard (`KeyboardEvent.code`), as for a [hotkey](/guide/hotkeys), so it works on any layout. Without a `code`, a key is just a picture of a key.

This makes a hint under a screen confirm itself: the user presses the key and sees it was the right one.

## In a control

<Demo>
  <span style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px; background: var(--o-fill-2); font-size: 14px">Sound <OKbd variant="outline">M</OKbd></span>
</Demo>

```vue
<OKbd variant="outline">M</OKbd>
```

You rarely need it yourself: a [button](/components/button#hotkey) and a [toggle](/components/toggle) draw the key of their own hotkey.

## Props

| Prop      | Type                          | Default | Description                                                             |
| --------- | ----------------------------- | ------- | ----------------------------------------------------------------------- |
| `variant` | `'key' \| 'cap' \| 'outline'` | `'key'` |                                                                         |
| `code`    | `string`                      | —       | Physical key (`KeyboardEvent.code`); the cap lights up while it is held |
