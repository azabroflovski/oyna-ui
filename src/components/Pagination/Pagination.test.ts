import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OPagination from './Pagination.vue'

const pages = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('.o-pagination__list > *:not(.o-pagination__arrow)').map((item) => item.text())

describe('oPagination', () => {
  it('counts the pages from the total and the page size', () => {
    const wrapper = mount(OPagination, { props: { total: 45, pageSize: 10 } })
    expect(wrapper.element.tagName).toBe('NAV')
    expect(wrapper.attributes('aria-label')).toBe('Pages')
    expect(pages(wrapper)).toEqual(['1', '2', '3', '4', '5'])
    expect(wrapper.find('[data-selected]').text()).toBe('1')
  })

  it('folds the far pages into gaps but keeps the first and the last', () => {
    const wrapper = mount(OPagination, { props: { total: 200, pageSize: 10, page: 10 } })
    expect(pages(wrapper)).toEqual(['1', '…', '9', '10', '11', '…', '20'])
  })

  it('goes to a page on a click and steps with the arrows', async () => {
    const wrapper = mount(OPagination, { props: { total: 50, pageSize: 10, page: 2 } })
    await wrapper.findAll('.o-pagination__page:not(.o-pagination__arrow)')[3]!.trigger('click')
    const [prev, next] = wrapper.findAll('.o-pagination__arrow')
    expect(prev!.attributes('aria-label')).toBe('Previous page')
    await next!.trigger('click')
    expect(wrapper.emitted('update:page')!.map(([page]) => page)).toEqual([4, 5])
  })

  it('turns the arrow off at an end', () => {
    const wrapper = mount(OPagination, { props: { total: 30, pageSize: 10, page: 1 } })
    const [prev, next] = wrapper.findAll('.o-pagination__arrow')
    expect(prev!.attributes('disabled')).toBeDefined()
    expect(next!.attributes('disabled')).toBeUndefined()
  })
})
