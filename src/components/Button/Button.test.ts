import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import OButton from './Button.vue'

function press(code: string, init: KeyboardEventInit = {}, target: EventTarget = window) {
  target.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true, ...init }))
}

describe('oButton', () => {
  afterEach(() => document.body.replaceChildren())

  it('renders a button with its variant and size', () => {
    const wrapper = mount(OButton, { props: { variant: 'primary', size: 'lg' }, slots: { default: 'Save' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['o-button--primary', 'o-button--lg']))
    expect(wrapper.text()).toBe('Save')
  })

  it('renders a link when given href', () => {
    const wrapper = mount(OButton, { props: { href: '/docs' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/docs')
    expect(wrapper.attributes('type')).toBeUndefined()
  })

  it('shows the hotkey and clicks on the physical key', () => {
    const wrapper = mount(OButton, { props: { hotkey: 'KeyR' }, attachTo: document.body })
    expect(wrapper.find('kbd').text()).toBe('R')
    press('KeyR')
    expect(wrapper.emitted('click')).toHaveLength(1)
    press('KeyT')
    expect(wrapper.emitted('click')).toHaveLength(1)
    wrapper.unmount()
  })

  it('takes the numpad Enter for Enter', () => {
    const wrapper = mount(OButton, { props: { hotkey: 'Enter' }, attachTo: document.body })
    press('NumpadEnter')
    expect(wrapper.emitted('click')).toHaveLength(1)
    wrapper.unmount()
  })

  it('ignores the key while typing, with a modifier, on repeat and when disabled', async () => {
    const wrapper = mount(OButton, { props: { hotkey: 'KeyR' }, attachTo: document.body })
    const input = document.createElement('input')
    document.body.append(input)

    press('KeyR', {}, input)
    press('KeyR', { metaKey: true })
    press('KeyR', { ctrlKey: true })
    press('KeyR', { repeat: true })
    await wrapper.setProps({ disabled: true })
    press('KeyR')

    expect(wrapper.emitted('click')).toBeUndefined()
    wrapper.unmount()
  })

  it('leaves Enter to a focused button', () => {
    const wrapper = mount(OButton, { props: { hotkey: 'Enter' }, attachTo: document.body })
    const other = document.createElement('button')
    document.body.append(other)
    press('Enter', {}, other)
    expect(wrapper.emitted('click')).toBeUndefined()
    wrapper.unmount()
  })

  it('stops listening after unmount', () => {
    let clicks = 0
    const wrapper = mount(OButton, { props: { hotkey: 'KeyR', onClick: () => clicks++ }, attachTo: document.body })
    wrapper.unmount()
    press('KeyR')
    expect(clicks).toBe(0)
  })
})
