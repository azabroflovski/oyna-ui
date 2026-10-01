<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    max?: number
    /** `danger` when what is left is running out. */
    tone?: 'accent' | 'danger'
  }>(),
  { max: 100, tone: 'accent' },
)

const percent = computed(() => Math.min(1, Math.max(0, props.value / props.max)) * 100)
</script>

<template>
  <div
    class="o-progress"
    :class="`o-progress--${tone}`"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    :aria-valuemax="max"
  >
    <div class="o-progress__bar" :style="{ width: `${percent}%` }" />
  </div>
</template>

<style>
.o-progress {
  height: 8px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.1);
  overflow: hidden;
}

.o-progress__bar {
  height: 100%;
  border-radius: inherit;
  background: var(--o-accent);
  transition:
    width var(--o-duration) ease,
    background-color var(--o-duration) ease;
}

.o-progress--danger .o-progress__bar {
  background: var(--o-danger);
}
</style>
