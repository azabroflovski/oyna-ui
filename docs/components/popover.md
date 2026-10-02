<script setup>
import { CircleHelp } from '@lucide/vue'
import { toast } from 'oyna-ui'
import { ref } from 'vue'

const onlyErrors = ref(false)
const slow = ref(true)
const cacheCleared = ref(false)

function clearCache(close) {
  close()
  cacheCleared.value = true
  toast('Cache cleared', { tone: 'accent' })
}
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
    <OButton icon shape="pill" aria-label="What is this?"><CircleHelp /></OButton>
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

## Popover, tooltip, dialog or dropdown menu

- **[Tooltip](/components/tooltip)** — one line, on hover, nothing to click.
- **[DropdownMenu](/components/dropdown-menu)** — a list of actions.
- **Popover** — anything else that is small and belongs to one place on the page.
- **[Dialog](/components/dialog)** — something that needs the whole of the user's attention.

## Confirming an action

There is no separate "popconfirm" component: a popover with a line of text and two buttons is one. Give the confirming button `hotkey="Enter"`, so the question can be answered without the mouse; <OKbd>Esc</OKbd> is the "no".

<Demo>
  <OPopover align="center">
    <OButton>Clear the cache</OButton>
    <template #content="{ close }">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <span>Clear the cache of <b>public-api</b>? The next requests will be slower until it fills again.</span>
        <div style="display: flex; justify-content: flex-end; gap: 8px">
          <OButton size="sm" variant="ghost" @click="close">Keep it</OButton>
          <OButton size="sm" variant="primary" hotkey="Enter" @click="clearCache(close)">Clear</OButton>
        </div>
      </div>
    </template>
  </OPopover>
</Demo>

```vue
<OPopover align="center">
  <OButton>Clear the cache</OButton>

  <template #content="{ close }">
    <span>Clear the cache of <b>public-api</b>? The next requests will be slower until it fills again.</span>
    <OButton size="sm" variant="ghost" @click="close">Keep it</OButton>
    <OButton size="sm" variant="primary" hotkey="Enter" @click="clearCache(close)">Clear</OButton>
  </template>
</OPopover>
```

Keep this for small things that can be done again or undone. Something that cannot be taken back — deleting a project, revoking a token — deserves a [dialog](/components/dialog): it has room to say what will be lost, and it cannot be dismissed by a stray click.

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
