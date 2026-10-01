<script setup lang="ts">
import { computed } from 'vue'
import { hotkeyLabel as labelFor, useHotkey } from '../../composables/useHotkey'

const props = defineProps<{
  /** Physical key (`KeyboardEvent.code`) that flips the toggle. Shown inside it. */
  hotkey?: string
  /** Text shown for the key; by default made from `hotkey`. */
  hotkeyLabel?: string
  /** Also turns the hotkey off. */
  disabled?: boolean
}>()

const on = defineModel<boolean>({ default: false })
const keyText = computed(() => props.hotkey ? props.hotkeyLabel ?? labelFor(props.hotkey) : undefined)

useHotkey(() => props.hotkey, () => on.value = !on.value, { enabled: () => !props.disabled })
</script>

<template>
  <button
    type="button"
    class="o-toggle"
    :aria-pressed="on"
    :disabled
    :aria-keyshortcuts="hotkey?.replace(/^(Key|Digit)/, '')"
    @click="on = !on"
  >
    <slot />
    <kbd v-if="keyText" class="o-toggle__key">{{ keyText }}</kbd>
  </button>
</template>

<style>
.o-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 8px 14px;
  border: 0;
  border-radius: 999px;
  background: var(--o-fill-2);
  color: var(--o-text-2);
  font: 400 14px/1.4 var(--o-font-sans);
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--o-duration) ease,
    color var(--o-duration) ease;
}

.o-toggle:hover {
  background: var(--o-fill-3);
}

.o-toggle[aria-pressed='true'] {
  background: color-mix(in srgb, var(--o-accent) 15%, transparent);
  color: var(--o-accent);
}

.o-toggle:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-toggle:disabled {
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
}

.o-toggle__key {
  padding: 0 6px;
  border-radius: 5px;
  /* the edge of a key: one of the allowed 1px lines */
  box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 45%, transparent);
  font: 700 11px/1.5 var(--o-font-sans);
  text-transform: uppercase;
}
</style>
