import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'

import OField from '../Field/Field.vue'
import OPinInput from './PinInput.vue'

const values = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('input.o-pin-input__cell').map((input) => (input.element as HTMLInputElement).value)

describe('oPinInput', () => {
  it('has a cell for every character and shows the value across them', async () => {
    const wrapper = mount(OPinInput, { props: { modelValue: '407', length: 4 } })
    await nextTick()
    expect(values(wrapper)).toEqual(['4', '0', '7', ''])
    expect(wrapper.find('input.o-pin-input__cell').attributes('aria-label')).toBe('Character 1 of 4')
  })

  it('takes typing as one string and says when the code is complete', async () => {
    const wrapper = mount(OPinInput, { props: { modelValue: '12', length: 3 }, attachTo: document.body })
    await nextTick()
    const cell = wrapper.findAll('input.o-pin-input__cell')[2]!
    ;(cell.element as HTMLInputElement).value = '3'
    await cell.trigger('input')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['123'])
    expect(wrapper.emitted('complete')?.at(-1)).toEqual(['123'])
    wrapper.unmount()
  })

  it('starts a new group after every `group` cells', () => {
    const cells = mount(OPinInput, { props: { group: 3 } }).findAll('input.o-pin-input__cell')
    expect(cells.map((cell) => cell.classes().includes('o-pin-input__cell--gap'))).toEqual([
      false,
      false,
      false,
      true,
      false,
      false,
    ])
  })

  it('is tied to its field and marked invalid by the field error', () => {
    const wrapper = mount(OField, {
      props: { label: 'Code', error: 'Wrong code' },
      slots: { default: () => h(OPinInput) },
    })
    const cells = wrapper.findAll('input.o-pin-input__cell')
    expect(wrapper.find('label').attributes('for')).toBe(cells[0]!.attributes('id'))
    expect(cells.every((cell) => cell.attributes('aria-invalid') === 'true')).toBe(true)
    expect(wrapper.find('.o-pin-input').attributes('aria-describedby')).toBe(
      wrapper.find('.o-field__message').attributes('id'),
    )
  })
})
