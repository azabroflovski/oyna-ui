import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'

import OButton from '../Button/Button.vue'
import ODialog from './Dialog.vue'

const press = (code: string) =>
  window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true }))

describe('oDialog', () => {
  afterEach(() => document.body.replaceChildren())

  it('renders its title and content in a dialog when open', async () => {
    const wrapper = mount(ODialog, {
      props: { open: true, title: 'Settings' },
      slots: { default: 'Body' },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog.querySelector('.o-dialog__title')!.textContent?.trim()).toBe('Settings')
    expect(dialog.textContent).toContain('Body')
    expect(dialog.hasAttribute('aria-describedby')).toBe(false)
    wrapper.unmount()
  })

  it('ties the description to the dialog', async () => {
    const wrapper = mount(ODialog, {
      props: { open: true, title: 'Settings', description: 'Kept on this device.' },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = document.querySelector('[role="dialog"]')!
    const description = document.getElementById(dialog.getAttribute('aria-describedby')!)
    expect(description?.textContent?.trim()).toBe('Kept on this device.')
    wrapper.unmount()
  })

  it('renders nothing when closed', () => {
    const wrapper = mount(ODialog, { props: { open: false, title: 'Settings' }, attachTo: document.body })
    expect(document.querySelector('[role="dialog"]')).toBeNull()
    wrapper.unmount()
  })

  it('keeps hotkeys behind an open dialog off, and its own on', async () => {
    const open = ref(true)
    const hits = { behind: 0, inside: 0 }
    const App = defineComponent(() => () => [
      h(OButton, { hotkey: 'KeyR', onClick: () => hits.behind++ }, () => 'Behind'),
      h(
        ODialog,
        { open: open.value, 'onUpdate:open': (value: boolean) => (open.value = value), title: 'Settings' },
        () => h(OButton, { hotkey: 'KeyR', onClick: () => hits.inside++ }, () => 'Inside'),
      ),
    ])
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()

    press('KeyR')
    expect(hits).toEqual({ behind: 0, inside: 1 })

    open.value = false
    await nextTick()
    press('KeyR')
    expect(hits).toEqual({ behind: 1, inside: 1 })
    wrapper.unmount()
  })
})
