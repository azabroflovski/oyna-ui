// The docs for AI assistants, written at build time next to the site:
//
//   /llms.txt             what the library is, the rules that are easy to get wrong, a list of pages
//   /llms-full.txt        every page in one file
//   /<page>.md            each page as plain Markdown
//
// An assistant has not seen this library in its training, so these files are how it writes correct
// code for it. They are made from the same Markdown as the site: no second copy to keep in step.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import type { ThemeConfig } from './config'

interface Page {
  url: string
  title: string
  /** The first paragraph: what the thing is for. */
  summary: string
  markdown: string
}

/** Applies `change` to the parts of a Markdown source that are not inside a code fence. */
function outsideCode(source: string, change: (text: string) => string) {
  return source
    .split(/(^`{3,}[^\n]*\n[\s\S]*?^`{3,}[ \t]*$)/m)
    .map((part, index) => (index % 2 ? part : change(part)))
    .join('')
}

/** A page of the docs as Markdown a model can read: no live demos, no Vue, links that work anywhere. */
function clean(source: string, site: string) {
  const body = source
    .replace(/^---[\s\S]*?^---\s*$/m, '')
    // the script that feeds the live demos stands before the title
    .replace(/^\s*<script setup>[\s\S]*?<\/script>\s*(?=^# )/m, '')
  return outsideCode(body, (text) =>
    text
      // a live demo is followed by a code block with the same markup
      .replace(/^<Demo[\s\S]*?^<\/Demo>\s*$/gm, '')
      .replace(/^:::.*$/gm, '')
      .replace(/<OKbd[^>]*>([^<]*)<\/OKbd>/g, '`$1`')
      .replace(/<ExampleSource[^>]*\/>/g, '')
      .replace(
        /\]\((\/[^)#\s]*)(#[^)\s]*)?\)/g,
        (_, path: string, hash = '') =>
          // the example screens and the theme editor have no text version: those links go to the site
          `](${site}${path}${/^\/(examples|theme)/.test(path) ? '' : '.md'}${hash})`,
      ),
  )
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function writeLlms(options: {
  srcDir: string
  outDir: string
  site: string
  description: string
  theme: ThemeConfig
}) {
  const { srcDir, outDir, site, theme } = options
  const raw = `${theme.repo.replace('github.com', 'raw.githubusercontent.com')}/${theme.branch}`

  async function page(url: string): Promise<Page | undefined> {
    const source = await readFile(join(srcDir, `${url}.md`), 'utf8').catch(() => undefined)
    const title = source?.match(/^# (.+)$/m)?.[1]
    // the example screens and the theme editor are components, not text: they are listed by their source
    if (!source || !title) return undefined
    const markdown = clean(source, site)
    const summary = markdown
      .replace(/^# .+$/m, '')
      .trim()
      .split(/\n\s*\n/)
      // the first paragraph of prose: not a heading, a code block or a table
      .find((part) => !/^(#|`{3}|\||-)/.test(part))!
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\s+/g, ' ')
    return { url, title, summary, markdown }
  }

  const groups = await Promise.all(
    theme.sidebar
      .filter((group) => group.text !== 'Examples')
      .map(async (group) => ({
        name: group.text,
        pages: (await Promise.all(group.items.map((item) => page(item.link)))).filter((found) => !!found),
      })),
  )
  const pages = groups.flatMap((group) => group.pages)

  const examples = ['dashboard', 'incident', 'projects', 'settings']
    .map((name) => {
      const file = `${name[0]!.toUpperCase()}${name.slice(1)}.vue`
      return `- [${file}](${raw}/docs/examples/${name}/${file}): the source of ${site}/examples/${name}`
    })
    .join('\n')

  const index = `# Oyna UI

> ${options.description} The npm package is \`oyna-ui\`; it needs Vue 3.5 or newer.

Things that are easy to get wrong:

- Components are prefixed with \`O\`: \`<OButton>\`, \`<OCard>\`, \`<ODropdownMenu>\`. CSS variables are prefixed with \`--o-\`, classes with \`.o-\`.
- Set it up with \`import oyna from 'oyna-ui'\`, \`import 'oyna-ui/style.css'\` and \`app.use(oyna)\`, or import single components by name. There is no Tailwind or UnoCSS to configure.
- The look is dark glass over a rich background: put \`<OBackground />\` on the page once. There is no light theme.
- A hotkey is a physical key code, \`KeyboardEvent.code\`: \`hotkey="KeyD"\`, \`hotkey="Enter"\`, \`hotkey="Slash"\`; never a character such as \`"d"\`, and never a combination.
- The library ships no icons. Pass an \`<svg>\` or a component from \`@lucide/vue\` in a slot.
- Colour is a signal: one accent (\`variant="primary"\`, \`tone="accent"\`) for the main thing on a screen, \`tone="danger"\` for something at stake. Do not add borders or other colours.
- \`OMenu\` was renamed to \`ODropdownMenu\` in 0.2.0.

${groups
  .map(
    (group) =>
      `## ${group.name}\n\n${group.pages.map((found) => `- [${found.title}](${site}${found.url}.md): ${found.summary}`).join('\n')}`,
  )
  .join('\n\n')}

## Examples

Whole screens built only from the library's components; the best place to see how they are put together.

${examples}

## Optional

- [Every page in one file](${site}/llms-full.txt)
- [Changelog](${raw}/CHANGELOG.md)
`

  await writeFile(join(outDir, 'llms.txt'), index)
  await writeFile(
    join(outDir, 'llms-full.txt'),
    `# Oyna UI: the whole documentation\n\n> ${options.description}\n\n${pages.map((found) => `${found.markdown}\n\nSource: ${site}${found.url}`).join('\n\n---\n\n')}\n`,
  )
  for (const found of pages) {
    const file = join(outDir, `${found.url}.md`)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, `${found.markdown}\n`)
  }
  return pages.length
}
