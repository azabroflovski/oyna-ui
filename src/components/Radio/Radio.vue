<script setup lang="ts" generic="T extends string">
import { useId } from 'vue'

defineProps<{
  /** `hint` is a line of explanation under an option. */
  items: readonly { value: T; label: string; hint?: string; disabled?: boolean }[]
  /** The question the options answer. Without it, give the group an `aria-label`. */
  label?: string
  disabled?: boolean
}>()

const model = defineModel<T>()
// one name makes the inputs a group: arrow keys move between them
const name = useId()
</script>

<template>
  <fieldset class="o-radio" :disabled>
    <legend v-if="label" class="o-radio__legend">
      {{ label }}
    </legend>
    <label v-for="item in items" :key="item.value" class="o-radio__option">
      <input v-model="model" type="radio" class="o-radio__input" :name :value="item.value" :disabled="item.disabled" />
      <span class="o-radio__dot" aria-hidden="true" />
      <span class="o-radio__text">
        {{ item.label }}
        <span v-if="item.hint" class="o-radio__hint">{{ item.hint }}</span>
      </span>
    </label>
  </fieldset>
</template>

<style>
.o-radio {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--o-text);
  font: 400 14px/20px var(--o-font-sans);
}

.o-radio__legend {
  margin-bottom: 8px;
  padding: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.o-radio__option {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

/* the real radio stays in place, invisible, so the keyboard and screen readers use it */
.o-radio__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.o-radio__dot {
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--o-fill-2);
  /* the edge of an input: one of the allowed 1px lines */
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25);
  transition: box-shadow var(--o-duration) ease;
}

.o-radio__input:checked + .o-radio__dot {
  box-shadow: inset 0 0 0 6px var(--o-accent);
  background: var(--o-on-accent);
}

.o-radio__input:focus-visible + .o-radio__dot {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-radio__text {
  display: flex;
  flex-direction: column;
}

.o-radio__hint {
  font-size: 12px;
  line-height: 18px;
  color: var(--o-text-3);
}

.o-radio:disabled,
.o-radio__option:has(.o-radio__input:disabled) {
  opacity: 0.4;
}

.o-radio:disabled .o-radio__option,
.o-radio__option:has(.o-radio__input:disabled) {
  cursor: default;
}
</style>
