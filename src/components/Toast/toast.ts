import { shallowRef } from 'vue'

export interface Toast {
  id: number
  message: string
  tone?: 'accent' | 'danger'
}

/** The toasts on screen, oldest first; `OToaster` shows them. */
export const toasts = shallowRef<readonly Toast[]>([])

let lastId = 0

export function dismissToast(id: number) {
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}

/**
 * Shows a short message that goes away by itself. `tone: 'danger'` is for something that went wrong
 * and is read out at once. `duration` is in ms; `0` keeps the toast until it is clicked.
 */
export function toast(message: string, options: { tone?: 'accent' | 'danger', duration?: number } = {}) {
  const id = ++lastId
  toasts.value = [...toasts.value, { id, message, tone: options.tone }]
  const duration = options.duration ?? 4000
  if (duration > 0)
    setTimeout(dismissToast, duration, id)
  return id
}
