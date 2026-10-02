<script setup lang="ts">
import ODialog from '../Dialog/Dialog.vue'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    title: string
    /** A line under the title, read out with it. */
    description?: string
    /** Text of the close button, after the `Esc` key. */
    closeLabel?: string
    /** The edge it stands at. `bottom` is a sheet: the natural place on a phone. */
    side?: 'right' | 'left' | 'bottom'
  }>(),
  { side: 'right' },
)

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <ODialog
    v-model:open="open"
    :title
    :description
    :close-label
    class="o-drawer"
    :class="`o-drawer--${side}`"
    v-bind="$attrs"
  >
    <slot />
  </ODialog>
</template>

<style>
/*
  A dialog standing at an edge: the same layer, header, focus and keys, another place. It fades in
  like a dialog and does not slide: light, not movement. Both classes, so these rules win over the
  dialog's own whatever the order in the stylesheet.
*/
.o-dialog.o-drawer {
  top: 0;
  bottom: 0;
  left: auto;
  right: 0;
  width: min(var(--o-drawer-width, 420px), calc(100vw - 32px));
  max-height: none;
  border-radius: var(--o-radius-lg) 0 0 var(--o-radius-lg);
  transform: none;
}

.o-dialog.o-drawer--left {
  left: 0;
  right: auto;
  border-radius: 0 var(--o-radius-lg) var(--o-radius-lg) 0;
}

/* room for the home indicator of a phone under the content */
.o-dialog.o-drawer--bottom {
  top: auto;
  left: 0;
  width: 100%;
  max-height: min(var(--o-drawer-height, 85dvh), calc(100dvh - 32px));
  padding-bottom: max(28px, env(safe-area-inset-bottom));
  border-radius: var(--o-radius-lg) var(--o-radius-lg) 0 0;
}
</style>
