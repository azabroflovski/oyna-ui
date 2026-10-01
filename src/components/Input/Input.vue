<script setup lang="ts">
import { inject } from 'vue'

import { fieldKey } from '../Field/context'

const props = defineProps<{
  /** A danger ring. Inside an `OField` with an error it is set for you. */
  invalid?: boolean
}>()

const model = defineModel<string | number>()
const field = inject(fieldKey, undefined)
</script>

<template>
  <input
    :id="field?.id"
    v-model="model"
    class="o-input"
    :aria-invalid="props.invalid || field?.invalid.value || undefined"
    :aria-describedby="field?.messageId.value"
  />
</template>

<style>
.o-input {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 9px 12px;
  border: 0;
  border-radius: var(--o-radius-sm);
  outline: none;
  background: var(--o-fill-2);
  /* the edge of an input: one of the allowed 1px lines */
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15);
  color: var(--o-text);
  font: 400 15px/1.4 var(--o-font-sans);
  transition: box-shadow var(--o-duration) ease;
}

.o-input::placeholder {
  color: var(--o-text-3);
}

.o-input:focus {
  box-shadow: inset 0 0 0 2px var(--o-accent);
}

.o-input[aria-invalid='true'] {
  box-shadow: inset 0 0 0 2px var(--o-danger);
}

.o-input:disabled {
  opacity: 0.4;
}

/* iOS zooms the page when a field with text under 16px takes focus */
@media (pointer: coarse) {
  .o-input {
    font-size: 16px;
  }
}
</style>
