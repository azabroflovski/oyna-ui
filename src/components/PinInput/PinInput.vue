<script setup lang="ts">
import { PinInputInput, PinInputRoot } from 'reka-ui'
import { computed, inject } from 'vue'

import { fieldKey } from '../Field/context'

const props = withDefaults(
  defineProps<{
    /** How many characters the code has. */
    length?: number
    /** `numeric` takes digits only and brings up the number pad on a phone. */
    type?: 'numeric' | 'text'
    /** Splits the cells into groups of this many, for a code written as 123 456. */
    group?: number
    /** Hides what is typed, like a password. */
    mask?: boolean
    /** A danger ring. Inside an `OField` with an error it is set for you. */
    invalid?: boolean
    disabled?: boolean
  }>(),
  { length: 6, type: 'numeric' },
)

const emit = defineEmits<{
  /** Every cell is filled. */
  complete: [value: string]
}>()

/** The code as one string; shorter than `length` while it is being typed. */
const model = defineModel<string>({ default: '' })
const field = inject(fieldKey, undefined)

// Underneath, the code is a list of cells: strings, or numbers in numeric mode. Reka types the list
// by its `type` prop, which is not known here until run time, hence the cast.
const cells = computed({
  get: () => [...model.value].map((char) => (props.type === 'numeric' ? Number(char) : char)) as string[],
  set: (values: (string | number)[]) => (model.value = values.join('')),
})
// `otp` in the template lets a phone offer the code from a text message
const isInvalid = computed(() => props.invalid || field?.invalid.value || undefined)
</script>

<template>
  <PinInputRoot
    v-model="cells"
    class="o-pin-input"
    :type="type === 'numeric' ? 'number' : 'text'"
    :mask
    :disabled
    otp
    role="group"
    :aria-describedby="field?.messageId.value"
    @complete="emit('complete', $event.join(''))"
  >
    <PinInputInput
      v-for="index in length"
      :id="index === 1 ? field?.id : undefined"
      :key="index"
      :index="index - 1"
      class="o-pin-input__cell"
      :class="group && index > 1 && (index - 1) % group === 0 && 'o-pin-input__cell--gap'"
      :aria-label="`Character ${index} of ${length}`"
      :aria-invalid="isInvalid"
    />
  </PinInputRoot>
</template>

<style>
.o-pin-input {
  display: inline-flex;
  gap: 8px;
}

.o-pin-input__cell {
  box-sizing: border-box;
  width: 44px;
  height: 52px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--o-radius-sm);
  outline: none;
  background: var(--o-fill-2);
  /* the edge of an input: one of the allowed 1px lines */
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15);
  color: var(--o-text);
  caret-color: var(--o-accent);
  font: 700 28px/1 var(--o-font-display);
  text-align: center;
  transition: box-shadow var(--o-duration) ease;
}

/* the start of the next group */
.o-pin-input__cell--gap {
  margin-left: 12px;
}

.o-pin-input__cell:focus {
  box-shadow: inset 0 0 0 2px var(--o-accent);
}

.o-pin-input__cell[aria-invalid='true'] {
  box-shadow: inset 0 0 0 2px var(--o-danger);
}

.o-pin-input__cell:disabled {
  opacity: 0.4;
}
</style>
