import type { MaybeRefOrGetter } from 'vue'
import { inject, onBeforeUnmount, onMounted, toValue } from 'vue'

import { layerKey, openLayers } from './layers'

/** Inputs nobody types into: a key pressed on one of them is not text. */
const notText = ['checkbox', 'radio', 'range', 'button', 'submit', 'reset', 'color', 'file', 'image']

/** Typing in a field must not trigger hotkeys. */
function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  if (target instanceof HTMLInputElement) return !notText.includes(target.type)
  return target.isContentEditable || ['TEXTAREA', 'SELECT'].includes(target.tagName)
}

/**
 * A checkbox, a radio or a slider is not typed into, but a few keys are its own: Space ticks it, the
 * arrows move it. Those stay with the control; any other key (Enter, a letter) is free to be a hotkey.
 */
function usedByControl(code: string, target: EventTarget | null) {
  return (
    target instanceof HTMLInputElement &&
    (code === 'Space' || code.startsWith('Arrow') || ['Home', 'End', 'PageUp', 'PageDown'].includes(code))
  )
}

/** Enter and Space already activate a focused button or link: the hotkey would run the action twice. */
function activatesTarget(code: string, target: EventTarget | null) {
  return (
    (code === 'Enter' || code === 'Space') &&
    target instanceof Element &&
    !!target.closest('button, a[href], summary, [role="button"]')
  )
}

const named: Record<string, string> = {
  Escape: 'Esc',
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  Backspace: '⌫',
  Slash: '/',
  Backslash: '\\',
  Comma: ',',
  Period: '.',
  Semicolon: ';',
  Quote: "'",
  Backquote: '`',
  BracketLeft: '[',
  BracketRight: ']',
  Minus: '-',
  Equal: '=',
}

/** What to print for a physical key: `KeyR` → `R`, `Digit1` → `1`, `Escape` → `Esc`. */
export function hotkeyLabel(code: string) {
  return named[code] ?? code.replace(/^(Key|Digit|Numpad)(?=.)/, '')
}

/**
 * Runs `handler` when the physical key `code` (`KeyboardEvent.code`) is pressed, so it works on any
 * keyboard layout. Ignored while typing in a field (a checkbox or a switch keeps only Space and the arrows), with Ctrl / Cmd / Alt held, and on key repeat.
 * The numpad Enter counts as `Enter`. While a dialog is open, only hotkeys set up inside it work.
 */
export function useHotkey(
  code: MaybeRefOrGetter<string | undefined>,
  handler: (event: KeyboardEvent) => void,
  options: { enabled?: MaybeRefOrGetter<boolean> } = {},
) {
  const layer = inject(layerKey, undefined)

  function onKeydown(event: KeyboardEvent) {
    const wanted = toValue(code)
    if (!wanted || toValue(options.enabled) === false) return
    const pressed = event.code === 'NumpadEnter' ? 'Enter' : event.code
    if (pressed !== wanted || event.repeat) return
    if (openLayers.at(-1) !== layer) return
    // leave browser shortcuts (Cmd+R, Ctrl+W, ...) alone
    if (event.ctrlKey || event.metaKey || event.altKey) return
    if (isEditable(event.target) || usedByControl(pressed, event.target) || activatesTarget(pressed, event.target))
      return
    event.preventDefault()
    handler(event)
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}
