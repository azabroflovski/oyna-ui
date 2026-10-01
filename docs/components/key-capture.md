<script setup>
import { ref } from 'vue'

const retry = ref('KeyR')
const mute = ref('KeyM')
const count = ref(0)
</script>

# KeyCapture

Lets the user choose a key. Click it, then press the key; <OKbd>Esc</OKbd> or clicking away cancels. The value is a physical key code, ready to pass to a `hotkey`.

<Demo>
  <OKeyCapture v-model="retry">Retry</OKeyCapture>
  <OKeyCapture v-model="mute">Mute</OKeyCapture>
  <OButton variant="soft" :hotkey="retry" @click="count++">Retry · {{ count }}</OButton>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const retry = ref('KeyR')
</script>

<template>
  <OKeyCapture v-model="retry">
    Retry
  </OKeyCapture>
  <OButton variant="soft" :hotkey="retry" @click="retry">
    Retry
  </OButton>
</template>
```

Change the first key above, then press the new one: the button follows.

While it waits, the key cap gets the accent ring, and the press goes to the capture only: no hotkey on the page reacts to it.

Checking that two actions do not share a key is up to you.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model` | `string` | — | Physical key (`KeyboardEvent.code`) |
| `disabled` | `boolean` | `false` | |

The slot is the caption under the key.
