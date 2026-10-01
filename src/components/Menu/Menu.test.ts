import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import OButton from '../Button/Button.vue'
import OPopover from '../Popover/Popover.vue'
import OMenu from './Menu.vue'

const press = (code: string) => window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true }))

describe('oMenu', () => {
  afterEach(() => document.body.replaceChildren())

  it('makes its child the trigger of a closed menu', () => {
    const wrapper = mount(OMenu, { props: { items: [{ label: 'Rename' }, { separator: true }, { label: 'Delete', tone: 'danger' }] }, slots: { default: () => h(OButton, () => 'Actions') }, attachTo: document.body })
    expect(wrapper.find('button.o-button').attributes()).toMatchObject({ 'aria-haspopup': 'menu', 'aria-expanded': 'false' })
    expect(document.querySelector('.o-menu')).toBeNull()
    wrapper.unmount()
  })
})

describe('oPopover', () => {
  afterEach(() => document.body.replaceChildren())

  it('shows its content when open and hands it a way to close', async () => {
    const open = ref(true)
    const App = defineComponent(() => () => h(OPopover, { 'open': open.value, 'onUpdate:open': (value: boolean) => open.value = value }, {
      default: () => h(OButton, () => 'Filter'),
      content: ({ close }: { close: () => void }) => h('button', { class: 'done', onClick: close }, 'Done'),
    }))
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()
    expect(document.querySelector('.o-popover')?.textContent).toContain('Done')
    document.querySelector<HTMLElement>('.done')!.click()
    expect(open.value).toBe(false)
    wrapper.unmount()
  })

  it('keeps hotkeys behind it off while open, and its own on', async () => {
    const open = ref(true)
    const hits = { behind: 0, inside: 0 }
    const App = defineComponent(() => () => [
      h(OButton, { hotkey: 'KeyR', onClick: () => hits.behind++ }, () => 'Behind'),
      h(OPopover, { 'open': open.value, 'onUpdate:open': (value: boolean) => open.value = value }, {
        default: () => h(OButton, () => 'Filter'),
        content: () => h(OButton, { hotkey: 'KeyR', onClick: () => hits.inside++ }, () => 'Inside'),
      }),
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
