import { describe, expect, it } from 'vitest'

import { hotkeyLabel } from './useHotkey'

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
