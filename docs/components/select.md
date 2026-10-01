<script setup>
import { ref } from 'vue'

const language = ref('en')
const size = ref()
const languages = [
  { value: 'en', label: 'English', hint: 'en' },
  { value: 'uz', label: 'Oʻzbekcha', hint: 'uz' },
  { value: 'ru', label: 'Русский', hint: 'ru' },
  { value: 'de', label: 'Deutsch', hint: 'de', disabled: true },
]
const sizes = [
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' },
]
</script>

# Select

A choice of one out of a list that is too long for [tabs](/components/tabs). Arrow keys move through the list, typing jumps to an option, <OKbd>Esc</OKbd> closes it.

<Demo>
  <OSelect v-model="language" :items="languages" aria-label="Language" />
  <OSelect v-model="size" :items="sizes" placeholder="Size" aria-label="Size" />
  <OSelect :items="sizes" placeholder="Disabled" disabled aria-label="Disabled" />
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const language = ref('en')
const languages = [
  { value: 'en', label: 'English', hint: 'en' },
  { value: 'uz', label: 'Oʻzbekcha', hint: 'uz' },
  { value: 'ru', label: 'Русский', hint: 'ru' },
  { value: 'de', label: 'Deutsch', hint: 'de', disabled: true },
]
</script>

<template>
  <OSelect v-model="language" :items="languages" aria-label="Language" />
</template>
```

`hint` is a dim note at the end of an option. Give the select an `aria-label`, or put it in an [`OField`](/components/input)-like layout with your own label.

While the list is open, page hotkeys are off: typing a letter searches the list and must not trigger a button.

## Props

| Prop          | Type                                                                    | Default  | Description                   |
| ------------- | ----------------------------------------------------------------------- | -------- | ----------------------------- |
| `items`       | `{ value: string, label: string, hint?: string, disabled?: boolean }[]` | required |                               |
| `v-model`     | `string`                                                                | —        | The chosen item's `value`     |
| `placeholder` | `string`                                                                | —        | Shown while nothing is chosen |
| `disabled`    | `boolean`                                                               | `false`  |                               |

Built on [Reka UI](https://reka-ui.com) Select.
