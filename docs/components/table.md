<script setup>
const columns = [
  { key: 'place', label: '#' },
  { key: 'name', label: 'Name' },
  { key: 'runs', label: 'Runs', numeric: true },
  { key: 'best', label: 'Best', numeric: true },
]
const rows = [
  { place: 1, name: 'ada', runs: 214, best: '18.42' },
  { place: 2, name: 'grace', runs: 97, best: '19.06' },
  { place: 3, name: 'you', runs: 152, best: '19.31' },
  { place: 4, name: 'linus', runs: 61, best: '20.74' },
  { place: 5, name: 'margaret', runs: 12, best: '22.10' },
]
</script>

# Table

Rows of the same kind. Rows are told apart by stripes, not by lines. Numeric columns are set in the display face with figures that line up.

<Demo style="justify-content: stretch">
  <OTable :columns="columns" :rows="rows" row-key="name" :signal="row => row.name === 'you' ? 'accent' : undefined" style="width: 100%">
    <template #name="{ row, value }">
      <b>{{ value }}</b> <OBadge v-if="row.place === 1" tone="accent">Leader</OBadge>
    </template>
  </OTable>
</Demo>

```vue
<script setup lang="ts">
const columns = [
  { key: 'place', label: '#' },
  { key: 'name', label: 'Name' },
  { key: 'runs', label: 'Runs', numeric: true },
  { key: 'best', label: 'Best', numeric: true },
]
const rows = [
  { place: 1, name: 'ada', runs: 214, best: '18.42' },
  { place: 2, name: 'grace', runs: 97, best: '19.06' },
  { place: 3, name: 'you', runs: 152, best: '19.31' },
]
</script>

<template>
  <OTable :columns="columns" :rows="rows" row-key="name" :signal="(row) => (row.name === 'you' ? 'accent' : undefined)">
    <template #name="{ row, value }">
      <b>{{ value }}</b> <OBadge v-if="row.place === 1" tone="accent"> Leader </OBadge>
    </template>
  </OTable>
</template>
```

## Signal

`signal` gives a row a ring: `accent` for the user's own row, `danger` for one at stake. One row, rarely two.

## Cells

A slot named after a column's `key` draws that column's cells. It gets the `row` and the cell's `value`.

A column need not be a field of the row. For a column of buttons or a menu, give it any `key` and draw it with the slot:

```vue
<OTable :columns="[...columns, { key: 'actions', label: 'Actions' }]" :rows="rows">
  <template #actions="{ row }">
    <OButton size="sm" @click="open(row)">Open</OButton>
  </template>
</OTable>
```

## Props

| Prop      | Type                                                  | Default  | Description                           |
| --------- | ----------------------------------------------------- | -------- | ------------------------------------- |
| `columns` | `{ key: string, label: string, numeric?: boolean }[]` | required |                                       |
| `rows`    | `object[]`                                            | required |                                       |
| `rowKey`  | `string`                                              | position | The field that identifies a row       |
| `signal`  | `(row) => 'accent' \| 'danger' \| undefined`          | —        | A ring for a row that means something |

The table does not sort, page or scroll by itself. On a narrow screen, wrap it in an element with `overflow-x: auto`.
