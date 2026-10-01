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
