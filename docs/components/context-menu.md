<script setup>
import { Archive, Copy, Pencil, Trash2 } from '@lucide/vue'
import { toast } from 'oyna-ui'

const items = [
  { label: 'Rename', icon: Pencil, hint: 'F2', onSelect: () => toast('Rename') },
  { label: 'Duplicate', icon: Copy, onSelect: () => toast('Duplicate') },
  { label: 'Archive', icon: Archive, disabled: true },
  { separator: true },
  { label: 'Delete', icon: Trash2, tone: 'danger', onSelect: () => toast('Deleted', { tone: 'danger' }) },
]
</script>

# ContextMenu

A menu of actions that opens where the pointer is, on a right click: the actions of the thing that was clicked. On a touch screen a long press opens it.

<Demo>
  <OContextMenu :items="items">
    <OSurface style="padding: 28px 40px; text-align: center; color: var(--o-text-2)">
      <code>public-api</code><br />
      <span style="font-size: 13px; color: var(--o-text-3)">Right-click, or press and hold</span>
    </OSurface>
  </OContextMenu>
</Demo>

```vue
<script setup lang="ts">
import { Archive, Copy, Pencil, Trash2 } from '@lucide/vue'
import type { DropdownMenuItem } from 'oyna-ui'

const items: DropdownMenuItem[] = [
  { label: 'Rename', icon: Pencil, hint: 'F2', onSelect: rename },
  { label: 'Duplicate', icon: Copy, onSelect: duplicate },
  { label: 'Archive', icon: Archive, disabled: true },
  { separator: true },
  { label: 'Delete', icon: Trash2, tone: 'danger', onSelect: remove },
]
</script>

<template>
  <OContextMenu :items="items">
    <OSurface>public-api</OSurface>
  </OContextMenu>
</template>
```

The default slot takes exactly one element; a right click anywhere on it opens the menu. The items are the ones a [dropdown menu](/components/dropdown-menu) takes, and the menu looks and behaves the same: arrow keys, typing to jump, <OKbd>Esc</OKbd>.

## Never the only way

A context menu is invisible until someone thinks to right-click, and many people never do. Put every action it holds somewhere in plain sight as well: a [dropdown menu](/components/dropdown-menu) behind a button with three dots can take the very same `items`.

It also replaces the browser's own menu on that element, with its "copy" and "open in a new tab". Do not wrap text people may want to copy, or a whole page.

## Disabled

With `disabled` a right click does what the browser does, as if the menu were not there.

```vue
<OContextMenu :items="items" :disabled="readOnly">…</OContextMenu>
```

## Props

| Prop       | Type                 | Default  | Description                                                                     |
| ---------- | -------------------- | -------- | ------------------------------------------------------------------------------- |
| `items`    | `DropdownMenuItem[]` | required | `{ label, icon?, hint?, tone?, disabled?, onSelect? }` or `{ separator: true }` |
| `disabled` | `boolean`            | `false`  | Leaves the right click to the browser                                           |

Built on [Reka UI](https://reka-ui.com) ContextMenu.
