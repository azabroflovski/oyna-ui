<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

import { useLayer } from '../../composables/layers'

withDefaults(
  defineProps<{
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
  }>(),
  { side: 'bottom', align: 'start' },
)

defineSlots<{
  /** One focusable element: it becomes the trigger. */
  default: () => unknown
  content: (props: { close: () => void }) => unknown
}>()

const open = defineModel<boolean>('open', { default: false })

// hotkeys inside the popover work; the ones behind it are off while it is open
useLayer(open)

// Focus goes to the panel itself, not to its first control, as in a dialog: otherwise Enter would
// press whatever button comes first instead of reaching the hotkey of the main one.
function focusPanel(event: Event) {
  event.preventDefault()
  // the event comes from the wrapper that positions the panel, so the panel is looked up from it
  if (event.target instanceof HTMLElement) event.target.querySelector<HTMLElement>('.o-popover')?.focus()
}
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="o-popover"
        tabindex="-1"
        :side
        :align
        :side-offset="8"
        :collision-padding="8"
        @open-auto-focus="focusPanel"
      >
        <slot name="content" :close="() => (open = false)" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
@keyframes o-popover-in {
  from {
    opacity: 0;
  }
}

.o-popover {
  z-index: 110;
  box-sizing: border-box;
  width: min(var(--o-popover-width, 280px), calc(100vw - 32px));
  padding: 16px;
  border-radius: var(--o-radius);
  background: var(--o-layer);
  box-shadow: 0 16px 40px rgb(0 0 0 / 0.5);
  color: var(--o-text);
  font: 400 14px/1.5 var(--o-font-sans);
  animation: o-popover-in var(--o-duration) ease;
}

.o-popover:focus {
  outline: none;
}
</style>
