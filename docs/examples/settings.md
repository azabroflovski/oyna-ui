---
layout: example
---

<script setup>
import Settings from './Settings.vue'
</script>

<Settings />

## How it is built

Every control on this screen is a library component; the example adds only layout.

- The profile is a real `<form>`: the handle and the text are checked as you type, and Enter in a field saves.
- The delete button of the dialog is the primary one, yet it stays disabled until the checkbox is ticked.
- On the Keys tab, a key you are choosing never triggers anything else on the page.
- Nothing here has a ring: a settings page has no "main thing" and nothing at stake until you open the delete dialog.

<<< ./Settings.vue
