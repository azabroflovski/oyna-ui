<script setup>
import { GitBranch } from '@lucide/vue'
import { ref } from 'vue'

const filters = ref(['production', 'failing', 'Frankfurt'])
const all = ['production', 'failing', 'Frankfurt']
</script>

# Tag

Something the user applied and can take off: a filter, a label, a recipient.

<Demo>
  <OTag>production</OTag>
  <OTag tone="accent">v1.4.1</OTag>
  <OTag tone="danger">failing</OTag>
  <OTag><GitBranch /> main</OTag>
  <OTag removable>removable</OTag>
</Demo>

```vue
<OTag>production</OTag>
<OTag tone="accent">v1.4.1</OTag>
<OTag tone="danger">failing</OTag>
<OTag><GitBranch /> main</OTag>
<OTag removable>removable</OTag>
```

## Removable

`removable` adds a remove button. It emits `remove`; taking the tag away is up to you. Give the button a name that says what goes: a screen reader hears only the button.

<Demo>
  <OTag v-for="filter in filters" :key="filter" removable :remove-label="`Remove the filter ${filter}`" @remove="filters = filters.filter(other => other !== filter)">
    {{ filter }}
  </OTag>
  <OButton v-if="filters.length < all.length" size="sm" variant="ghost" @click="filters = [...all]">Reset</OButton>
</Demo>

```vue
<OTag
  v-for="filter in filters"
  :key="filter"
  removable
  :remove-label="`Remove the filter ${filter}`"
  @remove="remove(filter)"
>
  {{ filter }}
</OTag>
```

## Tag or badge

They look alike on purpose and differ in one thing: who put it there.

- **Tag** — the user did: a filter, a label. It can usually be removed. Squarer corners.
- **[Badge](/components/badge)** — the system did: a status, a plan, a count. It cannot be removed. A pill.

For a choice that is on or off, use a [toggle](/components/toggle).

## Props

| Prop          | Type                   | Default    | Description                                      |
| ------------- | ---------------------- | ---------- | ------------------------------------------------ |
| `tone`        | `'accent' \| 'danger'` | —          |                                                  |
| `removable`   | `boolean`              | `false`    | Shows a remove button that emits `remove`        |
| `removeLabel` | `string`               | `'Remove'` | The name of the remove button for screen readers |
