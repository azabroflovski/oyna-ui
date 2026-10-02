<script setup>
import { computed, ref } from 'vue'

const page = ref(1)
const far = ref(10)
const size = 5
const columns = [
  { key: 'version', label: 'Version' },
  { key: 'when', label: 'When' },
  { key: 'by', label: 'By' },
]
const deploys = Array.from({ length: 23 }, (_, index) => ({
  version: `v1.${Math.floor((22 - index) / 10) + 2}.${(22 - index) % 10}`,
  when: index === 0 ? '2 h ago' : `${index + 1} days ago`,
  by: ['ada', 'grace', 'linus'][index % 3],
}))
const rows = computed(() => deploys.slice((page.value - 1) * size, page.value * size))
</script>

# Pagination

The way through a list too long for one screen: a row of page numbers with arrows at its ends.

<Demo>
  <div style="display: flex; flex-direction: column; gap: 12px; width: min(460px, 100%)">
    <OTable :columns="columns" :rows="rows" row-key="version" />
    <OPagination v-model:page="page" :total="deploys.length" :page-size="size" label="Deploys, pages" />
  </div>
</Demo>

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const page = ref(1)
const size = 5
const rows = computed(() => deploys.slice((page.value - 1) * size, page.value * size))
</script>

<template>
  <OTable :columns="columns" :rows="rows" row-key="version" />
  <OPagination v-model:page="page" :total="deploys.length" :page-size="size" />
</template>
```

It takes `total`, the number of items, not of pages, and works the pages out from `page-size`. It does not cut the list: show the rows of the current page yourself, as above, or ask the server for them.

## Many pages

The first and the last page are always shown; the far ones fold into a gap. `siblings` is how many pages stand on each side of the current one.

<Demo>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px">
    <OPagination v-model:page="far" :total="200" label="Pages, one on each side" />
    <OPagination v-model:page="far" :total="200" :siblings="2" label="Pages, two on each side" />
  </div>
</Demo>

```vue
<OPagination v-model:page="page" :total="200" />
<OPagination v-model:page="page" :total="200" :siblings="2" />
```

## Disabled

<Demo>
  <OPagination :total="50" disabled label="Pages, disabled" />
</Demo>

```vue
<OPagination :total="50" disabled />
```

## Props

| Prop           | Type      | Default           | Description                                                     |
| -------------- | --------- | ----------------- | --------------------------------------------------------------- |
| `total`        | `number`  | required          | How many items there are in all                                 |
| `v-model:page` | `number`  | `1`               | The current page, from 1                                        |
| `pageSize`     | `number`  | `10`              | Items on one page                                               |
| `siblings`     | `number`  | `1`               | Pages on each side of the current one                           |
| `disabled`     | `boolean` | `false`           |                                                                 |
| `label`        | `string`  | `'Pages'`         | What a screen reader calls it; make it differ if a page has two |
| `prevLabel`    | `string`  | `'Previous page'` | Name of the left arrow                                          |
| `nextLabel`    | `string`  | `'Next page'`     | Name of the right arrow                                         |

Built on [Reka UI](https://reka-ui.com) Pagination.
