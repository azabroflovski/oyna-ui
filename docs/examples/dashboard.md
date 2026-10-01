---
layout: example
---

<script setup>
import Dashboard from './dashboard/Dashboard.vue'
</script>

<ExampleSource dir="docs/examples/dashboard" :files="['Dashboard.vue','data.ts']">
<template #f0>

<<< ./dashboard/Dashboard.vue

</template>
<template #f1>

<<< ./dashboard/data.ts

</template>
</ExampleSource>

<Dashboard />

## How it is built

Every control on this screen is a library component; the example adds only layout (grids and gaps) and a little text styling. The numbers are made up.

- The period tabs switch the stats and the chart; while the "new" numbers load, skeletons of the same size hold their place.
- The alert at the top is a state of the page, not an event: it stays until closed, and leads to the [incident](/examples/incident).
- <OKbd>N</OKbd> opens the dialog. While it is open, <OKbd>L</OKbd> does nothing: hotkeys behind a dialog are off.
- The accent ring is on one card. The danger ring is on the alert, one card and one table row: three places, one story. Everything else has no ring.
