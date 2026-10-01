<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Oldest first. */
  values: readonly number[]
  /** What the chart shows, for screen readers. */
  label: string
  width?: number
  height?: number
  /** Smaller values sit higher: times, ranks, errors. */
  lowerIsBetter?: boolean
}>(), { width: 240, height: 56 })

// room for the dot on the last point
const pad = 4

const points = computed(() => {
  const min = Math.min(...props.values)
  const span = Math.max(...props.values) - min || 1
  const stepX = (props.width - pad * 2) / Math.max(1, props.values.length - 1)
  return props.values.map((value, i) => {
    const fraction = (value - min) / span
    return {
      x: pad + i * stepX,
      y: pad + (props.lowerIsBetter ? fraction : 1 - fraction) * (props.height - pad * 2),
    }
  })
})
const polyline = computed(() => points.value.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '))
const last = computed(() => points.value.at(-1))
</script>

<template>
  <svg class="o-sparkline" :viewBox="`0 0 ${width} ${height}`" :width :height role="img" :aria-label="label">
    <polyline class="o-sparkline__line" :points="polyline" />
    <circle v-if="last" class="o-sparkline__dot" :cx="last.x" :cy="last.y" r="3.5" />
  </svg>
</template>

<style>
.o-sparkline {
  display: block;
  max-width: 100%;
  overflow: visible;
}

.o-sparkline__line {
  fill: none;
  stroke: rgb(255 255 255 / 0.45);
  stroke-width: 1.5;
  stroke-linejoin: round;
  stroke-linecap: round;
}

/* the latest value is the one that matters */
.o-sparkline__dot {
  fill: var(--o-accent);
}
</style>
