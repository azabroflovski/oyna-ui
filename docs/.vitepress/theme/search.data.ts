// The search index, made at build time: every page cut into sections at its h2 headings, as plain
// text. Search.vue loads it the first time the search is opened.
//
// It reads the Markdown source rather than the rendered page: rendering here breaks on pages that
// include files (`<<< ./file`), which need to know where the page is.
import { createContentLoader } from 'vitepress'

export interface Section {
  /** The address of the section: the page, plus the heading's anchor when it is not the top one. */
  url: string
  page: string
  /** Empty for the part of a page before its first h2. */
  heading: string
  text: string
}

declare const data: Section[]
export { data }

/** Markdown to the words a reader sees: no code blocks, no tags, no syntax. */
function plain(source: string) {
  return source
    .replace(/^(`{3,})[\s\S]*?^\1\s*$/gm, ' ')
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/^(:::|<<<).*$/gm, ' ')
    .replace(/^\|[\s:|-]+\|\s*$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\\\|/g, '|')
    .replace(/[`*|]/g, ' ')
    .replace(/^#+\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** The anchor VitePress gives a heading (the same steps as its own slugify). */
function anchor(heading: string) {
  return (
    heading
      .normalize('NFKD')
      .replace(/[\u0300-\u036F]/g, '')
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F]/g, '')
      .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/^(\d)/, '_$1')
      .toLowerCase()
  )
}

export default createContentLoader('**/*.md', {
  includeSrc: true,
  transform(pages): Section[] {
    return pages.flatMap((page) => {
      const source = (page.src ?? '').replace(/^---[\s\S]*?^---\s*$/m, '')
      const title = plain(source.match(/^# (.+)$/m)?.[1] ?? '')
      // pages without a title of their own (the home page, the example screens) are found by name only
      if (!title) return []
      const url = page.url.replace(/\.html$/, '')
      const [intro = '', ...rest] = source.replace(/^# .+$/m, '').split(/^(?=## )/m)
      return [
        { url, page: title, heading: '', text: plain(intro) },
        ...rest.map((part) => {
          const heading = plain(part.match(/^## (.+)$/m)?.[1] ?? '')
          return { url: `${url}#${anchor(heading)}`, page: title, heading, text: plain(part.replace(/^## .+$/m, '')) }
        }),
      ]
    })
  },
})
