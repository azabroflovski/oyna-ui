<script setup>
import { ref } from 'vue'

const onlyErrors = ref(false)
const slow = ref(true)
</script>

# Popover

A small panel that opens from a button and can hold anything: a few filters, a short form, an explanation. A click outside or <OKbd>Esc</OKbd> closes it.

<Demo>
  <OPopover>
    <OButton>Filters</OButton>
    <template #content="{ close }">
      <div style="display: flex; flex-direction: column; gap: 14px">
        <OSwitch v-model="onlyErrors">Only errors</OSwitch>
        <OSwitch v-model="slow">Slower than 1 s</OSwitch>
        <OButton variant="primary" hotkey="Enter" @click="close">Apply</OButton>
      </div>
    </template>
  </OPopover>
  <OPopover side="top" align="center">
    <OButton icon shape="pill" aria-label="What is this?">?</OButton>
    <template #content>
      p95 is the time within which 95 % of requests finished.
    </template>
  </OPopover>
</Demo>

```vue
<OPopover>
  <OButton>Filters</OButton>

  <template #content="{ close }">
    <OSwitch v-model="onlyErrors">Only errors</OSwitch>
    <OSwitch v-model="slow">Slower than 1 s</OSwitch>
    <OButton variant="primary" hotkey="Enter" @click="close">Apply</OButton>
  </template>
</OPopover>
```

The default slot takes exactly one element that can receive focus; it becomes the trigger. The `content` slot gets a `close` function.

## Popover, tooltip, dialog or menu

- **[Tooltip](/components/tooltip)** — one line, on hover, nothing to click.
- **[Menu](/components/menu)** — a list of actions.
- **Popover** — anything else that is small and belongs to one place on the page.
- **[Dialog](/components/dialog)** — something that needs the whole of the user's attention.

## Hotkeys and width

Hotkeys of controls inside an open popover work; the ones behind it are off, as with a dialog.

The panel is `280px` wide; set `--o-popover-width` on an element around it, or on `:root`, to change it.

## Props

| Prop           | Type                                     | Default    | Description                                       |
| -------------- | ---------------------------------------- | ---------- | ------------------------------------------------- |
| `v-model:open` | `boolean`                                | `false`    |                                                   |
| `side`         | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Flips when there is no room                       |
| `align`        | `'start' \| 'center' \| 'end'`           | `'start'`  | Which edge of the trigger the panel lines up with |

Built on [Reka UI](https://reka-ui.com) Popover.
