import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OToggle from './Toggle.vue'

const press = (code: string) => window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true }))

describe('oToggle', () => {
  it('flips on click', async () => {
    const wrapper = mount(OToggle, { props: { modelValue: false }, slots: { default: 'Sound' } })
    expect(wrapper.attributes('aria-pressed')).toBe('false')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('shows its hotkey and flips on it', () => {
    const wrapper = mount(OToggle, { props: { modelValue: true, hotkey: 'KeyM' }, attachTo: document.body })
    expect(wrapper.find('kbd').text()).toBe('M')
    press('KeyM')
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    wrapper.unmount()
  })

  it('ignores the hotkey when disabled', () => {
    const wrapper = mount(OToggle, { props: { hotkey: 'KeyM', disabled: true }, attachTo: document.body })
    press('KeyM')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
})
