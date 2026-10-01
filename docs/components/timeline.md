<script setup>
import { toast } from 'oyna'

const release = [
  { title: 'v1.4.1 is live', time: '2 min ago', text: 'Production · 3 commits from main', tone: 'accent' },
  { title: 'Tests passed', time: '4 min ago', text: '214 tests in 38 s' },
  { title: 'Build finished', time: '5 min ago' },
  { title: 'Deploy started by ada', time: '6 min ago' },
]
const incident = [
  { title: 'Rolled back to v1.3.9', time: '14:32', text: 'Error rate is back under 0.5%.', tone: 'accent' },
  { title: 'Error rate over 5%', time: '14:20', text: 'GET /v1/search times out.', tone: 'danger', retry: true },
  { title: 'v1.4.0 deployed', time: '14:05' },
]
const plan = [
  { title: 'Freeze the release branch', time: 'Mon' },
  { title: 'Run the migration on staging', time: 'Tue', tone: 'accent' },
  { title: 'Migrate production', time: 'Thu', pending: true },
  { title: 'Remove the old columns', time: 'next week', pending: true },
]
</script>

# Timeline

What happened, in order. A dot for every event on one track; the dot's colour is the signal.

<Demo>
  <OTimeline :items="release" style="width: 360px" />
</Demo>

```vue
<script setup lang="ts">
const release = [
  { title: 'v1.4.1 is live', time: '2 min ago', text: 'Production · 3 commits from main', tone: 'accent' },
  { title: 'Tests passed', time: '4 min ago', text: '214 tests in 38 s' },
  { title: 'Build finished', time: '5 min ago' },
  { title: 'Deploy started by ada', time: '6 min ago' },
]
</script>

<template>
  <OTimeline :items="release" />
</template>
```

Only `title` is required. The order is yours: newest first for a log, oldest first for a plan.

## Tone

Most events are quiet. `accent` lights the one that matters now; `danger` marks one that went wrong. One or two per timeline, or the colour stops meaning anything.

The slot adds something under an event — a button, a badge. It gets the `item`, so you can show it for some events only.

<Demo>
  <OTimeline :items="incident" style="width: 360px">
    <template #default="{ item }">
      <OButton v-if="item.retry" size="sm" @click="toast('Opening the trace')">Open the trace</OButton>
    </template>
  </OTimeline>
</Demo>

```vue
<OTimeline :items="incident">
  <template #default="{ item }">
    <OButton v-if="item.retry" size="sm" @click="openTrace(item)">Open the trace</OButton>
  </template>
</OTimeline>
```

## Pending

`pending` is an event that has not happened yet: its dot is empty, like a step not taken in [Pips](/components/pips).

<Demo>
  <OTimeline :items="plan" style="width: 360px" />
</Demo>

```vue
<script setup lang="ts">
const plan = [
  { title: 'Freeze the release branch', time: 'Mon' },
  { title: 'Run the migration on staging', time: 'Tue', tone: 'accent' },
  { title: 'Migrate production', time: 'Thu', pending: true },
  { title: 'Remove the old columns', time: 'next week', pending: true },
]
</script>
```

## Timeline or pips

- **Timeline** — events with names and times, any number of them.
- **[Pips](/components/pips)** — a handful of equal steps with no text of their own.

## Props and slots

| Prop    | Type                                                                                                | Default  | Description |
| ------- | --------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `items` | `{ title: string, time?: string, text?: string, tone?: 'accent' \| 'danger', pending?: boolean }[]` | required |             |

| Slot    | Description                          |
| ------- | ------------------------------------ |
| default | More under an event; gets `{ item }` |

The timeline is a list (`<ol>`), so screen readers announce how many events there are.
