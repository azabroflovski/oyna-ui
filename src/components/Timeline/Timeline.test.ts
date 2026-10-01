import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import OTimeline from './Timeline.vue'

const items = [
  { title: 'v1.4.1 is live', time: '2 min ago', tone: 'accent' as const },
  { title: 'Tests passed', time: '4 min ago', text: '214 tests' },
  { title: 'Build failed', tone: 'danger' as const },
  { title: 'Migrate the database', pending: true },
]

describe('oTimeline', () => {
  it('renders the events in order as a list', () => {
    const wrapper = mount(OTimeline, { props: { items } })
    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.findAll('.o-timeline__title').map((el) => el.text())).toEqual(items.map((item) => item.title))
    expect(wrapper.findAll('.o-timeline__time').map((el) => el.text())).toEqual(['2 min ago', '4 min ago'])
    expect(wrapper.findAll('.o-timeline__text').map((el) => el.text())).toEqual(['214 tests'])
  })

  it('marks toned and pending events', () => {
    const rows = mount(OTimeline, { props: { items } }).findAll('li')
    expect(rows[0]!.classes()).toContain('o-timeline__item--accent')
    expect(rows[1]!.classes()).toEqual(['o-timeline__item'])
    expect(rows[2]!.classes()).toContain('o-timeline__item--danger')
    expect(rows[3]!.classes()).toContain('o-timeline__item--pending')
  })

  it('puts the slot under every event, with the event', () => {
    const wrapper = mount(OTimeline, {
      props: { items },
      slots: { default: ({ item }: { item: { title: string } }) => h('b', item.title.length) },
    })
    expect(wrapper.findAll('.o-timeline__more b').map((el) => el.text())).toEqual(
      items.map((item) => String(item.title.length)),
    )
  })
})
