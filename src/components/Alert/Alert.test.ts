import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OAlert from './Alert.vue'

describe('oAlert', () => {
  it('shows the title and the details, with no ring unless toned', () => {
    const wrapper = mount(OAlert, { props: { title: 'Heads up' }, slots: { default: 'Maintenance tonight.' } })
    expect(wrapper.classes()).toEqual(['o-alert'])
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.find('.o-alert__title').text()).toBe('Heads up')
    expect(wrapper.find('.o-alert__text').text()).toBe('Maintenance tonight.')
    expect(wrapper.find('.o-alert__close').exists()).toBe(false)
    expect(wrapper.find('.o-alert__actions').exists()).toBe(false)
  })

  it('interrupts a screen reader only when something is wrong', () => {
    const danger = mount(OAlert, { props: { tone: 'danger' } })
    expect(danger.classes()).toContain('o-alert--danger')
    expect(danger.attributes('role')).toBe('alert')
    expect(mount(OAlert, { props: { tone: 'accent' } }).attributes('role')).toBe('status')
  })

  it('asks to be closed and leaves hiding to the parent', async () => {
    const wrapper = mount(OAlert, { props: { closable: true }, slots: { actions: '<button class="act">Fix</button>' } })
    expect(wrapper.find('.o-alert__actions .act').text()).toBe('Fix')
    await wrapper.find('.o-alert__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.find('.o-alert').exists()).toBe(true)
  })
})
