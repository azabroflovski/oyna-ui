import type { InjectionKey, Ref } from 'vue'
import { onBeforeUnmount, provide, watch } from 'vue'

/**
 * Modal layers (dialogs, open selects), innermost last. While one is open, only the hotkeys of what
 * is inside the top layer work: a key must not reach a button hidden behind a dialog.
 */
export const openLayers: symbol[] = []

/** The layer a component lives in; nothing is provided on the page itself. */
export const layerKey: InjectionKey<symbol> = Symbol('o-layer')

/** Makes the calling component a layer for as long as `open` is true. */
export function useLayer(open: Ref<boolean>) {
  const layer = Symbol('o-layer')
  provide(layerKey, layer)

  function leave() {
    const index = openLayers.indexOf(layer)
    if (index !== -1) openLayers.splice(index, 1)
  }
  watch(
    open,
    (isOpen) => {
      leave()
      if (isOpen) openLayers.push(layer)
    },
    { immediate: true },
  )
  onBeforeUnmount(leave)
}
