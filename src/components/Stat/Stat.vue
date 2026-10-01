<script setup lang="ts">
defineProps<{
  label: string
  /** Colours the value: `accent` for the best or the user's own, `danger` for what needs attention. */
  tone?: 'accent' | 'danger'
}>()
</script>

<template>
  <div class="o-stat">
    <span class="o-stat__label">{{ label }}</span>
    <span class="o-stat__value" :class="tone && `o-stat__value--${tone}`"><slot /></span>
  </div>
</template>

<style>
.o-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--o-surface);
  color: var(--o-text);
}

.o-stat__label {
  font: 700 11px/1.4 var(--o-font-sans);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.o-stat__value {
  font: 700 28px/1 var(--o-font-display);
  font-variant-numeric: tabular-nums;
  /* "212 ms" must not break in a narrow tile */
  white-space: nowrap;
}

.o-stat__value--accent {
  color: var(--o-accent);
}

.o-stat__value--danger {
  color: var(--o-danger);
}
</style>
