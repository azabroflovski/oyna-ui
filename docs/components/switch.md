<script setup>
import { ref } from 'vue'

const email = ref(true)
const push = ref(false)
</script>

# Switch

A setting that is on or off and applies at once. The label is on the left and the switch on the right, so a column of them lines up.

<Demo>
  <div style="display: flex; flex-direction: column; gap: 14px; width: 260px">
    <OSwitch v-model="email">Email notifications</OSwitch>
    <OSwitch v-model="push">Push notifications</OSwitch>
    <OSwitch disabled>Disabled</OSwitch>
  </div>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const email = ref(true)
</script>

<template>
  <OSwitch v-model="email"> Email notifications </OSwitch>
</template>
```

The switch changes at once: the thumb does not slide and the colour does not fade. The library answers with light, not movement, and a fade under a thumb that has already jumped looks like a stutter.

## Switch, toggle or checkbox

- **Switch** — a row in a list of settings.
- **[Toggle](/components/toggle)** — a chip in a toolbar, with a hotkey.
- **[Checkbox](/components/checkbox)** — a field of a form that is sent later.

## Props

| Prop       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| `v-model`  | `boolean` | `false` |             |
| `disabled` | `boolean` | `false` |             |

`class` and `style` go to the label; every other attribute goes to the input inside.
