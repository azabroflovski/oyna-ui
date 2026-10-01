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

## How it is built

A list is mostly its states: full, loading, filtered to nothing, empty. This example has all of them.

- **Loading.** Refresh swaps the rows for skeletons as tall as a row, so the card keeps its height.
- **Three kinds of empty.** A filter that matches nothing offers to clear it; an empty archive explains what the archive is; no projects at all offers to make one. Each says what is missing and gives the way out.
- **Row actions** sit in a menu at the end of the row. Deleting asks first, in a dialog; archiving does not, because it can be undone.
- The danger ring is on one row, the project that is failing.
