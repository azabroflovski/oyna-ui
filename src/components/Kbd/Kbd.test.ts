import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import OKbd from './Kbd.vue'

const key = (type: 'keydown' | 'keyup', code: string) => window.dispatchEvent(new KeyboardEvent(type, { code }))

describe('oKbd', () => {
  it('is a small key cap by default, and takes a variant', () => {
    const wrapper = mount(OKbd, { slots: { default: 'Esc' } })
    expect(wrapper.element.tagName).toBe('KBD')
    expect(wrapper.classes()).toEqual(['o-kbd', 'o-kbd--key'])
    expect(wrapper.text()).toBe('Esc')
    expect(mount(OKbd, { props: { variant: 'cap' } }).classes()).toContain('o-kbd--cap')
  })

  it('lights up while its physical key is held', async () => {
    const wrapper = mount(OKbd, { props: { code: 'KeyD' }, slots: { default: 'D' } })
    key('keydown', 'KeyF')
    await nextTick()
    expect(wrapper.classes()).not.toContain('o-kbd--pressed')

    key('keydown', 'KeyD')
    await nextTick()
    expect(wrapper.classes()).toContain('o-kbd--pressed')

    key('keyup', 'KeyD')
    await nextTick()
    expect(wrapper.classes()).not.toContain('o-kbd--pressed')
    key('keyup', 'KeyF')
  })

  it('lets go of everything when the window loses focus', async () => {
    const wrapper = mount(OKbd, { props: { code: 'Enter' } })
    key('keydown', 'NumpadEnter')
    await nextTick()
    expect(wrapper.classes()).toContain('o-kbd--pressed')
    window.dispatchEvent(new Event('blur'))
    await nextTick()
    expect(wrapper.classes()).not.toContain('o-kbd--pressed')
  })

  it('never lights up without a code', async () => {
    const wrapper = mount(OKbd)
    key('keydown', 'KeyD')
    await nextTick()
    expect(wrapper.classes()).not.toContain('o-kbd--pressed')
    key('keyup', 'KeyD')
  })
})
