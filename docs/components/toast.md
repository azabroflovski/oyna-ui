<script setup>
import { toast } from 'oyna'
</script>

# Toast

A short message about something that just happened. It goes away by itself; a click removes it sooner.

<Demo>
  <OButton @click="toast('Link copied')">Plain</OButton>
  <OButton @click="toast('Saved', { tone: 'accent' })">Accent</OButton>
  <OButton @click="toast('Could not save. Try again.', { tone: 'danger' })">Danger</OButton>
  <OButton @click="toast('Stays until clicked', { duration: 0 })">Sticky</OButton>
</Demo>

Put one `OToaster` in your app, then call `toast()` from anywhere:

```vue
<!-- App.vue -->
<template>
  <OBackground />
  <RouterView />
  <OToaster />
</template>
```

```ts
import { toast } from 'oyna'

toast('Link copied')
toast('Saved', { tone: 'accent' })
toast('Could not save. Try again.', { tone: 'danger' })
toast('Stays until clicked', { duration: 0 })
```

A toast is plain by default. The ring is a signal here as everywhere: `accent` for the result the user was waiting for, `danger` for something that went wrong. A `danger` toast is announced by screen readers at once, the others when the reader is idle.

## API

`toast(message, options?)` returns the toast's id.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `'accent' \| 'danger'` | — | |
| `duration` | `number` | `4000` | In ms; `0` keeps the toast until it is clicked |

`dismissToast(id)` removes a toast.
