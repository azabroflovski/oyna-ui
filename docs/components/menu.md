<script setup>
import { toast } from 'oyna'

const items = [
  { label: 'Rename', hint: 'F2', onSelect: () => toast('Rename') },
  { label: 'Duplicate', onSelect: () => toast('Duplicate') },
  { label: 'Archive', disabled: true },
  { separator: true },
  { label: 'Delete', tone: 'danger', onSelect: () => toast('Deleted', { tone: 'danger' }) },
]
</script>

# Menu

A list of actions behind a button. Arrow keys move through it, typing jumps to an item, <OKbd>Esc</OKbd> closes it.

<Demo>
  <OMenu :items="items">
    <OButton>Actions</OButton>
  </OMenu>
  <OMenu :items="items" align="end">
    <OButton icon shape="pill" aria-label="More">⋯</OButton>
  </OMenu>
</Demo>

```vue
<script setup lang="ts">
import type { MenuItem } from 'oyna'

const items: MenuItem[] = [
  { label: 'Rename', hint: 'F2', onSelect: rename },
  { label: 'Duplicate', onSelect: duplicate },
  { label: 'Archive', disabled: true },
  { separator: true },
  { label: 'Delete', tone: 'danger', onSelect: remove },
]
</script>

<template>
  <OMenu :items="items">
    <OButton>Actions</OButton>
  </OMenu>
</template>
```

The slot takes exactly one element that can receive focus; it becomes the trigger.

- `hint` is a dim note at the end of an item. It only shows text: binding the key is up to you.
- `tone: 'danger'` is for the action that destroys something. One per menu, last, after a separator.

A menu is for actions. To choose a value, use a [select](/components/select).

While the menu is open, page hotkeys are off.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `MenuItem[]` | required | `{ label, hint?, tone?, disabled?, onSelect? }` or `{ separator: true }` |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Flips when there is no room |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Which edge of the trigger the menu lines up with |

Built on [Reka UI](https://reka-ui.com) DropdownMenu.
