<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

import { hotkeyLabel } from '../../composables/useHotkey'

defineProps<{
  disabled?: boolean
}>()

/** The physical key (`KeyboardEvent.code`), ready to pass to a `hotkey`. */
const code = defineModel<string>()
const waiting = ref(false)

function onKeydown(event: KeyboardEvent) {
  // the key is ours: it must not reach the page's hotkeys or the browser
  event.preventDefault()
  event.stopPropagation()
  if (event.code !== 'Escape') code.value = event.code
  waiting.value = false
}

// in the capture phase, so the press is taken before any hotkey sees it
const stop = () => window.removeEventListener('keydown', onKeydown, true)
watch(
  waiting,
  (isWaiting) => {
    stop()
    if (isWaiting) window.addEventListener('keydown', onKeydown, true)
    // sync: the very next press after a capture must already be an ordinary one
  },
  { flush: 'sync' },
)
onBeforeUnmount(stop)
</script>

<template>
  <button
    type="button"
    class="o-key-capture"
    :class="waiting && 'o-key-capture--waiting'"
    :disabled
    :aria-pressed="waiting"
    @click="waiting = !waiting"
    @blur="waiting = false"
  >
    <kbd class="o-key-capture__key">{{ waiting ? '?' : code ? hotkeyLabel(code) : '—' }}</kbd>
    <span v-if="$slots.default" class="o-key-capture__label"><slot /></span>
  </button>
</template>

<style>
.o-key-capture {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: var(--o-text);
  font-family: var(--o-font-sans);
  cursor: pointer;
}

.o-key-capture:focus-visible {
  outline: none;
}

.o-key-capture:disabled {
  opacity: 0.4;
  cursor: default;
}

.o-key-capture__key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  padding: 0 10px;
  border-radius: var(--o-radius-sm);
  background: var(--o-fill-3);
  /* the edge of a key: one of the allowed 1px lines */
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25);
  font: 700 26px/1 var(--o-font-display);
  transition: box-shadow var(--o-duration) ease;
}

.o-key-capture:hover:not(:disabled) .o-key-capture__key {
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.5);
}

.o-key-capture:focus-visible .o-key-capture__key {
  box-shadow: inset 0 0 0 2px rgb(255 255 255 / 0.7);
}

/* waiting for a key is the main thing on the screen */
.o-key-capture--waiting .o-key-capture__key,
.o-key-capture--waiting:hover:not(:disabled) .o-key-capture__key {
  box-shadow: inset 0 0 0 2px var(--o-accent);
  color: var(--o-accent);
}

.o-key-capture__label {
  font-size: 11px;
  line-height: 1.4;
  color: var(--o-text-3);
}
</style>
