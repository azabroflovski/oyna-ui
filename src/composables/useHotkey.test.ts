import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'

import { hotkeyLabel, useHotkey } from './useHotkey'

describe('hotkeyLabel', () => {
  it('prints a physical key the way it is written on the key', () => {
    expect(hotkeyLabel('KeyR')).toBe('R')
    expect(hotkeyLabel('Digit1')).toBe('1')
    expect(hotkeyLabel('Numpad5')).toBe('5')
    expect(hotkeyLabel('Enter')).toBe('Enter')
    expect(hotkeyLabel('Escape')).toBe('Esc')
    expect(hotkeyLabel('ArrowUp')).toBe('↑')
    expect(hotkeyLabel('Space')).toBe('Space')
    expect(hotkeyLabel('Slash')).toBe('/')
    expect(hotkeyLabel('BracketLeft')).toBe('[')
  })
})

describe('useHotkey', () => {
  afterEach(() => document.body.replaceChildren())

  /** A page with one hotkey and one control; tells how many times the hotkey fired for keys pressed on the control. */
  function fired(code: string, control: () => ReturnType<typeof h>, pressed = code) {
    let count = 0
    const Page = defineComponent({
      setup() {
        useHotkey(code, () => count++)
        return control
      },
    })
    const wrapper = mount(Page, { attachTo: document.body })
    wrapper.element.dispatchEvent(new KeyboardEvent('keydown', { code: pressed, bubbles: true, cancelable: true }))
    wrapper.unmount()
    return count
  }

  it('stays quiet while the user types in a field', () => {
    expect(fired('KeyR', () => h('input'))).toBe(0)
    expect(fired('Enter', () => h('input', { type: 'email' }))).toBe(0)
    expect(fired('KeyR', () => h('textarea'))).toBe(0)
  })

  it('works on a checkbox, which nobody types into', () => {
    expect(fired('Enter', () => h('input', { type: 'checkbox' }))).toBe(1)
    expect(fired('KeyR', () => h('input', { type: 'radio' }))).toBe(1)
  })

  it('leaves Space and the arrows to a checkbox, a radio and a slider', () => {
    expect(fired('Space', () => h('input', { type: 'checkbox' }))).toBe(0)
    expect(fired('ArrowDown', () => h('input', { type: 'radio' }))).toBe(0)
    expect(fired('ArrowRight', () => h('input', { type: 'range' }))).toBe(0)
  })

  it('does not run twice when Enter already presses the focused button', () => {
    expect(fired('Enter', () => h('button', 'Save'))).toBe(0)
    expect(fired('KeyR', () => h('button', 'Save'))).toBe(1)
  })
})
