<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'

import { useSplitAttrs } from '../../composables/splitAttrs'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    min?: number
    max?: number
    step?: number
    disabled?: boolean
  }>(),
  { min: 0, max: 100, step: 1 },
)

const model = defineModel<number>({ default: 0 })
// `class` and `style` go to the track's wrapper; `aria-label` and the rest to the thumb, which is the control
const attrs = useSplitAttrs()

// Reka's slider holds a list of values, one per thumb; this one has a single thumb
function update(values: number[] | undefined) {
  if (values?.[0] !== undefined) model.value = values[0]
}
</script>

<template>
  <SliderRoot
    class="o-slider"
    v-bind="attrs.root"
    :model-value="[model]"
    :min
    :max
    :step
    :disabled
    @update:model-value="update"
  >
    <SliderTrack class="o-slider__track">
      <SliderRange class="o-slider__range" />
    </SliderTrack>
    <SliderThumb class="o-slider__thumb" v-bind="attrs.control" />
  </SliderRoot>
</template>

<style>
.o-slider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
}

.o-slider__track {
  position: relative;
  flex-grow: 1;
  height: 6px;
  border-radius: 999px;
  background: var(--o-fill-3);
}

.o-slider__range {
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background: var(--o-accent);
}

/* the thumb follows the pointer at once: a transition here would lag behind the hand */
.o-slider__thumb {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--o-text);
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.5);
}

.o-slider__thumb:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-slider[data-disabled] {
  opacity: 0.4;
  cursor: default;
}

/* touch: the thumb is a bigger target than it draws */
@media (pointer: coarse) {
  .o-slider__thumb::after {
    content: '';
    position: absolute;
    inset: -13px;
  }
}
</style>
