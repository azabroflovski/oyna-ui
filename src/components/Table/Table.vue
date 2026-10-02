<script setup lang="ts" generic="Row extends Record<string, unknown>">
import { computed, shallowRef } from 'vue'

import OContextMenu from '../ContextMenu/ContextMenu.vue'
import type { DropdownMenuItem } from '../DropdownMenu/DropdownMenu.vue'

const props = defineProps<{
  /**
   * `key` is usually a field of the row, but need not be: a column that is all slot (a menu of
   * actions) takes any name. `numeric` sets the column in the display face, right-aligned, with
   * figures that line up.
   */
  columns: readonly { key: string; label: string; numeric?: boolean }[]
  rows: readonly Row[]
  /** The field that identifies a row; by default its position. */
  rowKey?: keyof Row & string
  /** A ring for a row that means something: `accent` is the user's own row, `danger` is one at stake. */
  signal?: (row: Row) => 'accent' | 'danger' | undefined
  /** Lights the row under the pointer: for a table whose rows can be acted on. */
  hoverable?: boolean
  /** The actions of a row, opened by a right click on it. Give the same ones a visible place too. */
  rowMenu?: (row: Row) => readonly DropdownMenuItem[]
}>()

// One menu for the whole body, not one per row: the row under the pointer is noted on its way up,
// before the right click reaches the body and opens the menu.
const menuRow = shallowRef<Row>()
const menuItems = computed(() => (menuRow.value && props.rowMenu ? props.rowMenu(menuRow.value) : []))

defineSlots<Partial<Record<string, (props: { row: Row; value: unknown }) => unknown>>>()
</script>

<template>
  <table class="o-table" :class="hoverable && 'o-table--hoverable'">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" scope="col" :class="column.numeric && 'o-table__numeric'">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <OContextMenu :items="menuItems" :disabled="!rowMenu">
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="rowKey ? String(row[rowKey]) : index"
          :class="signal?.(row) && `o-table__row--${signal(row)}`"
          @contextmenu="menuRow = row"
        >
          <td v-for="column in columns" :key="column.key" :class="column.numeric && 'o-table__numeric'">
            <!-- a slot named after the column's key replaces the cell's content -->
            <slot :name="column.key" :row :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </OContextMenu>
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
  white-space: nowrap;
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
  /* "212 ms" must not break in a narrow table */
  white-space: nowrap;
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

/*
  The row under the pointer is lit a little: light, not movement. Only where there is a pointer that
  hovers: on a touch screen the light would stay on the last row touched.
*/
@media (hover: hover) {
  .o-table--hoverable td {
    transition: background-color var(--o-duration) ease;
  }

  .o-table--hoverable tbody tr:hover td {
    background: var(--o-fill-2);
  }

  /* a row with a signal keeps its colour and only gets brighter */
  .o-table--hoverable tbody .o-table__row--accent:hover td {
    background: color-mix(in srgb, var(--o-accent) 16%, transparent);
  }

  .o-table--hoverable tbody .o-table__row--danger:hover td {
    background: color-mix(in srgb, var(--o-danger) 14%, transparent);
  }
}
</style>
