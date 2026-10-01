import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OTabs from './Tabs.vue'

const items = [{ value: 'today', label: 'Today' }, { value: 'week', label: 'Week' }]

describe('oTabs', () => {
  it('opens the first tab without a v-model', () => {
    const wrapper = mount(OTabs, { props: { items }, slots: { today: 'Today panel', week: 'Week panel' } })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs.map(tab => tab.text())).toEqual(['Today', 'Week'])
    expect(tabs[0]!.attributes('aria-selected')).toBe('true')
    expect(wrapper.find('[role="tabpanel"]').text()).toBe('Today panel')
  })

  it('follows v-model and renders no panels without slots', () => {
    const wrapper = mount(OTabs, { props: { items, modelValue: 'week', variant: 'underline' } })
    expect(wrapper.classes()).toContain('o-tabs--underline')
    expect(wrapper.findAll('[role="tab"]')[1]!.attributes('aria-selected')).toBe('true')
    expect(wrapper.find('[role="tabpanel"]').exists()).toBe(false)
  })
})
