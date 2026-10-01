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
