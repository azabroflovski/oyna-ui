<script setup>
import { ref } from 'vue'

const period = ref('week')
const periods = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'all', label: 'All time' },
]
const sections = [
  { value: 'overview', label: 'Overview' },
  { value: 'history', label: 'History' },
  { value: 'settings', label: 'Settings' },
]
</script>

# Tabs

A choice of one view out of a few. Arrow keys move between tabs.

## Segmented

Pills in a dark track. Without panels it is a switch: bind `v-model` and use the value yourself.

<Demo>
  <OTabs v-model="period" :items="periods" />
  <span>{{ period }}</span>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const period = ref('week')
const periods = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'all', label: 'All time' },
]
</script>

<template>
  <OTabs v-model="period" :items="periods" />
</template>
```

## Underline, with panels

For the sections of a page. A slot named after an item's `value` is its panel. Without a `v-model` the first tab is open.

<Demo style="justify-content: stretch">
  <OTabs :items="sections" variant="underline" style="width: 100%">
    <template #overview>Everything at a glance.</template>
    <template #history>What happened before.</template>
    <template #settings>What can be changed.</template>
  </OTabs>
</Demo>

```vue
<OTabs :items="sections" variant="underline">
  <template #overview>Everything at a glance.</template>
  <template #history>What happened before.</template>
  <template #settings>What can be changed.</template>
</OTabs>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ value: string, label: string, disabled?: boolean }[]` | required | |
| `v-model` | `string` | first item | The open tab's `value` |
| `variant` | `'segmented' \| 'underline'` | `'segmented'` | |

Built on [Reka UI](https://reka-ui.com) Tabs.
