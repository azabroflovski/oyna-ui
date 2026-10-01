import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OCard from '../Card/Card.vue'
import OTag from './Tag.vue'

describe('oTag', () => {
  it('shows its content, toned when asked, with no button unless removable', () => {
    const wrapper = mount(OTag, { props: { tone: 'accent' }, slots: { default: 'production' } })
    expect(wrapper.classes()).toEqual(['o-tag', 'o-tag--accent'])
    expect(wrapper.text()).toBe('production')
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('asks to be removed and leaves the removing to the parent', async () => {
    const wrapper = mount(OTag, {
      props: { removable: true, removeLabel: 'Remove the filter' },
      slots: { default: 'failing' },
    })
    const button = wrapper.find('button')
    expect(button.attributes()).toMatchObject({ type: 'button', 'aria-label': 'Remove the filter' })
    await button.trigger('click')
    expect(wrapper.emitted('remove')).toHaveLength(1)
    expect(wrapper.find('.o-tag').exists()).toBe(true)
  })
})

describe('oCard header and footer', () => {
  it('has neither unless asked', () => {
    const wrapper = mount(OCard, { slots: { default: 'Body' } })
    expect(wrapper.find('.o-card__head').exists()).toBe(false)
    expect(wrapper.find('.o-card__footer').exists()).toBe(false)
    expect(wrapper.text()).toBe('Body')
  })

  it('shows the label, the title at the given level, actions and a footer', () => {
    const wrapper = mount(OCard, {
      props: { label: 'Usage', title: 'Requests', titleAs: 'h2' },
      slots: { default: 'Body', actions: '<button>More</button>', footer: 'Updated now' },
    })
    expect(wrapper.find('.o-card__label').text()).toBe('Usage')
    expect(wrapper.find('h2.o-card__title').text()).toBe('Requests')
    expect(wrapper.find('.o-card__actions button').text()).toBe('More')
    expect(wrapper.find('footer.o-card__footer').text()).toBe('Updated now')
  })
})
