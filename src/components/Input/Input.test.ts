import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import OField from '../Field/Field.vue'
import OInput from './Input.vue'

describe('oInput', () => {
  it('works with v-model and passes attributes to the input', async () => {
    const wrapper = mount(OInput, { props: { modelValue: 'ab' }, attrs: { placeholder: 'Name' } })
    expect(wrapper.element.tagName).toBe('INPUT')
    expect((wrapper.element as HTMLInputElement).value).toBe('ab')
    expect(wrapper.attributes('placeholder')).toBe('Name')
    await wrapper.setValue('abc')
    expect(wrapper.emitted('update:modelValue')).toEqual([['abc']])
  })

  it('is marked invalid only when asked', () => {
    expect(mount(OInput).attributes('aria-invalid')).toBeUndefined()
    expect(mount(OInput, { props: { invalid: true } }).attributes('aria-invalid')).toBe('true')
  })
})

describe('oField', () => {
  const field = (props: { hint?: string; error?: string }) =>
    mount(OField, { props: { label: 'Name', ...props }, slots: { default: () => h(OInput) } })

  it('ties the label and the hint to the input', () => {
    const wrapper = field({ hint: '2–16 characters' })
    const input = wrapper.find('input')
    expect(wrapper.find('label').attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('aria-describedby')).toBe(wrapper.find('.o-field__message').attributes('id'))
    expect(wrapper.find('.o-field__message').text()).toBe('2–16 characters')
    expect(input.attributes('aria-invalid')).toBeUndefined()
  })

  it('shows the error instead of the hint and marks the input invalid', () => {
    const wrapper = field({ hint: '2–16 characters', error: 'Taken' })
    expect(wrapper.find('.o-field__message').text()).toBe('Taken')
    expect(wrapper.find('.o-field__message').classes()).toContain('o-field__message--error')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })
})
