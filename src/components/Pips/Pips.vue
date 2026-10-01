<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  done: number
  total: number
  /** A point to compare with, in steps (may be fractional): a previous best, a rival, a deadline. */
  marker?: number
}>()

// a pip is 14px and the gap 10px; the marker (12px wide) points at the boundary after `marker` pips
const markerLeft = computed(() => props.marker === undefined
  ? undefined
  : Math.min(Math.max(props.marker, 0), props.total) * 24 - 5 - 6)
</script>

<template>
  <div class="o-pips" role="progressbar" :aria-valuenow="done" aria-valuemin="0" :aria-valuemax="total">
    <span v-for="i in total" :key="i" class="o-pips__pip" :class="i <= done && 'o-pips__pip--done'" />
    <span v-if="markerLeft !== undefined" class="o-pips__marker" :style="{ left: `${markerLeft}px` }" />
  </div>
</template>

<style>
.o-pips {
  position: relative;
  display: inline-flex;
  gap: 10px;
  /* room for the marker above the row */
  padding-top: 14px;
}

.o-pips__pip {
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  /* an empty step is drawn as an outline: the shape itself, not a border around a box */
  box-shadow: inset 0 0 0 2px rgb(255 255 255 / 0.3);
  transition:
    background-color var(--o-duration) ease,
    box-shadow var(--o-duration) ease;
}

.o-pips__pip--done {
  background: var(--o-accent);
  box-shadow: inset 0 0 0 2px var(--o-accent);
}

.o-pips__marker {
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 9px solid rgb(255 255 255 / 0.85);
}
</style>
