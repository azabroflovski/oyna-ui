import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OSparkline from '../Sparkline/Sparkline.vue'
import OPips from './Pips.vue'

describe('oPips', () => {
  it('fills the done steps', () => {
    const wrapper = mount(OPips, { props: { done: 2, total: 5 } })
    expect(wrapper.findAll('.o-pips__pip')).toHaveLength(5)
    expect(wrapper.findAll('.o-pips__pip--done')).toHaveLength(2)
    expect(wrapper.attributes()).toMatchObject({ 'aria-valuenow': '2', 'aria-valuemax': '5' })
    expect(wrapper.find('.o-pips__marker').exists()).toBe(false)
    expect(wrapper.classes()).toEqual(['o-pips'])
  })

  it('puts the marker on the boundary after that many pips, within the row', () => {
    const left = (marker: number) =>
      mount(OPips, { props: { done: 0, total: 5, marker } })
        .find('.o-pips__marker')
        .attributes('style')
    expect(left(2)).toContain('left: 37px')
    expect(left(0)).toContain('left: -11px')
    expect(left(9)).toContain('left: 109px')
  })
})

describe('oSparkline', () => {
  const points = (props: object) =>
    mount(OSparkline, { props: { values: [1, 3, 2], label: 'Runs', width: 104, height: 24, ...props } })

  it('draws larger values higher and marks the last one', () => {
    const wrapper = points({})
    expect(wrapper.attributes('aria-label')).toBe('Runs')
    expect(wrapper.find('polyline').attributes('points')).toBe('4.0,20.0 52.0,4.0 100.0,12.0')
    expect(wrapper.find('circle').attributes()).toMatchObject({ cx: '100', cy: '12' })
    expect(wrapper.find('circle').classes()).toContain('o-sparkline__dot--accent')
    expect(points({ tone: 'danger' }).find('circle').classes()).toContain('o-sparkline__dot--danger')
  })

  it('draws smaller values higher when lower is better', () => {
    expect(points({ lowerIsBetter: true }).find('polyline').attributes('points')).toBe('4.0,4.0 52.0,20.0 100.0,12.0')
  })

  it('survives one value and none', () => {
    expect(
      points({ values: [5] })
        .find('polyline')
        .attributes('points'),
    ).toBe('4.0,20.0')
    expect(points({ values: [] }).find('circle').exists()).toBe(false)
  })
})
