// Renders scripts/banner.html to .github/banner.jpg at twice the size, for sharp text on any screen.
// Run `bun run build` first: the banner is styled by dist/style.css.
import { launch } from './browser'

const page = await launch()
try {
  await page.size(1280, 320, false, 2)
  await page.goto(new URL('./banner.html', import.meta.url).href)
  await page.screenshot(new URL('../.github/banner.jpg', import.meta.url).pathname)
} finally {
  page.close()
}
