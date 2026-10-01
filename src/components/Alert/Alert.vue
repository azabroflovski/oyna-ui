<script setup lang="ts">
defineProps<{
  /** What happened, in a few words. */
  title?: string
  /** `accent`: good news, or the thing to do next. `danger`: something is wrong or at stake. */
  tone?: 'accent' | 'danger'
  /** Shows a close button; it emits `close`, hiding the alert is up to you. */
  closable?: boolean
}>()

defineEmits<{ close: [] }>()

// role in the template: a danger alert interrupts a screen reader, the others wait for a pause

defineSlots<{
  /** The details. */
  default?: () => unknown
  /** An icon before the text; it takes the colour of the tone. */
  icon?: () => unknown
  /** One or two buttons: what to do about it. */
  actions?: () => unknown
}>()
</script>

<template>
  <div class="o-alert" :class="tone && `o-alert--${tone}`" :role="tone === 'danger' ? 'alert' : 'status'">
    <span v-if="$slots.icon" class="o-alert__icon" aria-hidden="true"><slot name="icon" /></span>
    <div class="o-alert__body">
      <p v-if="title" class="o-alert__title">{{ title }}</p>
      <div v-if="$slots.default" class="o-alert__text"><slot /></div>
      <div v-if="$slots.actions" class="o-alert__actions"><slot name="actions" /></div>
    </div>
    <button v-if="closable" type="button" class="o-alert__close" aria-label="Dismiss" @click="$emit('close')">
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
    </button>
  </div>
</template>

<style>
.o-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--o-radius);
  background: var(--o-surface-strong);
  color: var(--o-text);
  font: 400 14px/20px var(--o-font-sans);
}

/* a toned alert is a signal, so it gets the ring: the same language as a signalled surface */
.o-alert--accent {
  background: color-mix(in srgb, var(--o-accent) 7%, transparent);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--o-accent) 45%, transparent);
}

.o-alert--danger {
  background: color-mix(in srgb, var(--o-danger) 8%, transparent);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--o-danger) 45%, transparent);
}

.o-alert__icon {
  flex-shrink: 0;
  display: flex;
  color: var(--o-text-2);
}

.o-alert--accent .o-alert__icon {
  color: var(--o-accent);
}

.o-alert--danger .o-alert__icon {
  color: var(--o-danger);
}

.o-alert__icon svg {
  width: 20px;
  height: 20px;
}

.o-alert__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.o-alert__title {
  margin: 0;
  font-weight: 700;
}

.o-alert__text {
  color: var(--o-text-2);
}

.o-alert__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.o-alert__close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin: -2px -4px 0 0;
  padding: 4px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--o-text-3);
  cursor: pointer;
  transition:
    background-color var(--o-duration) ease,
    color var(--o-duration) ease;
}

.o-alert__close:hover {
  background: var(--o-fill-2);
  color: var(--o-text);
}

.o-alert__close:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-alert__close svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
}
</style>
