import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OAccordion from './Accordion.vue'

const items = [
  { value: 'billing', label: 'How is usage billed?' },
  { value: 'limits', label: 'What are the limits?' },
  { value: 'sso', label: 'Is there SSO?', disabled: true },
]
const slots = { billing: 'Per request.', limits: 'A thousand a minute.', sso: 'Soon.' }

describe('oAccordion', () => {
  it('starts closed and opens the section of the model', async () => {
    const wrapper = mount(OAccordion, { props: { items }, slots })
    const triggers = wrapper.findAll('.o-accordion__trigger')
    expect(triggers.map((trigger) => trigger.text())).toEqual(items.map((item) => item.label))
    expect(triggers.map((trigger) => trigger.attributes('aria-expanded'))).toEqual(['false', 'false', 'false'])

    await wrapper.setProps({ modelValue: 'limits' })
    expect(triggers[1]!.attributes('aria-expanded')).toBe('true')
    // the content is mounted a moment after the section opens
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(wrapper.find('.o-accordion__content[data-state="open"]').text()).toBe('A thousand a minute.')
  })

  it('opens one section at a time and closes it on a second click', async () => {
    const wrapper = mount(OAccordion, { props: { items }, slots })
    const triggers = wrapper.findAll('.o-accordion__trigger')
    await triggers[0]!.trigger('click')
    await triggers[1]!.trigger('click')
    await triggers[1]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['billing'], ['limits'], [undefined]])
  })

  it('keeps several open with multiple, as a list', async () => {
    const wrapper = mount(OAccordion, { props: { items, multiple: true }, slots })
    const triggers = wrapper.findAll('.o-accordion__trigger')
    await triggers[0]!.trigger('click')
    await triggers[1]!.trigger('click')
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([['billing', 'limits']])
  })

  it('does not open a disabled section', async () => {
    const wrapper = mount(OAccordion, { props: { items }, slots })
    const trigger = wrapper.findAll('.o-accordion__trigger')[2]!
    expect(trigger.attributes('disabled')).toBeDefined()
    await trigger.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
