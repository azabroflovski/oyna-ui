// Renders the two pictures made from hand-written HTML: scripts/banner.html to .github/banner.jpg at
// twice the size, for sharp text on any screen, and scripts/og.html to docs/public/og.png, the link
// preview. Run `bun run build` first: both are styled by dist/style.css.
import { launch } from './browser'

const page = await launch()
try {
  await page.size(1280, 320, false, 2)
  await page.goto(new URL('./banner.html', import.meta.url).href)
  await page.screenshot(new URL('../.github/banner.jpg', import.meta.url).pathname)

  await page.size(1200, 630)
  await page.goto(new URL('./og.html', import.meta.url).href)
  await page.screenshot(new URL('../docs/public/og.png', import.meta.url).pathname)
} finally {
  page.close()
}
