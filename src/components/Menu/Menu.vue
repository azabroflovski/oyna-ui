<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger } from 'reka-ui'
import { ref } from 'vue'
import { useLayer } from '../../composables/layers'

export type MenuItem
  = | { label: string, hint?: string, tone?: 'danger', disabled?: boolean, onSelect?: () => void }
    | { separator: true }

withDefaults(defineProps<{
  /** `hint` is a dim note at the end of an item. `{ separator: true }` draws a line between groups. */
  items: readonly MenuItem[]
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}>(), { side: 'bottom', align: 'start' })

// typing in an open menu jumps to an item; page hotkeys must not fire on those keys
const open = ref(false)
useLayer(open)
</script>

<template>
  <DropdownMenuRoot v-model:open="open">
    <!-- the slot must be one focusable element: it becomes the trigger -->
    <DropdownMenuTrigger as-child>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent class="o-menu" :side :align :side-offset="8">
        <template v-for="(item, index) in items" :key="index">
          <DropdownMenuSeparator v-if="'separator' in item" class="o-menu__separator" />
          <DropdownMenuItem
            v-else
            class="o-menu__item"
            :class="item.tone && `o-menu__item--${item.tone}`"
            :disabled="item.disabled"
            @select="item.onSelect?.()"
          >
            {{ item.label }}
            <span v-if="item.hint" class="o-menu__hint">{{ item.hint }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style>
@keyframes o-menu-in {
  from {
    opacity: 0;
  }
}

.o-menu {
  z-index: 110;
  box-sizing: border-box;
  min-width: 180px;
  padding: 6px 0;
  border-radius: 12px;
  background: var(--o-layer);
  box-shadow: 0 16px 40px rgb(0 0 0 / 0.5);
  color: var(--o-text-2);
  font: 400 14px/1.4 var(--o-font-sans);
  animation: o-menu-in var(--o-duration) ease;
}

.o-menu__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 14px;
  outline: none;
  cursor: pointer;
  user-select: none;
}

.o-menu__item[data-highlighted] {
  background: var(--o-fill-2);
  color: var(--o-text);
}

.o-menu__item--danger,
.o-menu__item--danger[data-highlighted] {
  color: var(--o-danger);
}

.o-menu__item[data-disabled] {
  opacity: 0.4;
  cursor: default;
}

.o-menu__hint {
  font-size: 12px;
  color: rgb(255 255 255 / 0.35);
}

/* a line between groups inside one list, not a border around a box */
.o-menu__separator {
  height: 1px;
  margin: 6px 14px;
  background: rgb(255 255 255 / 0.1);
}
</style>
