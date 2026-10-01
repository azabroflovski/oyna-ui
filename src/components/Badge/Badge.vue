<script setup lang="ts">
defineProps<{
  tone?: 'accent' | 'danger'
}>()
</script>

<template>
  <span class="o-badge" :class="tone && `o-badge--${tone}`"><slot /></span>
</template>

<style>
.o-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.06);
  color: var(--o-text);
  font: 400 13px/1.4 var(--o-font-sans);
  white-space: nowrap;
}

.o-badge--accent {
  background: color-mix(in srgb, var(--o-accent) 15%, transparent);
  color: var(--o-accent);
}

.o-badge--danger {
  background: color-mix(in srgb, var(--o-danger) 15%, transparent);
  color: var(--o-danger);
}
</style>
