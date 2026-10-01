// Redraws the screenshots of the example screens shown in the gallery (docs/public/examples/*.jpg).
// Start the docs first: `bun run docs:dev`.
//
//   bun scripts/thumbs.ts [base url]
import { launch } from './browser'

const base = process.argv[2] ?? 'http://localhost:5173'
// the element holding the example itself, without the site header and the notes under it
const examples = { dashboard: '.dash', incident: '.incident', projects: '.projects', settings: '.settings' }

const page = await launch()
try {
  await page.size(1280, 900)
  for (const [name, selector] of Object.entries(examples)) {
    await page.goto(`${base}/examples/${name}`)
    await page.screenshot(new URL(`../docs/public/examples/${name}.jpg`, import.meta.url).pathname, selector, 720)
  }
} finally {
  page.close()
}
