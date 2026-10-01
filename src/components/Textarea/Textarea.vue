<script setup lang="ts">
import { inject } from 'vue'

import { fieldKey } from '../Field/context'

const props = defineProps<{
  /** A danger ring. Inside an `OField` with an error it is set for you. */
  invalid?: boolean
}>()

// it looks like an input: the `o-input` class in the template brings the fill, the edge and the focus ring
const model = defineModel<string>()
const field = inject(fieldKey, undefined)
</script>

<template>
  <textarea
    :id="field?.id"
    v-model="model"
    class="o-input o-textarea"
    rows="3"
    :aria-invalid="props.invalid || field?.invalid.value || undefined"
    :aria-describedby="field?.messageId.value"
  />
</template>

<style>
.o-textarea {
  display: block;
  min-height: 40px;
  line-height: 1.5;
  resize: vertical;
}
</style>
