<script setup>
import { ref } from 'vue'

const zone = ref('Asia/Tashkent')
const region = ref()
const zones = [
  { value: 'Pacific/Honolulu', label: 'Honolulu', hint: 'UTC−10' },
  { value: 'America/Los_Angeles', label: 'Los Angeles', hint: 'UTC−8' },
  { value: 'America/Denver', label: 'Denver', hint: 'UTC−7' },
  { value: 'America/Chicago', label: 'Chicago', hint: 'UTC−6' },
  { value: 'America/New_York', label: 'New York', hint: 'UTC−5' },
  { value: 'America/Sao_Paulo', label: 'São Paulo', hint: 'UTC−3' },
  { value: 'Europe/London', label: 'London', hint: 'UTC+0' },
  { value: 'Europe/Berlin', label: 'Berlin', hint: 'UTC+1' },
  { value: 'Europe/Istanbul', label: 'Istanbul', hint: 'UTC+3' },
  { value: 'Asia/Dubai', label: 'Dubai', hint: 'UTC+4' },
  { value: 'Asia/Tashkent', label: 'Tashkent', hint: 'UTC+5' },
  { value: 'Asia/Kolkata', label: 'Kolkata', hint: 'UTC+5:30' },
  { value: 'Asia/Singapore', label: 'Singapore', hint: 'UTC+8' },
  { value: 'Asia/Tokyo', label: 'Tokyo', hint: 'UTC+9' },
  { value: 'Australia/Sydney', label: 'Sydney', hint: 'UTC+10' },
]
const regions = [
  { value: 'fra', label: 'Frankfurt', hint: 'eu-central' },
  { value: 'iad', label: 'Washington', hint: 'us-east' },
  { value: 'sin', label: 'Singapore', hint: 'ap-southeast' },
  { value: 'gru', label: 'São Paulo', hint: 'sa-east', disabled: true },
]
</script>

# Combobox

A choice of one out of a long list, found by typing. Use a [select](/components/select) while the list fits on the screen; once it does not, a field that filters the list is faster than scrolling.

<Demo>
  <div style="width: min(280px, 100%)">
    <OCombobox v-model="zone" :items="zones" aria-label="Time zone" />
  </div>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const zone = ref('Asia/Tashkent')
const zones = [
  { value: 'Europe/London', label: 'London', hint: 'UTC+0' },
  { value: 'Europe/Berlin', label: 'Berlin', hint: 'UTC+1' },
  { value: 'Asia/Tashkent', label: 'Tashkent', hint: 'UTC+5' },
  // …
]
</script>

<template>
  <OCombobox v-model="zone" :items="zones" aria-label="Time zone" />
</template>
```

Typing narrows the list to the items whose label contains the text. The arrow keys move through it, <OKbd>Enter</OKbd> chooses, <OKbd>Esc</OKbd> closes. Leaving the field without choosing puts the chosen item's label back: the value is always one of the items, never a loose piece of text.

It looks like an [input](/components/input) and takes the full width of its container, so it sits in an `OField` like one.

## Placeholder and nothing found

<Demo>
  <div style="width: min(280px, 100%)">
    <OCombobox v-model="region" :items="regions" placeholder="Region" empty-text="No such region" aria-label="Region" />
  </div>
</Demo>

```vue
<OCombobox v-model="region" :items="regions" placeholder="Region" empty-text="No such region" aria-label="Region" />
```

## Disabled

<Demo>
  <div style="width: min(280px, 100%)">
    <OCombobox :items="regions" placeholder="Region" disabled aria-label="Region" />
  </div>
</Demo>

```vue
<OCombobox :items="regions" placeholder="Region" disabled aria-label="Region" />
```

## Props

| Prop          | Type                                                                    | Default           | Description                                                       |
| ------------- | ----------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------- |
| `items`       | `{ value: string, label: string, hint?: string, disabled?: boolean }[]` | required          |                                                                   |
| `v-model`     | `string`                                                                | —                 | The chosen item's `value`                                         |
| `placeholder` | `string`                                                                | —                 | Shown while nothing is chosen                                     |
| `emptyText`   | `string`                                                                | `'Nothing found'` | Shown when nothing matches the text                               |
| `disabled`    | `boolean`                                                               | `false`           |                                                                   |
| `invalid`     | `boolean`                                                               | `false`           | A danger ring. Inside an `OField` with an error it is set for you |

`class` and `style` go to the wrapper; other attributes (`aria-label`, `name`) go to the field.

Built on [Reka UI](https://reka-ui.com) Combobox.
