import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OBarChart from './BarChart.vue'

describe('oBarChart', () => {
  it('scales bars to the highest and shows values and labels', () => {
    const wrapper = mount(OBarChart, {
      props: {
        items: [
          { label: 'Mon', value: 5 },
          { label: 'Tue', value: 10, display: '10 s', tone: 'danger' as const, dot: true },
        ],
      },
    })
    const bars = wrapper.findAll('.o-bar-chart__bar')
    expect(bars[0]!.attributes('style')).toContain('height: 50%')
    expect(bars[1]!.attributes('style')).toContain('height: 100%')
    expect(bars[1]!.classes()).toContain('o-bar-chart__bar--danger')
    expect(bars[1]!.find('.o-bar-chart__dot').exists()).toBe(true)
    expect(wrapper.findAll('.o-bar-chart__value').map((v) => v.text())).toEqual(['5', '10 s'])
    expect(wrapper.findAll('.o-bar-chart__label').map((v) => v.text())).toEqual(['Mon', 'Tue'])
    expect(wrapper.findAll('li')[1]!.attributes('aria-label')).toBe('Tue: 10 s')
  })

  it('drops the text when there are many bars', () => {
    const items = Array.from({ length: 13 }, (_, i) => ({ label: `#${i}`, value: i }))
    const wrapper = mount(OBarChart, { props: { items } })
    expect(wrapper.classes()).toContain('o-bar-chart--dense')
    expect(wrapper.find('.o-bar-chart__value').exists()).toBe(false)
    expect(wrapper.find('.o-bar-chart__label').exists()).toBe(false)
  })
})
