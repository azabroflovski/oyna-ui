<script setup lang="ts">
import { useSplitAttrs } from '../../composables/splitAttrs'

defineOptions({ inheritAttrs: false })

defineProps<{
  disabled?: boolean
}>()

const model = defineModel<boolean>({ default: false })
const parts = useSplitAttrs()
</script>

<template>
  <label class="o-checkbox" v-bind="parts.root">
    <input v-model="model" type="checkbox" class="o-checkbox__input" :disabled v-bind="parts.control" />
    <span class="o-checkbox__box" aria-hidden="true">
      <svg viewBox="0 0 12 12"><path d="M2.5 6.5 5 9l4.5-5.5" /></svg>
    </span>
    <span v-if="$slots.default" class="o-checkbox__label"><slot /></span>
  </label>
</template>

<style>
.o-checkbox {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--o-text);
  font: 400 14px/20px var(--o-font-sans);
  cursor: pointer;
}

/* the real checkbox stays in place, invisible, so the keyboard and screen readers use it */
.o-checkbox__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.o-checkbox__box {
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--o-fill-2);
  /* the edge of an input: one of the allowed 1px lines; strong enough to show an empty box by itself */
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4);
  color: transparent;
  transition:
    background-color var(--o-duration) ease,
    box-shadow var(--o-duration) ease;
}

.o-checkbox__box svg {
  display: block;
  width: 100%;
  height: 100%;
  padding: 3px;
  box-sizing: border-box;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.o-checkbox__input:checked + .o-checkbox__box {
  background: var(--o-accent);
  box-shadow: none;
  color: var(--o-on-accent);
}

.o-checkbox__input:focus-visible + .o-checkbox__box {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-checkbox:has(.o-checkbox__input:disabled) {
  opacity: 0.4;
  cursor: default;
}
</style>
