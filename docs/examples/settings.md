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

Five tabs, each a different kind of settings page. Most alerts here are plain ones: information, not alarm.

- **Profile.** The form knows when it differs from what is saved: a plain alert offers to save or discard, and the Save button wakes up.
- **Team.** A table with a control in every row: the role is a select, the rest is in a menu. Your own row has the accent ring and cannot be removed.
- **API tokens.** A new token is shown in full once, in an accent alert, then only its first characters remain. Revoking asks first.
- **Notifications.** A plain alert explains why no email arrives yet.
- **Keys.** A plain note says where the keys are stored. Put two actions on one key and it turns into a danger alert that names both.
