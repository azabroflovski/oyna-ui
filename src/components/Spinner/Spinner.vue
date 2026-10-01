<script setup lang="ts">
withDefaults(
  defineProps<{
    /** What is loading, for screen readers. */
    label?: string
  }>(),
  { label: 'Loading' },
)
</script>

<template>
  <span class="o-spinner" role="status" :aria-label="label">
    <span class="o-spinner__dot" />
    <span class="o-spinner__dot" />
    <span class="o-spinner__dot" />
  </span>
</template>

<style>
/* three dots that light up in turn: light, not movement. Sized by the font size around it. */
.o-spinner {
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  vertical-align: middle;
}

.o-spinner__dot {
  width: 0.35em;
  height: 0.35em;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.25;
  animation: o-spinner 1s ease-in-out infinite;
}

.o-spinner__dot:nth-child(2) {
  animation-delay: 0.15s;
}

.o-spinner__dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes o-spinner {
  30% {
    opacity: 1;
  }
}

/* a loop is not a transition, so --o-duration does not stop it: it is stopped here */
@media (prefers-reduced-motion: reduce) {
  .o-spinner__dot {
    opacity: 0.6;
    animation: none;
  }
}
</style>
