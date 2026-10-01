<script setup>
import { Inbox, Plus } from '@lucide/vue'
</script>

# Empty

Nothing here yet. Say what is missing, why, and give the way out.

<Demo>
  <OEmpty title="No deploys yet">
    <template #icon><Inbox /></template>
    Ship the first version and it will show up here.
    <template #actions>
      <OButton variant="primary"><Plus /> New deploy</OButton>
      <OButton variant="ghost">Read the guide</OButton>
    </template>
  </OEmpty>
</Demo>

```vue
<script setup lang="ts">
import { Inbox, Plus } from '@lucide/vue'
</script>

<template>
  <OEmpty title="No deploys yet">
    <template #icon><Inbox /></template>
    Ship the first version and it will show up here.
    <template #actions>
      <OButton variant="primary"><Plus /> New deploy</OButton>
      <OButton variant="ghost">Read the guide</OButton>
    </template>
  </OEmpty>
</template>
```

Only the title is required. A search with no results needs no button:

<Demo>
  <OEmpty title="Nothing found">Try a shorter word.</OEmpty>
</Demo>

```vue
<OEmpty title="Nothing found">Try a shorter word.</OEmpty>
```

It has no fill of its own: put it in a [card](/components/surface), or straight on the page.

## Props and slots

| Prop    | Type     | Default  | Description                     |
| ------- | -------- | -------- | ------------------------------- |
| `title` | `string` | required | What is missing, in a few words |

| Slot      | Description                             |
| --------- | --------------------------------------- |
| default   | Why it is empty, or what to do about it |
| `icon`    | An icon above the title                 |
| `actions` | One or two buttons: the way out         |
