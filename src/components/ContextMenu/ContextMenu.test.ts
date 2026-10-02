import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'

import OContextMenu from './ContextMenu.vue'

const items = [{ label: 'Rename' }, { separator: true as const }, { label: 'Delete', tone: 'danger' as const }]
const area = () => h('div', { class: 'area' }, 'A row')

describe('oContextMenu', () => {
  afterEach(() => document.body.replaceChildren())

  it('keeps the menu out of the page until a right click', async () => {
    const wrapper = mount(OContextMenu, { props: { items }, slots: { default: area }, attachTo: document.body })
    expect(wrapper.find('.area').text()).toBe('A row')
    expect(document.querySelector('.o-context-menu')).toBeNull()

    await wrapper.find('.area').trigger('contextmenu', { clientX: 40, clientY: 40 })
    await nextTick()
    const menu = document.querySelector('.o-context-menu')!
    expect(menu.getAttribute('role')).toBe('menu')
    expect([...menu.querySelectorAll('[role="menuitem"]')].map((item) => item.textContent?.trim())).toEqual([
      'Rename',
      'Delete',
    ])
    expect(menu.querySelector('.o-dropdown-menu__item--danger')!.textContent?.trim()).toBe('Delete')
    wrapper.unmount()
  })

  it('leaves the right click to the browser when disabled', async () => {
    const wrapper = mount(OContextMenu, {
      props: { items, disabled: true },
      slots: { default: area },
      attachTo: document.body,
    })
    await wrapper.find('.area').trigger('contextmenu', { clientX: 40, clientY: 40 })
    await nextTick()
    expect(document.querySelector('.o-context-menu')).toBeNull()
    wrapper.unmount()
  })
})
