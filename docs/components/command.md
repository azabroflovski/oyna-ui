<script setup>
import { toast } from 'oyna-ui'
import { Palette, Rocket, RotateCcw, Search, Settings, Terminal } from '@lucide/vue'
import { ref } from 'vue'

const open = ref(false)
const plain = ref(false)
const commands = [
  { value: 'deploy', label: 'Deploy to production', group: 'Deploys', icon: Rocket, hint: 'v1.4.1' },
  { value: 'rollback', label: 'Roll back', group: 'Deploys', icon: RotateCcw, keywords: 'revert undo' },
  { value: 'logs', label: 'Open the logs', group: 'Deploys', icon: Terminal },
  { value: 'theme', label: 'Theme editor', group: 'Go to', icon: Palette },
  { value: 'settings', label: 'Settings', group: 'Go to', icon: Settings, keywords: 'preferences account' },
  { value: 'billing', label: 'Billing', group: 'Go to', disabled: true, hint: 'owners only' },
]
const pages = [
  { value: 'button', label: 'Button' },
  { value: 'dialog', label: 'Dialog' },
  { value: 'table', label: 'Table' },
]
</script>

# Command

A list of everything the app can do, opened with one key and searched by typing: the fastest way around an interface for someone who keeps their hands on the keyboard.

<Demo>
  <OButton hotkey="KeyK" @click="open = true"><Search /> Commands</OButton>
  <OCommand v-model:open="open" :items="commands" @select="(item) => toast(item.label)" />
</Demo>

```vue
<script setup lang="ts">
import { Palette, Rocket, RotateCcw, Settings, Terminal } from '@lucide/vue'
import type { CommandItem } from 'oyna-ui'
import { ref } from 'vue'

const open = ref(false)
const commands: CommandItem[] = [
  { value: 'deploy', label: 'Deploy to production', group: 'Deploys', icon: Rocket, hint: 'v1.4.1' },
  { value: 'rollback', label: 'Roll back', group: 'Deploys', icon: RotateCcw, keywords: 'revert undo' },
  { value: 'logs', label: 'Open the logs', group: 'Deploys', icon: Terminal },
  { value: 'theme', label: 'Theme editor', group: 'Go to', icon: Palette },
  { value: 'settings', label: 'Settings', group: 'Go to', icon: Settings, keywords: 'preferences account' },
  { value: 'billing', label: 'Billing', group: 'Go to', disabled: true, hint: 'owners only' },
]

function run(item: CommandItem) {
  // item.value tells which one
}
</script>

<template>
  <OButton hotkey="KeyK" @click="open = true">Commands</OButton>
  <OCommand v-model:open="open" :items="commands" @select="run" />
</template>
```

The field has the focus as soon as the palette opens. The arrow keys move through the list, <OKbd>Enter</OKbd> runs the lit item, <OKbd>Esc</OKbd> closes. Choosing an item closes the palette and emits `select` with that item; what it does is up to you.

## How it searches

Every typed word must occur in the item's `label`, `group` or `keywords`, in any order: `dep prod` finds "Deploy to production", and `undo` finds "Roll back" through its keywords. Put the words people might try, but which are not on the label, into `keywords`.

## Opening it

The palette has no key of its own. Open it from a button that owns a hotkey, as above, or with [`useHotkey`](/guide/hotkeys). Hotkeys are single physical keys, so the palette here opens on <OKbd code="KeyK">K</OKbd>; a combination such as Ctrl+K is yours to listen for.

## Without groups

Items without a `group` form one plain list. `title`, `placeholder` and `empty-text` set the words.

<Demo>
  <OButton @click="plain = true">Go to a page</OButton>
  <OCommand
    v-model:open="plain"
    :items="pages"
    title="Go to"
    placeholder="A page"
    empty-text="No such page"
    @select="(item) => toast(item.label)"
  />
</Demo>

```vue
<OCommand
  v-model:open="open"
  :items="pages"
  title="Go to"
  placeholder="A page"
  empty-text="No such page"
  @select="go"
/>
```

## Props

| Prop           | Type            | Default            | Description                         |
| -------------- | --------------- | ------------------ | ----------------------------------- |
| `items`        | `CommandItem[]` | required           |                                     |
| `v-model:open` | `boolean`       | `false`            |                                     |
| `title`        | `string`        | `'Commands'`       | The dialog's title                  |
| `placeholder`  | `string`        | `'Type a command'` |                                     |
| `emptyText`    | `string`        | `'Nothing found'`  | Shown when nothing matches the text |

## CommandItem

| Field      | Type        | Description                                             |
| ---------- | ----------- | ------------------------------------------------------- |
| `value`    | `string`    | What tells the items apart                              |
| `label`    | `string`    | The text of the row                                     |
| `group`    | `string`    | Items with the same group stand together under its name |
| `hint`     | `string`    | A dim note at the end of the row                        |
| `keywords` | `string`    | Extra words the item is found by                        |
| `icon`     | `Component` | An icon component, e.g. from Lucide                     |
| `disabled` | `boolean`   |                                                         |

## Events

| Event    | Payload       | Description        |
| -------- | ------------- | ------------------ |
| `select` | `CommandItem` | An item was chosen |

Built on [Reka UI](https://reka-ui.com) Listbox, inside a [dialog](/components/dialog).
