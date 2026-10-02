<script setup lang="ts">
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'reka-ui'

withDefaults(
  defineProps<{
    /** How many items there are in all, not how many pages. */
    total: number
    /** Items on one page. */
    pageSize?: number
    /** Pages shown on each side of the current one before the rest folds into "…". */
    siblings?: number
    disabled?: boolean
    /** What a screen reader calls the whole control and its two arrows. */
    label?: string
    prevLabel?: string
    nextLabel?: string
  }>(),
  { pageSize: 10, siblings: 1, label: 'Pages', prevLabel: 'Previous page', nextLabel: 'Next page' },
)

const page = defineModel<number>('page', { default: 1 })
</script>

<template>
  <PaginationRoot
    v-model:page="page"
    :total
    :items-per-page="pageSize"
    :sibling-count="siblings"
    :disabled
    show-edges
    as="nav"
    class="o-pagination"
    :aria-label="label"
  >
    <PaginationList v-slot="{ items }" class="o-pagination__list">
      <PaginationPrev class="o-pagination__page o-pagination__arrow" :aria-label="prevLabel">
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M7.5 2.5 4 6l3.5 3.5" /></svg>
      </PaginationPrev>
      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem v-if="item.type === 'page'" :value="item.value" class="o-pagination__page">
          {{ item.value }}
        </PaginationListItem>
        <PaginationEllipsis v-else class="o-pagination__gap">…</PaginationEllipsis>
      </template>
      <PaginationNext class="o-pagination__page o-pagination__arrow" :aria-label="nextLabel">
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5 8 6 4.5 9.5" /></svg>
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>

<style>
.o-pagination {
  font-family: var(--o-font-sans);
}

.o-pagination__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.o-pagination__page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 32px;
  height: 32px;
  margin: 0;
  padding: 0 8px;
  border: 0;
  border-radius: var(--o-radius-sm);
  background: none;
  color: var(--o-text-2);
  font: 600 13px/1 var(--o-font-sans);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition:
    background-color var(--o-duration) ease,
    color var(--o-duration) ease;
}

.o-pagination__page:hover {
  background: var(--o-fill-2);
  color: var(--o-text);
}

.o-pagination__page[data-selected] {
  background: rgb(255 255 255 / 0.14);
  color: var(--o-text);
}

.o-pagination__page:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: -2px;
}

.o-pagination__page:disabled {
  opacity: 0.4;
  background: none;
  cursor: default;
}

.o-pagination__arrow svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.o-pagination__gap {
  min-width: 20px;
  text-align: center;
  color: var(--o-text-3);
  font-size: 13px;
}

/* touch: bigger squares to hit */
@media (pointer: coarse) {
  .o-pagination__page {
    min-width: 40px;
    height: 40px;
  }
}
</style>
