import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import ODrawer from './Drawer.vue'

describe('oDrawer', () => {
  afterEach(() => document.body.replaceChildren())

  it('is a dialog standing at the right edge by default', async () => {
    const wrapper = mount(ODrawer, {
      props: { open: true, title: 'Filters', description: 'Applied to the list.' },
      slots: { default: 'Body' },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = document.querySelector('[role="dialog"]')!
    expect([...dialog.classList]).toEqual(expect.arrayContaining(['o-dialog', 'o-drawer', 'o-drawer--right']))
    expect(dialog.querySelector('.o-dialog__title')!.textContent?.trim()).toBe('Filters')
    expect(dialog.textContent).toContain('Applied to the list.')
    expect(dialog.textContent).toContain('Body')
    wrapper.unmount()
  })

  it('takes a side and passes other attributes to the dialog', async () => {
    const wrapper = mount(ODrawer, {
      props: { open: true, title: 'Filters', side: 'bottom' },
      attrs: { class: 'wide', 'data-test': 'sheet' },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = document.querySelector('[role="dialog"]')!
    expect([...dialog.classList]).toEqual(expect.arrayContaining(['o-drawer--bottom', 'wide']))
    expect(dialog.getAttribute('data-test')).toBe('sheet')
    wrapper.unmount()
  })

  it('closes from its close button', async () => {
    const wrapper = mount(ODrawer, { props: { open: true, title: 'Filters' }, attachTo: document.body })
    await nextTick()
    document.querySelector<HTMLElement>('.o-dialog__close')!.click()
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    wrapper.unmount()
  })

  it('renders nothing while closed', () => {
    const wrapper = mount(ODrawer, { props: { title: 'Filters' }, attachTo: document.body })
    expect(document.querySelector('.o-drawer')).toBeNull()
    wrapper.unmount()
  })
})
