import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import OCommand from './Command.vue'

const items = [
  { value: 'deploy', label: 'Deploy to production', group: 'Deploys', hint: 'D' },
  { value: 'rollback', label: 'Roll back', group: 'Deploys', keywords: 'revert undo' },
  { value: 'theme', label: 'Open the theme editor', group: 'Go to' },
  { value: 'billing', label: 'Billing', group: 'Go to', disabled: true },
]

const rows = () => [...document.querySelectorAll('.o-command__item')].map((row) => row.textContent)
const type = async (text: string) => {
  const field = document.querySelector<HTMLInputElement>('.o-command input')!
  field.value = text
  field.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
  await nextTick()
}

describe('oCommand', () => {
  afterEach(() => document.body.replaceChildren())

  it('lists the items under their groups in a dialog', async () => {
    const wrapper = mount(OCommand, { props: { items, open: true, title: 'Commands' }, attachTo: document.body })
    await nextTick()
    expect(document.querySelector('[role="dialog"] .o-dialog__title')!.textContent?.trim()).toBe('Commands')
    expect([...document.querySelectorAll('.o-command__label')].map((label) => label.textContent)).toEqual([
      'Deploys',
      'Go to',
    ])
    expect(rows()).toHaveLength(4)
    wrapper.unmount()
  })

  it('finds an item by every typed word, in its label, group or keywords', async () => {
    const wrapper = mount(OCommand, { props: { items, open: true }, attachTo: document.body })
    await nextTick()
    await type('dep prod')
    expect(rows()).toHaveLength(1)
    expect(rows()[0]).toContain('Deploy to production')
    await type('undo')
    expect(rows()[0]).toContain('Roll back')
    await type('zzz')
    expect(rows()).toHaveLength(0)
    expect(document.querySelector('.o-command__empty')!.textContent).toBe('Nothing found')
    wrapper.unmount()
  })

  it('gives the chosen item and closes', async () => {
    const wrapper = mount(OCommand, { props: { items, open: true }, attachTo: document.body })
    await nextTick()
    document.querySelectorAll<HTMLElement>('.o-command__item')[2]!.click()
    await nextTick()
    expect(wrapper.emitted('select')).toEqual([[items[2]]])
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    wrapper.unmount()
  })

  it('renders nothing while closed', () => {
    const wrapper = mount(OCommand, { props: { items }, attachTo: document.body })
    expect(document.querySelector('.o-command')).toBeNull()
    wrapper.unmount()
  })
})
