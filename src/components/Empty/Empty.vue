<script setup lang="ts">
defineProps<{
  /** What is missing, in a few words. */
  title: string
}>()

defineSlots<{
  /** Why it is empty, or what to do about it. */
  default?: () => unknown
  /** An icon above the title. */
  icon?: () => unknown
  /** One or two buttons: the way out of the empty state. */
  actions?: () => unknown
}>()
</script>

<template>
  <div class="o-empty">
    <span v-if="$slots.icon" class="o-empty__icon" aria-hidden="true"><slot name="icon" /></span>
    <p class="o-empty__title">{{ title }}</p>
    <p v-if="$slots.default" class="o-empty__text"><slot /></p>
    <div v-if="$slots.actions" class="o-empty__actions"><slot name="actions" /></div>
  </div>
</template>

<style>
.o-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 32px 20px;
  color: var(--o-text);
  font-family: var(--o-font-sans);
  text-align: center;
}

.o-empty__icon {
  display: flex;
  margin-bottom: 6px;
  color: var(--o-text-3);
}

.o-empty__icon svg {
  width: 32px;
  height: 32px;
}

.o-empty__title {
  margin: 0;
  font: 700 24px/1.1 var(--o-font-display);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.o-empty__text {
  max-width: 44ch;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--o-text-2);
}

.o-empty__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
}
</style>
