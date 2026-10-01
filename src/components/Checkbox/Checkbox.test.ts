import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import OField from '../Field/Field.vue'
import ORadio from '../Radio/Radio.vue'
import OSwitch from '../Switch/Switch.vue'
import OTextarea from '../Textarea/Textarea.vue'
import OCheckbox from './Checkbox.vue'

describe('oCheckbox', () => {
  it('works with v-model through a real checkbox', async () => {
    const wrapper = mount(OCheckbox, { props: { modelValue: false }, slots: { default: 'I agree' } })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('checkbox')
    expect(wrapper.text()).toBe('I agree')
    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('puts class on the label and the rest on the input', () => {
    const wrapper = mount(OCheckbox, {
      attrs: { class: 'mine', name: 'terms', required: '' },
      props: { disabled: true },
    })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['o-checkbox', 'mine']))
    expect(wrapper.find('input').attributes()).toMatchObject({ name: 'terms', required: '', disabled: '' })
    expect(wrapper.attributes('name')).toBeUndefined()
  })
})

describe('oSwitch', () => {
  it('is a checkbox announced as a switch', async () => {
    const wrapper = mount(OSwitch, {
      props: { modelValue: true },
      slots: { default: 'Email' },
      attrs: { name: 'email' },
    })
    const input = wrapper.find('input')
    expect(input.attributes()).toMatchObject({ type: 'checkbox', role: 'switch', name: 'email' })
    expect((input.element as HTMLInputElement).checked).toBe(true)
    await input.setValue(false)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })
})

describe('oTextarea', () => {
  it('works with v-model and takes attributes', async () => {
    const wrapper = mount(OTextarea, { props: { modelValue: 'hi' }, attrs: { rows: 6, placeholder: 'Bio' } })
    expect(wrapper.element.tagName).toBe('TEXTAREA')
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['o-input', 'o-textarea']))
    expect(wrapper.attributes()).toMatchObject({ rows: '6', placeholder: 'Bio' })
    await wrapper.setValue('hello')
    expect(wrapper.emitted('update:modelValue')).toEqual([['hello']])
  })

  it('is tied to its field and marked invalid by the field error', () => {
    const wrapper = mount(OField, {
      props: { label: 'Bio', error: 'Too long' },
      slots: { default: () => h(OTextarea) },
    })
    const area = wrapper.find('textarea')
    expect(wrapper.find('label').attributes('for')).toBe(area.attributes('id'))
    expect(area.attributes('aria-invalid')).toBe('true')
  })
})

describe('oRadio', () => {
  const items = [
    { value: 'a', label: 'Alpha', hint: 'First' },
    { value: 'b', label: 'Beta' },
    { value: 'c', label: 'Gamma', disabled: true },
  ]

  it('renders one group of radios under a legend', () => {
    const wrapper = mount(ORadio, { props: { items, modelValue: 'b', label: 'Plan' } })
    const inputs = wrapper.findAll('input')
    expect(wrapper.find('legend').text()).toBe('Plan')
    expect(new Set(inputs.map((input) => input.attributes('name'))).size).toBe(1)
    expect(inputs.map((input) => (input.element as HTMLInputElement).checked)).toEqual([false, true, false])
    expect(inputs[2]!.attributes('disabled')).toBe('')
    expect(wrapper.find('.o-radio__hint').text()).toBe('First')
  })

  it('emits the chosen value', async () => {
    const wrapper = mount(ORadio, { props: { items, modelValue: 'b' } })
    await wrapper.findAll('input')[0]!.setValue()
    expect(wrapper.emitted('update:modelValue')).toEqual([['a']])
  })
})
