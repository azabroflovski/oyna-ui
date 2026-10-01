<script setup>
import { ref } from 'vue'

const open = ref(false)
const sound = ref(true)
const saved = ref(0)
</script>

# Dialog

A layer over the page for something that needs an answer or full attention. <OKbd>Esc</OKbd>, the close button and a click outside close it; focus stays inside while it is open and returns to where it was.

<Demo>
  <OButton hotkey="KeyD" @click="open = true">Open dialog</OButton>
  <span>saved {{ saved }}</span>
  <ODialog v-model:open="open" title="Settings" description="Kept on this device.">
    <OField label="Name" hint="2–16 characters">
      <OInput />
    </OField>
    <div style="display: flex; gap: 10px; align-items: center">
      <OToggle v-model="sound" hotkey="KeyM">Sound</OToggle>
      <OButton variant="primary" hotkey="Enter" style="margin-left: auto" @click="saved++; open = false">Save</OButton>
    </div>
  </ODialog>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <OButton hotkey="KeyD" @click="open = true">
    Open dialog
  </OButton>

  <ODialog v-model:open="open" title="Settings" description="Kept on this device.">
    <OField label="Name" hint="2–16 characters">
      <OInput v-model="name" />
    </OField>
    <OToggle v-model="sound" hotkey="KeyM">
      Sound
    </OToggle>
    <OButton variant="primary" hotkey="Enter" @click="save">
      Save
    </OButton>
  </ODialog>
</template>
```

## Hotkeys and layers

While a dialog is open, hotkeys of everything behind it are off: on this page <OKbd>D</OKbd> does nothing while the dialog is open. Hotkeys of buttons and toggles inside the dialog work. With a dialog opened from a dialog, only the top one answers, and <OKbd>Esc</OKbd> closes them one at a time.

## Look

The dialog is nearly opaque on purpose: glass over blurred glass over a busy background is hard to read. Its width is `520px`; set `--o-dialog-width` to change it. A class or a style on `ODialog` goes to the dialog box.

```vue
<ODialog v-model:open="open" title="Wide" style="--o-dialog-width: 720px">
  …
</ODialog>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `v-model:open` | `boolean` | `false` | |
| `title` | `string` | required | |
| `description` | `string` | — | A line under the title, read out with it |
| `closeLabel` | `string` | `'Close'` | Text of the close button, after the `Esc` key |

Built on [Reka UI](https://reka-ui.com) Dialog.
