<script setup>
import { ref } from 'vue'

const done = ref(3)
</script>

# Pips

Progress through a small number of equal steps, one dot per step. For anything longer or continuous use [Progress](/components/progress).

<Demo>
  <OPips :done="done" :total="8" aria-label="Steps done" />
  <OButton size="sm" @click="done = (done + 1) % 9">Next</OButton>
</Demo>

```vue
<OPips :done="3" :total="8" aria-label="Steps done" />
```

## Marker

A point to compare with: a previous best, a rival, a deadline. It is counted in steps and may be fractional: `4.5` is halfway through the fifth step. Say in a caption what the marker is.

<Demo>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
    <OPips :done="done" :total="8" :marker="4.5" aria-label="Steps done" />
    <span style="font-size: 12px; color: var(--o-text-3)">{{ done }} / 8 · ▼ your best</span>
  </div>
</Demo>

```vue
<OPips :done="3" :total="8" :marker="4.5" aria-label="Steps done" />

<span>
3 / 8 · ▼ your best
</span>
```

## Props

| Prop     | Type     | Default  | Description                       |
| -------- | -------- | -------- | --------------------------------- |
| `done`   | `number` | required |                                   |
| `total`  | `number` | required |                                   |
| `marker` | `number` | —        | A point to compare with, in steps |
