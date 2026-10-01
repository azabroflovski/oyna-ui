import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'

import OButton from '../Button/Button.vue'
import OKeyCapture from './KeyCapture.vue'

const press = (code: string) =>
  document.body.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true }))

describe('oKeyCapture', () => {
  afterEach(() => document.body.replaceChildren())

  it('shows the key and takes the next press after a click', async () => {
    const wrapper = mount(OKeyCapture, { props: { modelValue: 'KeyQ' }, attachTo: document.body })
    expect(wrapper.find('kbd').text()).toBe('Q')

    press('KeyW')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    await wrapper.trigger('click')
    expect(wrapper.find('kbd').text()).toBe('?')
    press('KeyW')
    expect(wrapper.emitted('update:modelValue')).toEqual([['KeyW']])
    wrapper.unmount()
  })

  it('cancels on Escape and on losing focus', async () => {
    const wrapper = mount(OKeyCapture, { props: { modelValue: 'KeyQ' }, attachTo: document.body })
    await wrapper.trigger('click')
    press('Escape')
    await wrapper.trigger('click')
    await wrapper.trigger('blur')
    press('KeyW')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.find('kbd').text()).toBe('Q')
    wrapper.unmount()
  })

  it('keeps the captured press away from hotkeys', async () => {
    let clicks = 0
    const code = ref('KeyQ')
    const App = defineComponent(() => () => [
      h(OButton, { hotkey: 'KeyR', onClick: () => clicks++ }, () => 'Retry'),
      h(OKeyCapture, { modelValue: code.value, 'onUpdate:modelValue': (value?: string) => (code.value = value!) }),
    ])
    const wrapper = mount(App, { attachTo: document.body })
    await wrapper.find('.o-key-capture').trigger('click')
    press('KeyR')
    expect([code.value, clicks]).toEqual(['KeyR', 0])
    press('KeyR')
    expect(clicks).toBe(1)
    wrapper.unmount()
  })
})
