import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OCard from '../Card/Card.vue'
import OSurface from './Surface.vue'

describe('oSurface', () => {
  it('has no ring unless it signals something', () => {
    expect(mount(OSurface).classes()).toEqual(['o-surface'])
    expect(mount(OSurface, { props: { signal: 'danger' } }).classes()).toContain('o-surface--danger')
  })

  it('renders the given element', () => {
    expect(mount(OSurface, { props: { as: 'section' } }).element.tagName).toBe('SECTION')
  })
})

describe('oCard', () => {
  it('is a padded strong surface that passes the signal on', () => {
    const wrapper = mount(OCard, { props: { signal: 'accent' }, slots: { default: 'Plan' } })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['o-surface', 'o-surface--strong', 'o-surface--accent', 'o-card']),
    )
    expect(wrapper.text()).toBe('Plan')
  })
})
