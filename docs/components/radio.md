<script setup>
import { ref } from 'vue'

const plan = ref('pro')
const plans = [
  { value: 'free', label: 'Free', hint: 'One project, community support' },
  { value: 'pro', label: 'Pro', hint: 'Unlimited projects, email support' },
  { value: 'team', label: 'Team', hint: 'Shared workspaces, roles' },
  { value: 'enterprise', label: 'Enterprise', hint: 'Talk to us', disabled: true },
]
</script>

# Radio

One choice out of a few, with all options in view. For a short switch between views use [tabs](/components/tabs); for a long list, a [select](/components/select).

<Demo>
  <ORadio v-model="plan" :items="plans" label="Plan" />
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const plan = ref('pro')
const plans = [
  { value: 'free', label: 'Free', hint: 'One project, community support' },
  { value: 'pro', label: 'Pro', hint: 'Unlimited projects, email support' },
  { value: 'team', label: 'Team', hint: 'Shared workspaces, roles' },
  { value: 'enterprise', label: 'Enterprise', hint: 'Talk to us', disabled: true },
]
</script>

<template>
  <ORadio v-model="plan" :items="plans" label="Plan" />
</template>
```

`ORadio` is the whole group. `label` is the question the options answer; without it, give the group an `aria-label`. Arrow keys move between options.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ value: string, label: string, hint?: string, disabled?: boolean }[]` | required | |
| `v-model` | `string` | — | The chosen item's `value` |
| `label` | `string` | — | The question the options answer |
| `disabled` | `boolean` | `false` | Disables every option |
