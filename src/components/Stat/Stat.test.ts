import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import OBadge from '../Badge/Badge.vue'
import OProgress from '../Progress/Progress.vue'
import OStat from './Stat.vue'

describe('oStat', () => {
  it('shows a label and a value, toned when asked', () => {
    const wrapper = mount(OStat, { props: { label: 'Median', tone: 'accent' }, slots: { default: '142 ms' } })
    expect(wrapper.find('.o-stat__label').text()).toBe('Median')
    expect(wrapper.find('.o-stat__value').text()).toBe('142 ms')
    expect(wrapper.find('.o-stat__value').classes()).toContain('o-stat__value--accent')
  })
})

describe('oProgress', () => {
  it('is a progressbar filled by value / max, kept within the track', () => {
    const wrapper = mount(OProgress, { props: { value: 3, max: 4 } })
    expect(wrapper.attributes()).toMatchObject({ 'role': 'progressbar', 'aria-valuenow': '3', 'aria-valuemax': '4' })
    expect(wrapper.find('.o-progress__bar').attributes('style')).toContain('width: 75%')
    expect(mount(OProgress, { props: { value: 150 } }).find('.o-progress__bar').attributes('style')).toContain('width: 100%')
    expect(mount(OProgress, { props: { value: -5 } }).find('.o-progress__bar').attributes('style')).toContain('width: 0%')
  })
})

describe('oBadge', () => {
  it('renders its content, toned when asked', () => {
    expect(mount(OBadge, { slots: { default: 'Pro' } }).classes()).toEqual(['o-badge'])
    expect(mount(OBadge, { props: { tone: 'danger' } }).classes()).toContain('o-badge--danger')
  })
})
