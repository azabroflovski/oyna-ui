import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import OSlider from './Slider.vue'

describe('oSlider', () => {
  afterEach(() => document.body.replaceChildren())

  it('puts the label and the value on the thumb, the class on the track', async () => {
    const wrapper = mount(OSlider, {
      props: { modelValue: 14, min: 0, max: 24 },
      attrs: { 'aria-label': 'Radius', class: 'wide' },
      attachTo: document.body,
    })
    await nextTick()
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['o-slider', 'wide']))
    expect(wrapper.find('[role="slider"]').attributes()).toMatchObject({
      'aria-label': 'Radius',
      'aria-valuenow': '14',
      'aria-valuemin': '0',
      'aria-valuemax': '24',
    })
    wrapper.unmount()
  })

  it('moves by a step on an arrow key and gives a number, not a list', async () => {
    const wrapper = mount(OSlider, { props: { modelValue: 10, step: 5 }, attachTo: document.body })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([[15]])
    wrapper.unmount()
  })
})
