<script setup lang="ts" generic="T extends string">
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { computed, ref } from 'vue'

import { useLayer } from '../../composables/layers'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  /** `hint` is a dim note at the end of an option, e.g. a code or a shortcut. */
  items: readonly { value: T; label: string; hint?: string; disabled?: boolean }[]
  placeholder?: string
  disabled?: boolean
}>()

const model = defineModel<T>()
// the list is not rendered while closed, so the trigger takes the label from the items itself
const current = computed(() => props.items.find((item) => item.value === model.value))

// typing in an open list searches it; page hotkeys must not fire on those keys
const open = ref(false)
useLayer(open)
</script>

<template>
  <SelectRoot v-model="model" v-model:open="open" :disabled>
    <SelectTrigger class="o-select" v-bind="$attrs">
      <SelectValue>{{ current?.label ?? placeholder }}</SelectValue>
      <svg class="o-select__chevron" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2.5 4.5 6 8l3.5-3.5" />
      </svg>
    </SelectTrigger>
    <SelectPortal>
      <SelectContent class="o-select__list" position="popper" :side-offset="8" :collision-padding="8">
        <SelectViewport>
          <SelectItem
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            :disabled="item.disabled"
            class="o-select__option"
          >
            <SelectItemText>{{ item.label }}</SelectItemText>
            <span v-if="item.hint" class="o-select__hint">{{ item.hint }}</span>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style>
.o-select {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 8px 14px;
  border: 0;
  border-radius: 999px;
  background: var(--o-fill-2);
  color: var(--o-text);
  font: 400 14px/1.4 var(--o-font-sans);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--o-duration) ease;
}

.o-select:hover,
.o-select[data-state='open'] {
  background: var(--o-fill-3);
}

.o-select:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-select[data-placeholder] {
  color: var(--o-text-3);
}

.o-select:disabled {
  opacity: 0.4;
  cursor: default;
}

.o-select__chevron {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes o-select-in {
  from {
    opacity: 0;
  }
}

.o-select__list {
  z-index: 110;
  box-sizing: border-box;
  min-width: max(var(--reka-select-trigger-width), 160px);
  max-height: min(var(--reka-select-content-available-height), 320px);
  overflow-y: auto;
  padding: 6px 0;
  border-radius: 12px;
  background: var(--o-layer);
  box-shadow: 0 16px 40px rgb(0 0 0 / 0.5);
  color: var(--o-text-2);
  font: 400 14px/1.4 var(--o-font-sans);
  animation: o-select-in var(--o-duration) ease;
}

.o-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 14px;
  outline: none;
  cursor: pointer;
  user-select: none;
}

.o-select__option[data-highlighted] {
  background: var(--o-fill-2);
  color: var(--o-text);
}

.o-select__option[data-state='checked'] {
  color: var(--o-text);
  font-weight: 600;
}

.o-select__option[data-disabled] {
  opacity: 0.4;
  cursor: default;
}

.o-select__hint {
  font-size: 12px;
  font-weight: 400;
  color: var(--o-text-3);
}
</style>
