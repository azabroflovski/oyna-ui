import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'

import OButton from '../Button/Button.vue'
import OField from '../Field/Field.vue'
import OTooltip from '../Tooltip/Tooltip.vue'
import OSelect from './Select.vue'

const items = [
  { value: 'en', label: 'English', hint: 'en' },
  { value: 'uz', label: 'Oʻzbekcha', hint: 'uz' },
]

describe('oSelect', () => {
  afterEach(() => document.body.replaceChildren())

  it('shows the chosen item on a closed trigger', () => {
    const wrapper = mount(OSelect, {
      props: { items, modelValue: 'uz' },
      attrs: { 'aria-label': 'Language' },
      attachTo: document.body,
    })
    const trigger = wrapper.find('button.o-select')
    expect(trigger.attributes()).toMatchObject({ role: 'combobox', 'aria-expanded': 'false', 'aria-label': 'Language' })
    expect(trigger.text()).toBe('Oʻzbekcha')
    wrapper.unmount()
  })

  it('shows the placeholder without a value', () => {
    const wrapper = mount(OSelect, { props: { items, placeholder: 'Language' }, attachTo: document.body })
    expect(wrapper.find('button.o-select').text()).toBe('Language')
    wrapper.unmount()
  })

  it('takes its label and error from a field', () => {
    const wrapper = mount(OField, {
      props: { label: 'Language', error: 'Pick a language' },
      slots: { default: () => h(OSelect, { items }) },
      attachTo: document.body,
    })
    const trigger = wrapper.find('button.o-select')
    expect(wrapper.find('label').attributes('for')).toBe(trigger.attributes('id'))
    expect(trigger.attributes('aria-describedby')).toBe(wrapper.find('.o-field__message').attributes('id'))
    expect(trigger.attributes('aria-invalid')).toBe('true')
    wrapper.unmount()
  })
})

describe('oTooltip', () => {
  it('makes its child the trigger and stays hidden until needed', () => {
    const wrapper = mount(OTooltip, {
      props: { text: 'Settings' },
      slots: { default: () => h(OButton, { icon: true }, () => '?') },
      attachTo: document.body,
    })
    expect(wrapper.find('button.o-button').attributes('data-state')).toBe('closed')
    expect(document.querySelector('.o-tooltip')).toBeNull()
    wrapper.unmount()
  })
})
