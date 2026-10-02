# Hotkeys

Hotkeys are read from the physical key (`KeyboardEvent.code`), not from the character it types. `KeyR` is the same key on a QWERTY, an AZERTY and a Russian layout.

A hotkey is ignored:

- while the user types in an `input`, a `textarea`, a `select` or an editable element (a checkbox, a radio and a switch count: Space belongs to them);
- with Ctrl, Cmd or Alt held, so browser shortcuts keep working;
- on key repeat, when the key is held down;
- for `Enter` and `Space`, when a button or a link has focus: that element handles the key itself.

The numpad Enter counts as `Enter`.

While a [dialog](/components/dialog) or a [popover](/components/popover) is open, only the hotkeys set up inside it work. While a [select](/components/select) or a [dropdown menu](/components/dropdown-menu) is open, or a [key capture](/components/key-capture) waits for a key, none do.

## On a button

The simplest way: [`OButton`](/components/button) and [`OToggle`](/components/toggle) take a `hotkey`, show it and react to it.

<Demo>
  <OButton variant="soft" hotkey="KeyR">Retry</OButton>
  <input placeholder="Typing here is safe">
</Demo>

```vue
<OButton variant="soft" hotkey="KeyR" @click="retry">
  Retry
</OButton>
```

## useHotkey

For anything that is not a button. The listener lives as long as the component.

```vue
<script setup lang="ts">
import { useHotkey } from 'oyna-ui'
import { ref } from 'vue'

const muted = ref(false)
const open = ref(true)

useHotkey('KeyM', () => (muted.value = !muted.value))
// the key can be reactive, and the hotkey can be switched off
useHotkey('Escape', () => (open.value = false), { enabled: () => open.value })
</script>
```

| Argument          | Type                                    | Description                                              |
| ----------------- | --------------------------------------- | -------------------------------------------------------- |
| `code`            | `MaybeRefOrGetter<string \| undefined>` | Physical key, e.g. `KeyR`, `Digit1`, `Enter`, `Escape`   |
| `handler`         | `(event: KeyboardEvent) => void`        | Called on the key press; the default action is prevented |
| `options.enabled` | `MaybeRefOrGetter<boolean>`             | `false` switches the hotkey off                          |

## hotkeyLabel

`hotkeyLabel(code)` returns what to print for a key: `KeyR` → `R`, `Digit1` → `1`, `Escape` → `Esc`, `ArrowUp` → `↑`, `Slash` → `/`.

The label names the key's position on a QWERTY keyboard. On another layout the same key may carry another letter; pass your own text where that matters.

## On a touch screen

A phone has no keys to show. Where the main pointer is a finger (`pointer: coarse`), Button, Toggle
and the dialog's close button hide their key; the hotkey itself stays registered, so a tablet with a
keyboard attached still reacts to it.

The same media query makes the library easier to hit: small buttons, the crosses of Alert and Tag,
checkboxes, radios and switches get a target of about 44px without changing their shape, segmented
tabs grow taller, and fields use 16px text, so iOS does not zoom the page on focus.
