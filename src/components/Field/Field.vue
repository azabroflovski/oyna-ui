<script setup lang="ts">
import { computed, provide, useId } from 'vue'

import { fieldKey } from './context'

const props = defineProps<{
  label: string
  /** Shown under the control. */
  hint?: string
  /** Replaces the hint and marks the control invalid. */
  error?: string
}>()

const id = useId()
const messageId = computed(() => (props.error || props.hint ? `${id}-message` : undefined))
provide(fieldKey, { id, messageId, invalid: computed(() => !!props.error) })
</script>

<template>
  <div class="o-field">
    <label class="o-field__label" :for="id">{{ label }}</label>
    <slot />
    <!-- always in the page, so a screen reader announces an error that appears later -->
    <span :id="messageId" class="o-field__message" :class="error && 'o-field__message--error'" aria-live="polite">
      {{ error || hint }}
    </span>
  </div>
</template>

<style>
.o-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--o-font-sans);
}

.o-field__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.o-field__message {
  /* keeps its line when empty, so the layout doesn't jump when an error appears */
  min-height: 18px;
  font-size: 12px;
  line-height: 18px;
  color: var(--o-text-3);
}

.o-field__message--error {
  color: var(--o-danger);
}
</style>
