<script setup>
import { ref } from 'vue'

const radius = ref(14)
const volume = ref(60)
const glass = ref(30)
</script>

# Slider

A number picked by dragging, when the feel of the value matters more than its exact digits: a volume, a radius, an opacity. For an exact number use an [input](/components/input).

<Demo>
  <div style="display: flex; flex-direction: column; gap: 10px; width: min(320px, 100%)">
    <span style="font-size: 13px; color: var(--o-text-3)">Radius · {{ radius }}px</span>
    <OSlider v-model="radius" :max="24" aria-label="Radius" />
  </div>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const radius = ref(14)
</script>

<template>
  <span>Radius · {{ radius }}px</span>
  <OSlider v-model="radius" :max="24" aria-label="Radius" />
</template>
```

The arrow keys move the thumb by one step, <OKbd>Page Up</OKbd> and <OKbd>Page Down</OKbd> by a larger one, <OKbd>Home</OKbd> and <OKbd>End</OKbd> go to the ends. The slider does not print its value: show it next to the label, as above.

Give it an `aria-label`: it goes to the thumb, which is the control a screen reader meets.

## Step

`step` is the distance between two values the thumb can stop at.

<Demo>
  <div style="display: flex; flex-direction: column; gap: 10px; width: min(320px, 100%)">
    <span style="font-size: 13px; color: var(--o-text-3)">Glass darkness · {{ glass }}%</span>
    <OSlider v-model="glass" :min="10" :max="70" :step="5" aria-label="Glass darkness" />
  </div>
</Demo>

```vue
<OSlider v-model="glass" :min="10" :max="70" :step="5" aria-label="Glass darkness" />
```

## Disabled

<Demo>
  <div style="width: min(320px, 100%)">
    <OSlider v-model="volume" disabled aria-label="Volume" />
  </div>
</Demo>

```vue
<OSlider v-model="volume" disabled aria-label="Volume" />
```

## Props

| Prop       | Type      | Default | Description                 |
| ---------- | --------- | ------- | --------------------------- |
| `v-model`  | `number`  | `0`     | The value                   |
| `min`      | `number`  | `0`     |                             |
| `max`      | `number`  | `100`   |                             |
| `step`     | `number`  | `1`     | Distance between two values |
| `disabled` | `boolean` | `false` |                             |

`class` and `style` go to the slider; other attributes (`aria-label`, `name`) go to the thumb.

Built on [Reka UI](https://reka-ui.com) Slider.
