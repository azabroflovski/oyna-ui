import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { toast, toasts } from './toast'
import OToaster from './Toaster.vue'

describe('toast', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    toasts.value = []
    vi.useRealTimers()
    document.body.replaceChildren()
  })

  it('shows a message and removes it after its duration', async () => {
    const wrapper = mount(OToaster, { attachTo: document.body })
    toast('Saved')
    toast('Failed', { tone: 'danger', duration: 1000 })
    await nextTick()
    const shown = [...document.querySelectorAll('.o-toast')]
    expect(shown.map(el => [el.textContent?.trim(), el.getAttribute('role')])).toEqual([['Saved', 'status'], ['Failed', 'alert']])

    vi.advanceTimersByTime(1000)
    expect(toasts.value.map(t => t.message)).toEqual(['Saved'])
    vi.advanceTimersByTime(3000)
    expect(toasts.value).toEqual([])
    wrapper.unmount()
  })

  it('stays until clicked with a zero duration', async () => {
    const wrapper = mount(OToaster, { attachTo: document.body })
    toast('Read me', { duration: 0 })
    vi.advanceTimersByTime(60_000)
    await nextTick()
    document.querySelector<HTMLElement>('.o-toast')!.click()
    expect(toasts.value).toEqual([])
    wrapper.unmount()
  })
})
