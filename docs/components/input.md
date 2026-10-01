<script setup>
import { ref } from 'vue'

const name = ref('')
const taken = ref('admin')
</script>

# Input

A text field. Its edge is a quiet 1px line; the ring turns accent on focus and danger when the value is wrong. `OField` adds a label and a message under it.

<Demo>
  <OInput v-model="name" placeholder="Your name" style="max-width: 260px" />
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <OInput v-model="name" placeholder="Your name" />
</template>
```

Every attribute goes to the `<input>` itself: `type`, `placeholder`, `maxlength`, `autocomplete`, `disabled`.

## Field

A label, the control, and a hint. When there is an `error`, it replaces the hint and the input gets the danger ring. The label and the message are tied to the input for screen readers; you set no ids.

Try typing something other than `admin`:

<Demo>
  <OField label="Nickname" hint="2–16 characters" :error="taken === 'admin' ? 'This nickname is taken' : undefined" style="width: 260px">
    <OInput v-model="taken" />
  </OField>
</Demo>

```vue
<OField label="Nickname" hint="2–16 characters" :error="error">
  <OInput v-model="nickname" />
</OField>
```

The message keeps its line when empty, so the layout does not jump when an error appears.

## With a button

<Demo>
  <form style="display: flex; gap: 8px" @submit.prevent>
    <OInput placeholder="Email" type="email" aria-label="Email" style="width: 220px" />
    <OButton variant="primary" type="submit">Subscribe</OButton>
  </form>
</Demo>

```vue
<form @submit.prevent="subscribe">
  <OInput v-model="email" type="email" placeholder="Email" aria-label="Email" />
  <OButton variant="primary" type="submit">Subscribe</OButton>
</form>
```

Without an `OField`, give the input an `aria-label`.

## Props

### OInput

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string \| number` | — | |
| `invalid` | `boolean` | `false` | A danger ring. Inside an `OField` with an error it is set for you |

### OField

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | required | |
| `hint` | `string` | — | Shown under the control |
| `error` | `string` | — | Replaces the hint and marks the control invalid |
