<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'

import { useLayer } from '../../composables/layers'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    title: string
    /** A line under the title, read out with it. */
    description?: string
    /** Text of the close button, after the `Esc` key. */
    closeLabel?: string
  }>(),
  { closeLabel: 'Close' },
)

const open = defineModel<boolean>('open', { default: false })

// hotkeys inside the dialog belong to this layer; the ones behind it are off while it is open
useLayer(open)

// Focus goes to the dialog itself, not to its first control (the close button): otherwise Enter would
// close the dialog instead of reaching the hotkey of its main button.
function focusDialog(event: Event) {
  event.preventDefault()
  if (event.target instanceof HTMLElement) event.target.focus()
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="o-dialog__overlay" />
      <DialogContent
        class="o-dialog"
        v-bind="{ ...$attrs, ...(description ? {} : { 'aria-describedby': undefined }) }"
        @open-auto-focus="focusDialog"
      >
        <header class="o-dialog__header">
          <DialogTitle class="o-dialog__title">
            {{ title }}
          </DialogTitle>
          <DialogClose class="o-dialog__close"> <kbd class="o-kbd o-kbd--key">Esc</kbd> {{ closeLabel }} </DialogClose>
        </header>
        <DialogDescription v-if="description" class="o-dialog__description">
          {{ description }}
        </DialogDescription>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
@keyframes o-fade-in {
  from {
    opacity: 0;
  }
}

.o-dialog__overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgb(0 0 0 / 0.6);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  animation: o-fade-in var(--o-duration) ease;
}

.o-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 101;
  box-sizing: border-box;
  width: min(var(--o-dialog-width, 520px), calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  border-radius: var(--o-radius-lg);
  background: var(--o-layer);
  -webkit-backdrop-filter: blur(var(--o-layer-blur));
  backdrop-filter: blur(var(--o-layer-blur));
  box-shadow: 0 30px 80px rgb(0 0 0 / 0.6);
  color: var(--o-text);
  font-family: var(--o-font-sans);
  transform: translate(-50%, -50%);
  animation: o-fade-in var(--o-duration) ease;
}

.o-dialog:focus {
  outline: none;
}

.o-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.o-dialog__title {
  margin: 0;
  font: 700 30px/1.1 var(--o-font-display);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.o-dialog__description {
  margin: -12px 0 0;
  font-size: 14px;
  color: var(--o-text-2);
}

.o-dialog__close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 4px 8px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--o-text-3);
  font: 400 14px/1.4 var(--o-font-sans);
  cursor: pointer;
  transition: color var(--o-duration) ease;
}

.o-dialog__close:hover {
  color: var(--o-text);
}

.o-dialog__close:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

/* touch: the word stays, the key goes, and the target grows past the text */
@media (pointer: coarse) {
  .o-dialog__close {
    position: relative;
  }

  .o-dialog__close .o-kbd {
    display: none;
  }

  .o-dialog__close::after {
    content: '';
    position: absolute;
    inset: -8px;
  }
}
</style>
