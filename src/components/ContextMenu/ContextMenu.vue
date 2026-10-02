<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from 'reka-ui'
import { ref } from 'vue'

import { useLayer } from '../../composables/layers'
import type { DropdownMenuItem } from '../DropdownMenu/DropdownMenu.vue'

defineProps<{
  /** The same items as a dropdown menu takes. */
  items: readonly DropdownMenuItem[]
  /** A right click (or a long press) does what the browser does, as if the menu were not there. */
  disabled?: boolean
}>()

// typing in an open menu jumps to an item; page hotkeys must not fire on those keys
const open = ref(false)
useLayer(open)
</script>

<template>
  <ContextMenuRoot @update:open="open = $event">
    <!-- the slot must be one element: a right click anywhere on it opens the menu at the pointer -->
    <ContextMenuTrigger as-child :disabled>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent class="o-dropdown-menu o-context-menu" :collision-padding="8">
        <template v-for="(item, index) in items" :key="index">
          <ContextMenuSeparator v-if="'separator' in item" class="o-dropdown-menu__separator" />
          <ContextMenuItem
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
          </ContextMenuItem>
        </template>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
