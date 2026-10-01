<script setup lang="ts" generic="Row extends Record<string, unknown>">
defineProps<{
  /** `numeric` sets the column in the display face, right-aligned, with figures that line up. */
  columns: readonly { key: keyof Row & string, label: string, numeric?: boolean }[]
  rows: readonly Row[]
  /** The field that identifies a row; by default its position. */
  rowKey?: keyof Row & string
  /** A ring for a row that means something: `accent` is the user's own row, `danger` is one at stake. */
  signal?: (row: Row) => 'accent' | 'danger' | undefined
}>()

defineSlots<Partial<Record<string, (props: { row: Row, value: unknown }) => unknown>>>()
</script>

<template>
  <table class="o-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" scope="col" :class="column.numeric && 'o-table__numeric'">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in rows"
        :key="rowKey ? String(row[rowKey]) : index"
        :class="signal?.(row) && `o-table__row--${signal(row)}`"
      >
        <td v-for="column in columns" :key="column.key" :class="column.numeric && 'o-table__numeric'">
          <!-- a slot named after the column's key replaces the cell's content -->
          <slot :name="column.key" :row :value="row[column.key]">
            {{ row[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.o-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: var(--o-text);
  font: 400 14px/1.4 var(--o-font-sans);
}

.o-table th {
  padding: 8px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.o-table td {
  padding: 10px 12px;
}

/* rows are told apart by stripes, not by lines */
.o-table tbody tr:nth-child(odd) td {
  background: var(--o-fill-1);
}

.o-table td:first-child {
  border-radius: var(--o-radius-sm) 0 0 var(--o-radius-sm);
}

.o-table td:last-child {
  border-radius: 0 var(--o-radius-sm) var(--o-radius-sm) 0;
}

.o-table th.o-table__numeric,
.o-table td.o-table__numeric {
  text-align: right;
}

.o-table td.o-table__numeric {
  font: 700 20px/1 var(--o-font-display);
  font-variant-numeric: tabular-nums;
}

.o-table tr[class*='o-table__row--'] {
  border-radius: var(--o-radius-sm);
  outline-style: solid;
  outline-width: 2px;
  outline-offset: -2px;
}

.o-table .o-table__row--accent {
  outline-color: color-mix(in srgb, var(--o-accent) 45%, transparent);
}

.o-table tbody .o-table__row--accent td {
  background: color-mix(in srgb, var(--o-accent) 10%, transparent);
}

.o-table .o-table__row--danger {
  outline-color: color-mix(in srgb, var(--o-danger) 45%, transparent);
}

.o-table tbody .o-table__row--danger td {
  background: color-mix(in srgb, var(--o-danger) 8%, transparent);
}
</style>
