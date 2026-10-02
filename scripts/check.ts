// Opens the docs in a real browser, opens every layer, and saves screenshots; then runs axe-core on
// a set of pages and prints what it finds. Start the docs first: `bun run docs:dev`.
//
//   bun scripts/check.ts <folder for screenshots> [base url]
import { launch } from './browser'

const out = process.argv[2]
const base = process.argv[3] ?? 'http://localhost:5173'
if (!out) throw new Error('Usage: bun scripts/check.ts <folder for screenshots> [base url]')

const page = await launch()
const shot = (name: string) => page.screenshot(`${out}/${name}.png`)

try {
  await page.size(1280, 800)

  await page.goto(`${base}/components/select`)
  await page.click('.demo .o-select')
  await page.wait(300)
  await shot('select-open')

  await page.goto(`${base}/components/combobox`)
  await page.click('.demo .o-combobox__input')
  await page.wait(300)
  await shot('combobox-open')

  await page.goto(`${base}/components/command`)
  await page.press('KeyK')
  await page.wait(300)
  await shot('command-open')
  await page.press('Escape')

  await page.goto(`${base}/components/drawer`)
  await page.press('KeyF')
  await page.wait(300)
  await shot('drawer-open')
  await page.press('Escape')

  await page.goto(`${base}/components/dropdown-menu`)
  await page.click('.demo .o-button')
  await page.wait(300)
  await shot('menu-open')

  await page.goto(`${base}/components/popover`)
  await page.click('.demo .o-button')
  await page.wait(300)
  await shot('popover-open')

  await page.goto(`${base}/components/tooltip`)
  await page.hover('.demo .o-button')
  await page.wait(700)
  await shot('tooltip-open')

  await page.goto(`${base}/components/toast`)
  await page.click('.demo .o-button:nth-child(2)')
  await page.click('.demo .o-button:nth-child(3)')
  await page.wait(300)
  await shot('toasts')

  await page.goto(`${base}/components/dialog`)
  await page.press('KeyD')
  await page.wait(300)
  await shot('dialog-open')
  await page.press('Escape')

  await page.goto(`${base}/`)
  await page.press('Slash')
  await page.wait(300)
  await shot('search-open')

  await page.goto(`${base}/examples/settings`)
  for (const [index, name] of ['profile', 'team', 'tokens', 'notifications', 'keys'].entries()) {
    await page.click(`[role="tab"]:nth-child(${index + 1})`)
    await page.wait(200)
    await shot(`settings-${name}`)
  }

  await page.goto(`${base}/theme`)
  await shot('theme-default')
  await page.click('.editor__panel .o-button:nth-child(2)')
  await page.wait(300)
  await shot('theme-cyan')
  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
  await page.wait(200)
  await shot('theme-css')

  await page.goto(`${base}/examples/incident`)
  await page.press('KeyR')
  await page.wait(300)
  await shot('incident-dialog')
  await page.press('Enter')
  await page.wait(2400)
  await shot('incident-resolved')

  await page.goto(`${base}/examples/projects`)
  await page.click('.projects .o-table .o-button')
  await page.wait(300)
  await shot('projects-menu')
  await page.press('Escape')
  await page.click('.projects__search')
  await page.evaluate(
    `(() => { const el = document.querySelector('.projects__search'); el.value = 'zzz'; el.dispatchEvent(new Event('input')) })()`,
  )
  await page.wait(200)
  await shot('projects-nothing-found')

  await page.goto(`${base}/examples/`)
  await shot('examples-index')

  // a phone
  await page.size(390, 844, true)
  for (const [name, path] of [
    ['phone-home', '/'],
    ['phone-button', '/components/button'],
    ['phone-dashboard', '/examples/dashboard'],
    ['phone-settings', '/examples/settings'],
    ['phone-incident', '/examples/incident'],
    ['phone-projects', '/examples/projects'],
    ['phone-examples', '/examples/'],
    ['phone-theme', '/theme'],
  ] as const) {
    await page.goto(`${base}${path}`)
    await shot(name)
  }

  // accessibility: what axe-core can decide by itself
  await page.size(1280, 800)
  const axe = await Bun.file(new URL('../node_modules/axe-core/axe.min.js', import.meta.url)).text()
  let total = 0
  for (const path of [
    '/',
    '/components/button',
    '/components/input',
    '/components/radio',
    '/components/table',
    '/components/tabs',
    '/examples/dashboard',
    '/examples/settings',
    '/examples/incident',
    '/examples/projects',
    '/examples/',
    '/components/alert',
    '/components/pin-input',
    '/components/card',
    '/components/tag',
    '/components/timeline',
    '/components/avatar',
    '/components/slider',
    '/components/combobox',
    '/components/command',
    '/components/context-menu',
    '/components/drawer',
    '/components/accordion',
    '/components/pagination',
    '/theme',
    '/guide/why',
  ]) {
    await page.goto(`${base}${path}`)
    await page.evaluate(axe)
    const found = await page.evaluate<{ id: string; impact: string; help: string; nodes: string[] }[]>(
      `axe.run(document, { resultTypes: ['violations'] }).then(r => r.violations.map(v => ({
        id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map(n => n.target.join(' ')),
      })))`,
    )
    total += found.length
    console.log(`${path}: ${found.length ? '' : 'no violations'}`)
    for (const violation of found)
      console.log(`  [${violation.impact}] ${violation.id}: ${violation.help}\n    ${violation.nodes.join('\n    ')}`)
  }
  console.log(`\n${total} kinds of violation in total`)
} finally {
  page.close()
}
