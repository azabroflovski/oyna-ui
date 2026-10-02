<script setup>
import { ref } from 'vue'

const open = ref('billing')
const several = ref(['limits'])
const questions = [
  { value: 'billing', label: 'How is usage billed?' },
  { value: 'limits', label: 'What are the rate limits?' },
  { value: 'regions', label: 'Where does my code run?' },
  { value: 'sso', label: 'Is there single sign-on?', disabled: true },
]
</script>

# Accordion

Sections that open one under another, so a long page shows its headings first: a list of questions, the groups of a settings page, the details of a deploy.

<Demo>
  <OAccordion v-model="open" :items="questions" style="width: min(460px, 100%)">
    <template #billing>By the request, counted per project. The first hundred thousand a month are free.</template>
    <template #limits>A thousand requests a minute per token. A response over the limit comes with a <code>Retry-After</code> header.</template>
    <template #regions>In the region of the project: Frankfurt, Washington or Singapore.</template>
    <template #sso>On the Enterprise plan.</template>
  </OAccordion>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref('billing')
const questions = [
  { value: 'billing', label: 'How is usage billed?' },
  { value: 'limits', label: 'What are the rate limits?' },
  { value: 'regions', label: 'Where does my code run?' },
  { value: 'sso', label: 'Is there single sign-on?', disabled: true },
]
</script>

<template>
  <OAccordion v-model="open" :items="questions">
    <template #billing>By the request, counted per project.</template>
    <template #limits>A thousand requests a minute per token.</template>
    <template #regions>In the region of the project.</template>
    <template #sso>On the Enterprise plan.</template>
  </OAccordion>
</template>
```

Each item has a slot named after its `value`, as in [tabs](/components/tabs). One section is open at a time; a click on the open one closes it. The arrow keys move between the headings, <OKbd>Enter</OKbd> or <OKbd>Space</OKbd> opens one.

Without a `v-model` every section starts closed.

A section appears with a fade and at its full height at once: nothing slides.

## Several open at once

With `multiple` the sections open and close on their own, and the model is a list.

<Demo>
  <OAccordion v-model="several" :items="questions" multiple style="width: min(460px, 100%)">
    <template #billing>By the request, counted per project.</template>
    <template #limits>A thousand requests a minute per token.</template>
    <template #regions>In the region of the project.</template>
    <template #sso>On the Enterprise plan.</template>
  </OAccordion>
</Demo>

```vue
<script setup lang="ts">
const open = ref(['limits'])
</script>

<template>
  <OAccordion v-model="open" :items="questions" multiple>…</OAccordion>
</template>
```

## Accordion or tabs

Tabs when the sections are few, equal, and one of them must always be shown. An accordion when there are many, when a reader wants to scan the headings, or when two of them are worth comparing side by side.

## Props

| Prop       | Type                                                     | Default  | Description                                    |
| ---------- | -------------------------------------------------------- | -------- | ---------------------------------------------- |
| `items`    | `{ value: string, label: string, disabled?: boolean }[]` | required | A slot named after each `value` is its content |
| `v-model`  | `string`, or `string[]` with `multiple`                  | —        | The open section or sections                   |
| `multiple` | `boolean`                                                | `false`  | Several sections may be open at once           |

Built on [Reka UI](https://reka-ui.com) Accordion.
