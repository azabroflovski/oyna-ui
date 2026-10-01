import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import OTable from './Table.vue'

const columns = [{ key: 'name', label: 'Name' }, { key: 'score', label: 'Score', numeric: true }] as const
const rows = [{ name: 'ada', score: 12 }, { name: 'you', score: 9 }]

describe('oTable', () => {
  it('renders headers and cells', () => {
    const wrapper = mount(OTable, { props: { columns, rows } })
    expect(wrapper.findAll('th').map(th => th.text())).toEqual(['Name', 'Score'])
    expect(wrapper.findAll('tbody tr').map(tr => tr.findAll('td').map(td => td.text()))).toEqual([['ada', '12'], ['you', '9']])
    expect(wrapper.findAll('td')[1]!.classes()).toContain('o-table__numeric')
  })

  it('rings the row that signals something', () => {
    const wrapper = mount(OTable, { props: { columns, rows, rowKey: 'name', signal: (row: Record<string, unknown>) => row.name === 'you' ? 'accent' as const : undefined } })
    const [first, second] = wrapper.findAll('tbody tr')
    expect(first!.classes()).toEqual([])
    expect(second!.classes()).toEqual(['o-table__row--accent'])
  })

  it('lets a slot named after a column draw its cells', () => {
    const wrapper = mount(OTable, { props: { columns, rows }, slots: { name: ({ value }: { value: unknown }) => h('b', `@${value}`) } })
    expect(wrapper.findAll('tbody b').map(b => b.text())).toEqual(['@ada', '@you'])
  })
})
