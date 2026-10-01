import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OButton from '../Button/Button.vue'
import OEmpty from '../Empty/Empty.vue'
import OSkeleton from '../Skeleton/Skeleton.vue'
import OSpinner from './Spinner.vue'

const press = (code: string) =>
  window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true }))

describe('oSpinner', () => {
  it('is a status with a label', () => {
    expect(mount(OSpinner).attributes()).toMatchObject({ role: 'status', 'aria-label': 'Loading' })
    expect(mount(OSpinner, { props: { label: 'Saving' } }).attributes('aria-label')).toBe('Saving')
  })
})

describe('oSkeleton', () => {
  it('is hidden from screen readers', () => {
    expect(mount(OSkeleton).attributes('aria-hidden')).toBe('true')
  })
})

describe('oEmpty', () => {
  it('shows the title, and the text and actions only when given', () => {
    const bare = mount(OEmpty, { props: { title: 'No deploys' } })
    expect(bare.find('.o-empty__title').text()).toBe('No deploys')
    expect(bare.find('.o-empty__text').exists()).toBe(false)
    expect(bare.find('.o-empty__actions').exists()).toBe(false)

    const full = mount(OEmpty, {
      props: { title: 'No deploys' },
      slots: { default: 'Ship one', actions: '<button>New</button>' },
    })
    expect(full.find('.o-empty__text').text()).toBe('Ship one')
    expect(full.find('.o-empty__actions button').text()).toBe('New')
  })
})

describe('oButton loading', () => {
  it('shows a spinner, says it is busy and ignores its hotkey', () => {
    const wrapper = mount(OButton, {
      props: { loading: true, hotkey: 'KeyR' },
      slots: { default: 'Save' },
      attachTo: document.body,
    })
    expect(wrapper.find('.o-spinner').exists()).toBe(true)
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.classes()).toContain('o-button--loading')
    press('KeyR')
    expect(wrapper.emitted('click')).toBeUndefined()
    wrapper.unmount()
  })
})
