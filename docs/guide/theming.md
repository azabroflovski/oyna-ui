# Theming

Every colour, radius and font is a CSS variable. Override them on `:root`, or on any element to restyle one part of the page.

```css
:root {
  --o-accent: #4dd2ff;
  --o-radius: 10px;
}
```

<Demo style="--o-accent: #4dd2ff">
  <OButton variant="primary">Primary</OButton>
  <OButton variant="soft">Soft</OButton>
  <OCard signal="accent">A card with another accent</OCard>
</Demo>

```vue
<div style="--o-accent: #4dd2ff">
  <OButton variant="primary">Primary</OButton>
  <OButton variant="soft">Soft</OButton>
  <OCard signal="accent">A card with another accent</OCard>
</div>
```

## Tokens

| Variable                                       | Default                                                             | Meaning                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `--o-accent`                                   | `#a5ff4d`                                                           | The one bright colour: the main thing on the screen              |
| `--o-danger`                                   | `#ff8a8a`                                                           | Something at stake                                               |
| `--o-on-accent`                                | `#111`                                                              | Text on an accent fill                                           |
| `--o-surface`                                  | `rgb(0 0 0 / 0.3)`                                                  | Glass                                                            |
| `--o-surface-strong`                           | `rgb(0 0 0 / 0.4)`                                                  | Darker glass, for text-heavy content                             |
| `--o-layer`                                    | `rgb(20 20 26 / 0.8)`                                               | What floats over the page: dialog, popover, menu, tooltip, toast |
| `--o-layer-blur`                               | `16px`                                                              | How much the page is blurred under a layer; `0px` turns it off   |
| `--o-fill-1` … `--o-fill-4`                    | white at 4, 8, 12, 22 %                                             | Stripes, controls, hover, bars                                   |
| `--o-text`, `--o-text-2`, `--o-text-3`         | white at 100, 75, 50 %                                              | Text                                                             |
| `--o-radius-sm`, `--o-radius`, `--o-radius-lg` | `8px`, `14px`, `24px`                                               | Small controls, cards, dialogs                                   |
| `--o-font-sans`                                | Noto Sans, then the system sans                                     | Text                                                             |
| `--o-font-display`                             | Barlow Condensed, Fira Sans Condensed, then a condensed system face | Numbers and headings                                             |
| `--o-duration`                                 | `160ms`                                                             | Every transition                                                 |
| `--o-bg`, `--o-bg-1` … `--o-bg-4`              |                                                                     | [Background](/components/background)                             |

## With Tailwind or UnoCSS

The library needs neither, but if your project already uses one, the tokens are there as utilities, so the blocks you write yourself match the components. Every name starts with `o-`: nothing of your own theme is replaced. The values are the CSS variables above, so a theme you set with them reaches the utilities without a rebuild.

**Tailwind 4.** One more import after Tailwind's own:

```css
@import 'tailwindcss';
@import 'oyna-ui/tailwind.css';
```

**UnoCSS.** A preset, next to `presetWind3` or `presetWind4`:

```ts
import { defineConfig, presetWind4 } from 'unocss'
import { presetOyna } from 'oyna-ui/unocss'

export default defineConfig({ presets: [presetWind4(), presetOyna()] })
```

Then, in either:

```vue
<div class="rounded-o bg-o-surface p-6 text-o-text-2">
  <h2 class="font-o-display text-o-text">Deploys</h2>
  <p class="text-o-text-3">Nothing yet.</p>
</div>
```

| Utilities                                                  | From                                                  |
| ---------------------------------------------------------- | ----------------------------------------------------- |
| `*-o-accent`, `*-o-danger`, `*-o-on-accent`                | The accent, the danger colour, text on an accent fill |
| `*-o-surface`, `*-o-surface-strong`, `*-o-layer`, `*-o-bg` | Glass, darker glass, what floats, the page            |
| `*-o-fill-1` … `*-o-fill-4`                                | The white fills                                       |
| `*-o-text`, `*-o-text-2`, `*-o-text-3`                     | Text at 100, 75 and 50 %                              |
| `rounded-o-sm`, `rounded-o`, `rounded-o-lg`                | The three radii                                       |
| `font-o-sans`, `font-o-display`                            | The two typefaces                                     |

`*` is any utility that takes a colour: `bg-`, `text-`, `border-`, `ring-`, `fill-`. Tailwind also gets `duration-o` (the library's transition time, zero under reduced motion) and `backdrop-blur-o-layer`.

## Reduced motion

When the user asks for reduced motion, `--o-duration` becomes `0ms` and every transition in the library stops. Use the variable in your own transitions to get the same behaviour.
