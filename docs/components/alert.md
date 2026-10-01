<script setup>
import { CircleCheck, Info, TriangleAlert } from '@lucide/vue'
import { ref } from 'vue'

const shown = ref(true)
</script>

# Alert

A message that stays on the page, next to what it is about. For one that comes and goes, use a [toast](/components/toast).

<Demo style="flex-direction: column; align-items: stretch">
  <OAlert title="Maintenance on Sunday, 02:00–03:00 UTC">
    <template #icon><Info /></template>
    Deploys are paused for that hour. Running services are not affected.
  </OAlert>
  <OAlert tone="accent" title="v1.4.1 is live">
    <template #icon><CircleCheck /></template>
    All 214 tests passed. Error rate is 0.3%.
  </OAlert>
  <OAlert tone="danger" title="GET /v1/search is degraded">
    <template #icon><TriangleAlert /></template>
    p95 is 1.9 s, nine times the usual.
    <template #actions>
      <OButton size="sm">Open the trace</OButton>
      <OButton size="sm" variant="ghost">Mute for an hour</OButton>
    </template>
  </OAlert>
</Demo>

```vue
<script setup lang="ts">
import { CircleCheck, Info, TriangleAlert } from '@lucide/vue'
</script>

<template>
  <OAlert title="Maintenance on Sunday, 02:00–03:00 UTC">
    <template #icon><Info /></template>
    Deploys are paused for that hour. Running services are not affected.
  </OAlert>

  <OAlert tone="accent" title="v1.4.1 is live">
    <template #icon><CircleCheck /></template>
    All 214 tests passed. Error rate is 0.3%.
  </OAlert>

  <OAlert tone="danger" title="GET /v1/search is degraded">
    <template #icon><TriangleAlert /></template>
    p95 is 1.9 s, nine times the usual.
    <template #actions>
      <OButton size="sm">Open the trace</OButton>
      <OButton size="sm" variant="ghost">Mute for an hour</OButton>
    </template>
  </OAlert>
</template>
```

## Tone

A plain alert has no ring: it is information. A toned one is a signal and gets the ring, like a [surface](/components/surface) with a `signal`:

- `accent` — good news, or the thing to do next;
- `danger` — something is wrong or at stake. It is also the only one a screen reader reads out at once.

There are two tones on purpose. The library has one accent and one danger colour, and no yellow "warning" in between: decide whether it is wrong or not.

## Closable

`closable` adds a close button. It emits `close`; hiding the alert is up to you.

<Demo style="flex-direction: column; align-items: stretch">
  <OAlert v-if="shown" title="You are on the free plan" closable @close="shown = false">
    One project and 10 000 requests a day.
  </OAlert>
  <OButton v-else size="sm" style="align-self: center" @click="shown = true">Show it again</OButton>
</Demo>

```vue
<OAlert v-if="shown" title="You are on the free plan" closable @close="shown = false">
  One project and 10 000 requests a day.
</OAlert>
```

## Alert, toast or dialog

- **Alert** — a state of the page: it is true for as long as it is shown.
- **[Toast](/components/toast)** — an event: something just happened.
- **[Dialog](/components/dialog)** — a question that must be answered before going on.

## Props and slots

| Prop       | Type                   | Default | Description                             |
| ---------- | ---------------------- | ------- | --------------------------------------- |
| `title`    | `string`               | —       | What happened, in a few words           |
| `tone`     | `'accent' \| 'danger'` | —       |                                         |
| `closable` | `boolean`              | `false` | Shows a close button that emits `close` |

| Slot      | Description                                              |
| --------- | -------------------------------------------------------- |
| default   | The details                                              |
| `icon`    | An icon before the text; it takes the colour of the tone |
| `actions` | One or two buttons: what to do about it                  |
