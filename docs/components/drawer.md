<script setup>
import { toast } from 'oyna-ui'
import { ref } from 'vue'

const filters = ref(false)
const left = ref(false)
const sheet = ref(false)
const onlyErrors = ref(false)
const slow = ref(true)
const region = ref('fra')
const regions = [
  { value: 'fra', label: 'Frankfurt' },
  { value: 'iad', label: 'Washington' },
  { value: 'sin', label: 'Singapore' },
]

function apply() {
  filters.value = false
  toast('Filters applied', { tone: 'accent' })
}
</script>

# Drawer

A panel standing at an edge of the screen, for something longer than a [popover](/components/popover) holds and less final than a [dialog](/components/dialog): filters, the details of a row, a short form. The page stays behind it.

<Demo>
  <OButton hotkey="KeyF" @click="filters = true">Filters</OButton>
  <ODrawer v-model:open="filters" title="Filters" description="Applied to the list of requests.">
    <OSwitch v-model="onlyErrors">Only errors</OSwitch>
    <OSwitch v-model="slow">Slower than 1 s</OSwitch>
    <OSelect v-model="region" :items="regions" aria-label="Region" />
    <OButton variant="primary" hotkey="Enter" @click="apply">Apply</OButton>
  </ODrawer>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <OButton hotkey="KeyF" @click="open = true">Filters</OButton>

  <ODrawer v-model:open="open" title="Filters" description="Applied to the list of requests.">
    <OSwitch v-model="onlyErrors">Only errors</OSwitch>
    <OSwitch v-model="slow">Slower than 1 s</OSwitch>
    <OButton variant="primary" hotkey="Enter" @click="apply">Apply</OButton>
  </ODrawer>
</template>
```

A drawer is a dialog in another place: the same header, the same <OKbd>Esc</OKbd>, focus kept inside, and hotkeys of the page switched off while it is open. Everything on the [Dialog](/components/dialog) page about focus and hotkeys holds here.

It fades in and does not slide: the library uses light, not movement.

## Sides

`side` is `right` (the default), `left` or `bottom`. A bottom drawer is a sheet: on a phone it is the natural place for a menu or a set of filters, within reach of the thumb.

<Demo>
  <OButton @click="left = true">Left</OButton>
  <OButton @click="sheet = true">Bottom</OButton>
  <ODrawer v-model:open="left" title="Navigation" side="left">
    <p style="margin: 0; color: var(--o-text-2)">A list of sections would go here.</p>
  </ODrawer>
  <ODrawer v-model:open="sheet" title="Share" side="bottom">
    <p style="margin: 0; color: var(--o-text-2)">A sheet takes the full width and as much height as its content needs.</p>
    <OButton variant="primary" @click="sheet = false">Done</OButton>
  </ODrawer>
</Demo>

```vue
<ODrawer v-model:open="open" title="Navigation" side="left">…</ODrawer>

<ODrawer v-model:open="open" title="Share" side="bottom">…</ODrawer>
```

## Size

A side drawer is 420px wide and never wider than the screen; a sheet is at most 85% of the screen's height and scrolls inside. Change either with a CSS variable:

```vue
<ODrawer v-model:open="open" title="Details" style="--o-drawer-width: 560px">…</ODrawer>

<ODrawer v-model:open="open" title="Share" side="bottom" style="--o-drawer-height: 50dvh">…</ODrawer>
```

## Props

| Prop           | Type                            | Default   | Description                              |
| -------------- | ------------------------------- | --------- | ---------------------------------------- |
| `title`        | `string`                        | required  |                                          |
| `v-model:open` | `boolean`                       | `false`   |                                          |
| `description`  | `string`                        | —         | A line under the title, read out with it |
| `side`         | `'right' \| 'left' \| 'bottom'` | `'right'` | The edge it stands at                    |
| `closeLabel`   | `string`                        | `'Close'` | Text of the close button                 |

Built on the library's [Dialog](/components/dialog), which is [Reka UI](https://reka-ui.com) Dialog.
