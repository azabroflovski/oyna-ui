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

- The period tabs switch the stats and the chart.
- <OKbd>N</OKbd> opens the dialog. While it is open, <OKbd>L</OKbd> does nothing: hotkeys behind a dialog are off.
- The accent ring is on one card and the danger ring on one card and one table row. Everything else has no ring.
