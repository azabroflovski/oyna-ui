<script setup>
import { ref } from 'vue'

const left = ref(72)
</script>

# Progress

How much is done, or how much is left.

<Demo>
  <OProgress :value="72" aria-label="Storage used" style="width: 260px" />
</Demo>

```vue
<OProgress :value="72" aria-label="Storage used" />
```

The bar takes the width of its container. Give it an `aria-label`: a bar has no text of its own.

## Running out

Switch the tone to `danger` when what is left gets low. The threshold is yours to pick.

<Demo>
  <OProgress :value="left" :tone="left < 30 ? 'danger' : 'accent'" aria-label="Time left" style="width: 260px" />
  <OButton size="sm" @click="left = Math.max(0, left - 15)">−15</OButton>
  <OButton size="sm" @click="left = 100">Reset</OButton>
</Demo>

```vue
<OProgress :value="left" :tone="left < 30 ? 'danger' : 'accent'" aria-label="Time left" />
```

## Props

| Prop    | Type                   | Default    | Description |
| ------- | ---------------------- | ---------- | ----------- |
| `value` | `number`               | required   |             |
| `max`   | `number`               | `100`      |             |
| `tone`  | `'accent' \| 'danger'` | `'accent'` |             |
