<script setup lang="ts">
withDefaults(
  defineProps<{
    /** `plain`: bold text in a sentence. `outline`: a key inside a control. `cap`: a key cap on its own. */
    variant?: 'plain' | 'outline' | 'cap'
  }>(),
  { variant: 'plain' },
)
</script>

<template>
  <kbd class="o-kbd" :class="`o-kbd--${variant}`"><slot /></kbd>
</template>

<style>
.o-kbd {
  font-family: inherit;
  font-weight: 700;
}

.o-kbd--outline {
  padding: 0 6px;
  border-radius: 5px;
  font-size: 11px;
  /* the edge of a key: one of the allowed 1px lines */
  box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 40%, transparent);
}

.o-kbd--cap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 8px;
  border-radius: var(--o-radius-sm);
  background: var(--o-fill-3);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25);
  font-family: var(--o-font-display);
  font-size: 24px;
}
</style>
