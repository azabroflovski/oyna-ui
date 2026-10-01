<script setup lang="ts">
import OSurface from '../Surface/Surface.vue'

withDefaults(
  defineProps<{
    /** Element to render. */
    as?: string
    /** A ring that means something: `accent` is the main thing, `danger` is something at stake. */
    signal?: 'accent' | 'danger'
    /** A small caption over the card: what the card is about. */
    label?: string
    /** A heading in display type. */
    title?: string
    /** The element of the title; pick the heading level that fits your page. */
    titleAs?: string
  }>(),
  { titleAs: 'h3' },
)

defineSlots<{
  default?: () => unknown
  /** At the right end of the header: a badge, a button, a menu. */
  actions?: () => unknown
  /** Under the content, after a line: totals, a link to more. */
  footer?: () => unknown
}>()
</script>

<template>
  <OSurface class="o-card" :as strong :signal>
    <header v-if="label || title || $slots.actions" class="o-card__head">
      <div class="o-card__titles">
        <span v-if="label" class="o-card__label">{{ label }}</span>
        <component :is="titleAs" v-if="title" class="o-card__title">{{ title }}</component>
      </div>
      <div v-if="$slots.actions" class="o-card__actions"><slot name="actions" /></div>
    </header>
    <slot />
    <footer v-if="$slots.footer" class="o-card__footer"><slot name="footer" /></footer>
  </OSurface>
</template>

<style>
.o-card {
  padding: 20px;
}

.o-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.o-card__titles {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.o-card__label {
  font: 700 11px/1.4 var(--o-font-sans);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.o-card__title {
  margin: 0;
  font: 700 24px/1.1 var(--o-font-display);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.o-card__actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* a line between two parts of one card, not a border around a box */
.o-card__footer {
  margin-top: 16px;
  padding-top: 14px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08);
  font-size: 13px;
  color: var(--o-text-2);
}
</style>
