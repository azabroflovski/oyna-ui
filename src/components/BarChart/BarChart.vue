<script
  setup
  lang="ts"
  generic="Item extends { value: number; label: string; display?: string; tone?: 'accent' | 'danger'; dot?: boolean }"
>
import { computed } from 'vue'

const props = defineProps<{
  /**
   * `display` is the value as text (`'1.42 s'`); by default the number itself. `tone` colours one
   * bar: the best, or the one to look at. `dot` marks a bar where something happened.
   */
  items: readonly Item[]
}>()

defineSlots<{
  /** What stands under a bar instead of its label: an icon, an avatar. */
  label?: (props: { item: Item }) => unknown
}>()

/** Many bars get thin, without the text above and below; the values stay in the hover titles. */
const dense = computed(() => props.items.length > 12)
const highest = computed(() => Math.max(...props.items.map((item) => item.value), 0) || 1)
const text = (item: Item) => item.display ?? String(item.value)
</script>

<template>
  <ul class="o-bar-chart" :class="dense && 'o-bar-chart--dense'">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="o-bar-chart__item"
      :title="`${item.label} — ${text(item)}`"
      :aria-label="`${item.label}: ${text(item)}`"
    >
      <span v-if="!dense" class="o-bar-chart__value" :class="item.tone && `o-bar-chart__value--${item.tone}`">{{
        text(item)
      }}</span>
      <span class="o-bar-chart__track">
        <span
          class="o-bar-chart__bar"
          :class="item.tone && `o-bar-chart__bar--${item.tone}`"
          :style="{ height: `${(Math.max(0, item.value) / highest) * 100}%` }"
        >
          <span v-if="item.dot" class="o-bar-chart__dot" />
        </span>
      </span>
      <span v-if="!dense" class="o-bar-chart__label">
        <slot name="label" :item>{{ item.label }}</slot>
      </span>
    </li>
  </ul>
</template>

<style>
.o-bar-chart {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 14px;
  height: var(--o-bar-chart-height, 180px);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--o-font-sans);
}

.o-bar-chart--dense {
  gap: 4px;
}

.o-bar-chart__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: 0;
}

.o-bar-chart__value {
  font: 700 18px/1 var(--o-font-display);
  font-variant-numeric: tabular-nums;
  color: var(--o-text-2);
  white-space: nowrap;
}

.o-bar-chart__value--accent {
  color: var(--o-accent);
}

.o-bar-chart__value--danger {
  color: var(--o-danger);
}

.o-bar-chart__track {
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  align-items: flex-end;
}

.o-bar-chart__bar {
  position: relative;
  width: 100%;
  min-height: 2px;
  border-radius: 8px 8px 2px 2px;
  background: var(--o-fill-4);
  transition: height var(--o-duration) ease;
}

.o-bar-chart__bar--accent {
  background: var(--o-accent);
}

.o-bar-chart__bar--danger {
  background: var(--o-danger);
}

.o-bar-chart__dot {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 8px;
  height: 8px;
  margin-left: -4px;
  border-radius: 50%;
  background: var(--o-danger);
  box-shadow: 0 0 0 2px rgb(0 0 0 / 0.4);
}

/* on a coloured bar the dot turns dark, or it would vanish into the bar */
.o-bar-chart__bar[class*='o-bar-chart__bar--'] .o-bar-chart__dot {
  background: var(--o-on-accent);
  box-shadow: none;
}

.o-bar-chart__label {
  max-width: 100%;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.4;
  color: var(--o-text-3);
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
