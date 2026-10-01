# Kbd

A key. Three looks for three places.

<Demo>
  <p><OKbd>Esc</OKbd> to close</p>
  <OKbd variant="outline">M</OKbd>
  <OKbd variant="cap">Q</OKbd>
  <OKbd variant="cap">W</OKbd>
  <OKbd variant="cap">E</OKbd>
</Demo>

```vue
<p>
<OKbd>Esc</OKbd> to close
</p>

<OKbd variant="outline">
M
</OKbd>

<OKbd variant="cap">
Q
</OKbd>
```

- `plain` — bold text inside a sentence.
- `outline` — a key inside a control, such as a chip. The edge takes the colour of the text around it.
- `cap` — a key cap on its own, in display type: a list of bindings, a tutorial.

A key shown by a [button's hotkey](/components/button#hotkey) is drawn by the button itself.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'plain' \| 'outline' \| 'cap'` | `'plain'` | |
