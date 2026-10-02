// The tokens of Oyna UI as UnoCSS utilities, so your own blocks match the components:
//
//   import { presetOyna } from 'oyna-ui/unocss'
//   export default defineConfig({ presets: [presetWind3(), presetOyna()] })
//
// Then `bg-o-surface`, `text-o-text-2`, `ring-o-accent`, `rounded-o`, `font-o-display`.
// Every name starts with `o`, so nothing of your own theme is replaced. The values are the library's
// CSS variables: change `--o-accent` and the utilities follow, with no rebuild.
//
// The library itself does not use UnoCSS and does not need this file; it imports nothing from it.

const colors = {
  o: {
    accent: 'var(--o-accent)',
    danger: 'var(--o-danger)',
    'on-accent': 'var(--o-on-accent)',
    surface: 'var(--o-surface)',
    'surface-strong': 'var(--o-surface-strong)',
    layer: 'var(--o-layer)',
    // nested, not `'fill-2'`: UnoCSS reads a number at the end of a colour's name as its shade
    fill: { 1: 'var(--o-fill-1)', 2: 'var(--o-fill-2)', 3: 'var(--o-fill-3)', 4: 'var(--o-fill-4)' },
    text: { DEFAULT: 'var(--o-text)', 2: 'var(--o-text-2)', 3: 'var(--o-text-3)' },
    bg: 'var(--o-bg)',
  },
}
const radius = { 'o-sm': 'var(--o-radius-sm)', o: 'var(--o-radius)', 'o-lg': 'var(--o-radius-lg)' }
const font = { 'o-sans': 'var(--o-font-sans)', 'o-display': 'var(--o-font-display)' }

/** Works with `presetWind3` / `presetMini` (`borderRadius`, `fontFamily`) and with `presetWind4` (`radius`, `font`). */
export function presetOyna() {
  return {
    name: 'oyna-ui',
    theme: { colors, borderRadius: radius, fontFamily: font, radius, font },
  }
}

export default presetOyna
