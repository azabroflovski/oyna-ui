---
layout: example
---

<script setup>
import Incident from './incident/Incident.vue'
</script>

<ExampleSource dir="docs/examples/incident" :files="['Incident.vue', 'data.ts']">
<template #f0>

<<< ./incident/Incident.vue

</template>
<template #f1>

<<< ./incident/data.ts

</template>
</ExampleSource>

<Incident />

## How it is built

A screen where something is at stake, so this is where the danger colour earns its place.

- While the incident is open, danger marks one story in five places: the badge, the alert, two numbers, the bars over 2% and the failing row. Nothing else is red.
- <OKbd>R</OKbd> opens the rollback dialog. Its main button shows the work in progress and cannot be pressed twice.
- After the rollback the same page turns calm: the alert becomes an accent one, the numbers lose their colour, a new event lands at the top of the timeline.
- "Start over" brings the incident back, to try it again.
