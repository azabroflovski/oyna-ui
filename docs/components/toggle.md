<script setup>
import { ref } from 'vue'

const sound = ref(true)
const hints = ref(false)
</script>

# Toggle

A setting that is on or off, as a chip. It lights up in the accent colour when on, and can own a hotkey.

<Demo>
  <OToggle v-model="sound" hotkey="KeyM">Sound</OToggle>
  <OToggle v-model="hints" hotkey="KeyH">Hints</OToggle>
  <OToggle>No hotkey</OToggle>
  <OToggle disabled>Disabled</OToggle>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const sound = ref(true)
const hints = ref(false)
</script>

<template>
  <OToggle v-model="sound" hotkey="KeyM"> Sound </OToggle>
  <OToggle v-model="hints" hotkey="KeyH"> Hints </OToggle>
</template>
```

Press <OKbd>M</OKbd> or <OKbd>H</OKbd> on this page. See [Hotkeys](/guide/hotkeys) for when a key is ignored.

## Props

| Prop          | Type      | Default       | Description                                                                |
| ------------- | --------- | ------------- | -------------------------------------------------------------------------- |
| `v-model`     | `boolean` | `false`       |                                                                            |
| `hotkey`      | `string`  | —             | Physical key (`KeyboardEvent.code`) that flips the toggle; shown inside it |
| `hotkeyLabel` | `string`  | from `hotkey` | Text shown for the key                                                     |
| `disabled`    | `boolean` | `false`       | Also turns the hotkey off                                                  |
