import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OAvatar from './Avatar.vue'

describe('oAvatar', () => {
  it('shows the initials of the name and reads the name out', () => {
    const wrapper = mount(OAvatar, { props: { name: 'Ada Lovelace' } })
    expect(wrapper.attributes()).toMatchObject({ role: 'img', 'aria-label': 'Ada Lovelace' })
    expect(wrapper.find('.o-avatar__initials').text()).toBe('AL')
  })

  it('takes one letter from a single word and at most two from a long name', () => {
    expect(mount(OAvatar, { props: { name: 'grace' } }).text()).toBe('G')
    expect(mount(OAvatar, { props: { name: '  Ada   King   Lovelace ' } }).text()).toBe('AK')
  })

  it('has a size class', () => {
    expect(mount(OAvatar, { props: { name: 'Ada', size: 'lg' } }).classes()).toContain('o-avatar--lg')
  })
})
