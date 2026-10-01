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

## How it is built

Every control on this screen is a library component; the example adds only layout.

- The profile is a real `<form>`: the handle and the text are checked as you type, and Enter in a field saves.
- The delete button of the dialog is the primary one, yet it stays disabled until the checkbox is ticked.
- On the Keys tab, a key you are choosing never triggers anything else on the page.
- Nothing here has a ring: a settings page has no "main thing" and nothing at stake until you open the delete dialog.
