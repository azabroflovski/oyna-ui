<script setup lang="ts" generic="T extends string">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui'
import { ref } from 'vue'

import { useLayer } from '../../composables/layers'
import { useSplitAttrs } from '../../composables/splitAttrs'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** `hint` is a dim note at the end of an option, e.g. a code or an offset. */
    items: readonly { value: T; label: string; hint?: string; disabled?: boolean }[]
    placeholder?: string
    disabled?: boolean
    /** Shown in the list when nothing matches what was typed. */
    emptyText?: string
  }>(),
  { emptyText: 'Nothing found' },
)

const model = defineModel<T>()
// `class` and `style` go to the wrapper; `aria-label`, `name` and the rest to the field itself
const attrs = useSplitAttrs()

// the field shows the label of the chosen item, not its value
const labelOf = (value: T | undefined) => props.items.find((item) => item.value === value)?.label ?? ''

const open = ref(false)
useLayer(open)

// the old label is selected on focus, so typing replaces it instead of adding to it
function selectText(event: FocusEvent) {
  if (event.target instanceof HTMLInputElement) event.target.select()
}
</script>

<template>
  <ComboboxRoot v-model="model" v-model:open="open" :disabled open-on-click>
    <ComboboxAnchor class="o-combobox" v-bind="attrs.root">
      <ComboboxInput
        class="o-input o-combobox__input"
        v-bind="attrs.control"
        :display-value="labelOf"
        :placeholder
        autocomplete="off"
        @focus="selectText"
      />
      <ComboboxTrigger class="o-combobox__trigger" tabindex="-1" aria-label="Show the list">
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </ComboboxTrigger>
    </ComboboxAnchor>
    <ComboboxPortal>
      <ComboboxContent
        class="o-select__list o-combobox__list"
        position="popper"
        :side-offset="8"
        :collision-padding="8"
      >
        <ComboboxViewport>
          <ComboboxEmpty class="o-combobox__empty">{{ emptyText }}</ComboboxEmpty>
          <ComboboxItem
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            :text-value="item.label"
            :disabled="item.disabled"
            class="o-select__option"
          >
            <span>{{ item.label }}</span>
            <span v-if="item.hint" class="o-select__hint">{{ item.hint }}</span>
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<style>
/* a field you type in, with the list of a select under it: the list reuses the select's classes */
.o-combobox {
  position: relative;
  display: flex;
  width: 100%;
}

.o-combobox__input {
  padding-right: 36px;
}

.o-combobox__trigger {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 36px;
  margin: 0;
  padding: 0 12px;
  border: 0;
  background: none;
  color: var(--o-text-3);
  cursor: pointer;
}

.o-combobox__trigger:disabled {
  cursor: default;
}

.o-combobox__trigger svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* both classes: the select's own sizes come later in the stylesheet and would win otherwise */
.o-select__list.o-combobox__list {
  min-width: var(--reka-combobox-trigger-width);
  max-height: min(var(--reka-combobox-content-available-height), 320px);
}

.o-combobox__empty {
  padding: 8px 14px;
  color: var(--o-text-3);
}
</style>
