import type { StyleValue } from 'vue'
import { computed, useAttrs } from 'vue'

/**
 * For a control wrapped in a label: `class` and `style` go to the wrapper, everything else (`name`,
 * `required`, `aria-*`, listeners) to the control itself. The component sets `inheritAttrs: false`.
 */
export function useSplitAttrs() {
  const attrs = useAttrs()
  return computed(() => {
    const { class: className, style, ...control } = attrs
    return { root: { class: className, style: style as StyleValue }, control }
  })
}
