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
  <label class="o-switch" v-bind="parts.root">
    <span v-if="$slots.default" class="o-switch__label"><slot /></span>
    <input v-model="model" type="checkbox" role="switch" class="o-switch__input" :disabled v-bind="parts.control">
    <span class="o-switch__track" aria-hidden="true"><span class="o-switch__thumb" /></span>
  </label>
</template>

<style>
.o-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--o-text);
  font: 400 14px/20px var(--o-font-sans);
  cursor: pointer;
}

/* the real checkbox stays over the track, invisible, so the keyboard and screen readers use it */
.o-switch__input {
  position: absolute;
  top: 50%;
  right: 0;
  width: 38px;
  height: 22px;
  margin: -11px 0 0;
  opacity: 0;
  cursor: inherit;
}

.o-switch__track {
  flex-shrink: 0;
  display: flex;
  box-sizing: border-box;
  width: 38px;
  height: 22px;
  padding: 3px;
  border-radius: 999px;
  background: var(--o-fill-3);
  transition: background-color var(--o-duration) ease;
}

/* the thumb changes sides at once: light, not movement */
.o-switch__thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.7);
  transition: background-color var(--o-duration) ease;
}

.o-switch__input:checked + .o-switch__track {
  justify-content: flex-end;
  background: var(--o-accent);
}

.o-switch__input:checked + .o-switch__track .o-switch__thumb {
  background: var(--o-on-accent);
}

.o-switch__input:focus-visible + .o-switch__track {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-switch:has(.o-switch__input:disabled) {
  opacity: 0.4;
  cursor: default;
}
</style>
