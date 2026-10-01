---
layout: example
---

<script setup>
import Projects from './projects/Projects.vue'
</script>

<ExampleSource dir="docs/examples/projects" :files="['Projects.vue', 'data.ts']">
<template #f0>

<<< ./projects/Projects.vue

</template>
<template #f1>

<<< ./projects/data.ts

</template>
</ExampleSource>

<Projects />
