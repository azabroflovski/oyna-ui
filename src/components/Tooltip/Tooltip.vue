<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'

withDefaults(
  defineProps<{
    text: string
    side?: 'top' | 'right' | 'bottom' | 'left'
  }>(),
  { side: 'top' },
)
</script>

<template>
  <TooltipProvider :delay-duration="300">
    <TooltipRoot>
      <!-- the slot must be one focusable element: it becomes the trigger -->
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="o-tooltip" :side :side-offset="8">
          {{ text }}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style>
@keyframes o-tooltip-in {
  from {
    opacity: 0;
  }
}

.o-tooltip {
  z-index: 120;
  max-width: 260px;
  padding: 6px 10px;
  border-radius: var(--o-radius-sm);
  background: var(--o-layer);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.5);
  color: var(--o-text);
  font: 400 12px/1.4 var(--o-font-sans);
  animation: o-tooltip-in var(--o-duration) ease;
}
</style>
