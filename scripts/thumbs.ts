// Redraws the screenshots of the example screens shown in the gallery (docs/public/examples/*.jpg).
// Start the docs first: `bun run docs:dev`.
//
//   bun scripts/thumbs.ts [base url]
import { launch } from './browser'

const base = process.argv[2] ?? 'http://localhost:5173'
// the element holding the example itself, without the site header and the notes under it
const examples = { dashboard: '.dash', incident: '.incident', projects: '.projects', settings: '.settings' }
// what to click first, where the opening view is not the telling one: the settings show the Team tab
const before: Record<string, string> = { settings: '[role="tab"]:nth-child(2)' }
// air around the example, so its heading does not touch the edge of the picture
const margin = 56

const page = await launch()
try {
  // wider than the page's content, so there is room for the margin on both sides: a rectangle that
  // starts left of the page is not cropped by Chrome, it is silently taken from the top left corner
  await page.size(1440, 900)
  for (const [name, selector] of Object.entries(examples)) {
    await page.goto(`${base}/examples/${name}`)
    await page.waitFor(selector)
    if (before[name]) {
      await page.click(before[name])
      await page.wait(300)
    }
    // Every picture is the full width of the page and 16:9, whatever the size of the example, so
    // the gallery never has to crop one. The site header and the row of links above the example are hidden:
    // they would poke into the margin.
    const clip = await page.evaluate<{ x: number; y: number; width: number; height: number }>(`(() => {
      document.querySelectorAll('.top, .example-nav, .example-source').forEach(el => el.style.visibility = 'hidden')
      const frame = document.querySelector('.example').getBoundingClientRect()
      const top = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().y + scrollY
      const width = frame.width + ${margin * 2}
      return { x: frame.x - ${margin}, y: top - ${margin}, width, height: Math.round(width * 9 / 16) }
    })()`)
    await page.screenshot(new URL(`../docs/public/examples/${name}.jpg`, import.meta.url).pathname, clip)
  }
} finally {
  page.close()
}
