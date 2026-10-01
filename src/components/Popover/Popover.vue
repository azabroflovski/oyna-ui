<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { useLayer } from '../../composables/layers'

withDefaults(defineProps<{
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}>(), { side: 'bottom', align: 'start' })

defineSlots<{
  /** One focusable element: it becomes the trigger. */
  default: () => unknown
  content: (props: { close: () => void }) => unknown
}>()

const open = defineModel<boolean>('open', { default: false })

// hotkeys inside the popover work; the ones behind it are off while it is open
useLayer(open)
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent class="o-popover" :side :align :side-offset="8">
        <slot name="content" :close="() => open = false" />
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
