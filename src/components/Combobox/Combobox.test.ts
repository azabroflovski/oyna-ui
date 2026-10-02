import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import OCombobox from './Combobox.vue'

const items = [
  { value: 'fra', label: 'Frankfurt', hint: 'eu-central' },
  { value: 'iad', label: 'Washington', hint: 'us-east' },
  { value: 'sin', label: 'Singapore', hint: 'ap-southeast' },
]

describe('oCombobox', () => {
  afterEach(() => document.body.replaceChildren())

  it('shows the label of the chosen item in the field', async () => {
    const wrapper = mount(OCombobox, {
      props: { items, modelValue: 'iad' },
      attrs: { 'aria-label': 'Region', class: 'wide' },
      attachTo: document.body,
    })
    await nextTick()
    const field = wrapper.find('input')
    expect(field.element.value).toBe('Washington')
    expect(field.attributes()).toMatchObject({ role: 'combobox', 'aria-label': 'Region' })
    expect(wrapper.find('.o-combobox').classes()).toContain('wide')
    wrapper.unmount()
  })

  it('shows the placeholder without a value and keeps the list out of the page while closed', () => {
    const wrapper = mount(OCombobox, { props: { items, placeholder: 'Region' }, attachTo: document.body })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Region')
    expect(document.querySelector('.o-combobox__list')).toBeNull()
    wrapper.unmount()
  })

  it('lists only what matches the typed text', async () => {
    const wrapper = mount(OCombobox, { props: { items }, attachTo: document.body })
    const field = wrapper.find('input')
    await field.trigger('click')
    await field.setValue('sing')
    await nextTick()
    const shown = [...document.querySelectorAll('.o-select__option')].map((option) => option.textContent)
    expect(shown).toHaveLength(1)
    expect(shown[0]).toContain('Singapore')
    wrapper.unmount()
  })
})
