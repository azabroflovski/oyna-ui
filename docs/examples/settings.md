---
layout: example
---

<script setup>
import Settings from './settings/Settings.vue'
</script>

<ExampleSource dir="docs/examples/settings" :files="['Settings.vue','options.ts']">
<template #f0>

<<< ./settings/Settings.vue

</template>
<template #f1>

<<< ./settings/options.ts

</template>
</ExampleSource>

<Settings />
