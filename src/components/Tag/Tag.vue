<script setup lang="ts">
defineProps<{
  tone?: 'accent' | 'danger'
  /** Shows a remove button; it emits `remove`, taking the tag away is up to you. */
  removable?: boolean
  /** What the remove button is called for screen readers; by default "Remove". */
  removeLabel?: string
}>()

defineEmits<{ remove: [] }>()
</script>

<template>
  <span class="o-tag" :class="tone && `o-tag--${tone}`">
    <slot />
    <button
      v-if="removable"
      type="button"
      class="o-tag__remove"
      :aria-label="removeLabel ?? 'Remove'"
      @click="$emit('remove')"
    >
      <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" /></svg>
    </button>
  </span>
</template>

<style>
/* squarer than a badge, so the two are told apart: a badge is a status, a tag is something applied */
.o-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: var(--o-radius-sm);
  background: var(--o-fill-2);
  color: var(--o-text);
  font: 600 13px/1.4 var(--o-font-sans);
  white-space: nowrap;
}

.o-tag svg {
  flex-shrink: 0;
  width: 1.1em;
  height: 1.1em;
}

.o-tag--accent {
  background: color-mix(in srgb, var(--o-accent) 15%, transparent);
  color: var(--o-accent);
}

.o-tag--danger {
  background: color-mix(in srgb, var(--o-danger) 15%, transparent);
  color: var(--o-danger);
}

.o-tag__remove {
  display: flex;
  margin: 0 -3px 0 0;
  padding: 2px;
  border: 0;
  border-radius: 5px;
  background: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  transition:
    background-color var(--o-duration) ease,
    opacity var(--o-duration) ease;
}

.o-tag__remove:hover {
  background: rgb(255 255 255 / 0.12);
  opacity: 1;
}

.o-tag__remove:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 1px;
  opacity: 1;
}

.o-tag__remove svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}
</style>
