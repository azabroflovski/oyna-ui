<script setup lang="ts">
withDefaults(defineProps<{
  /** Element to render. */
  as?: string
  /** A darker fill, for text-heavy content over a busy background. */
  strong?: boolean
  /** A ring that means something: `accent` is the main thing, `danger` is something at stake. */
  signal?: 'accent' | 'danger'
}>(), { as: 'div' })
</script>

<template>
  <component :is="as" class="o-surface" :class="[strong && 'o-surface--strong', signal && `o-surface--${signal}`]">
    <slot />
  </component>
</template>

<style>
.o-surface {
  border-radius: var(--o-radius);
  background: var(--o-surface);
  color: var(--o-text);
  font-family: var(--o-font-sans);
}

.o-surface--strong {
  background: var(--o-surface-strong);
}

.o-surface--accent {
  background: color-mix(in srgb, var(--o-accent) 7%, transparent);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--o-accent) 45%, transparent);
}

.o-surface--danger {
  background: color-mix(in srgb, var(--o-danger) 8%, transparent);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--o-danger) 45%, transparent);
}
</style>
