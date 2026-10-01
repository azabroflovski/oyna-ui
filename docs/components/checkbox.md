<script setup>
import { ref } from 'vue'

const agree = ref(false)
const news = ref(true)
</script>

# Checkbox

A yes or no that is part of a form and takes effect when the form is sent. For a setting that applies at once, use a [switch](/components/switch).

<Demo>
  <OCheckbox v-model="agree">I accept the terms</OCheckbox>
  <OCheckbox v-model="news">Send me news</OCheckbox>
  <OCheckbox disabled>Disabled</OCheckbox>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const agree = ref(false)
</script>

<template>
  <OCheckbox v-model="agree">
    I accept the terms
  </OCheckbox>
</template>
```

Inside is a real `<input type="checkbox">`: Space toggles it, a form submits it. `class` and `style` go to the label; every other attribute — `name`, `required`, `aria-label` — goes to the input.

Without text in the slot, give it an `aria-label`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `boolean` | `false` | |
| `disabled` | `boolean` | `false` | |
