<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem as RekaItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'reka-ui'
import type { Component } from 'vue'
import { ref } from 'vue'

import { useLayer } from '../../composables/layers'

export type DropdownMenuItem =
  | { label: string; icon?: Component; hint?: string; tone?: 'danger'; disabled?: boolean; onSelect?: () => void }
  | { separator: true }

withDefaults(
  defineProps<{
    /** `hint` is a dim note at the end of an item. `{ separator: true }` draws a line between groups. */
    items: readonly DropdownMenuItem[]
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
  }>(),
  { side: 'bottom', align: 'start' },
)

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
      <DropdownMenuContent class="o-dropdown-menu" :side :align :side-offset="8" :collision-padding="8">
        <template v-for="(item, index) in items" :key="index">
          <DropdownMenuSeparator v-if="'separator' in item" class="o-dropdown-menu__separator" />
          <RekaItem
            v-else
            class="o-dropdown-menu__item"
            :class="item.tone && `o-dropdown-menu__item--${item.tone}`"
            :disabled="item.disabled"
            @select="item.onSelect?.()"
          >
            <span class="o-dropdown-menu__label">
              <component :is="item.icon" v-if="item.icon" aria-hidden="true" />
              {{ item.label }}
            </span>
            <span v-if="item.hint" class="o-dropdown-menu__hint">{{ item.hint }}</span>
          </RekaItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<style>
@keyframes o-dropdown-menu-in {
  from {
    opacity: 0;
  }
}

.o-dropdown-menu {
  z-index: 110;
  box-sizing: border-box;
  min-width: 180px;
  padding: 6px 0;
  border-radius: 12px;
  background: var(--o-layer);
  -webkit-backdrop-filter: blur(var(--o-layer-blur));
  backdrop-filter: blur(var(--o-layer-blur));
  box-shadow: 0 16px 40px rgb(0 0 0 / 0.5);
  color: var(--o-text-2);
  font: 400 14px/1.4 var(--o-font-sans);
  animation: o-dropdown-menu-in var(--o-duration) ease;
}

.o-dropdown-menu__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 14px;
  outline: none;
  cursor: pointer;
  user-select: none;
}

.o-dropdown-menu__item[data-highlighted] {
  background: var(--o-fill-2);
  color: var(--o-text);
}

.o-dropdown-menu__item--danger,
.o-dropdown-menu__item--danger[data-highlighted] {
  color: var(--o-danger);
}

.o-dropdown-menu__item[data-disabled] {
  opacity: 0.4;
  cursor: default;
}

.o-dropdown-menu__label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.o-dropdown-menu__label svg {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.o-dropdown-menu__hint {
  font-size: 12px;
  color: var(--o-text-3);
}

/* a line between groups inside one list, not a border around a box */
.o-dropdown-menu__separator {
  height: 1px;
  margin: 6px 14px;
  background: rgb(255 255 255 / 0.1);
}
</style>
