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
| `--o-layer`                                    | `rgb(20 20 26 / 0.97)`                                              | What floats over the page: dialog, popover, menu, tooltip, toast |
| `--o-fill-1` … `--o-fill-4`                    | white at 4, 8, 12, 22 %                                             | Stripes, controls, hover, bars                                   |
| `--o-text`, `--o-text-2`, `--o-text-3`         | white at 100, 75, 50 %                                              | Text                                                             |
| `--o-radius-sm`, `--o-radius`, `--o-radius-lg` | `8px`, `14px`, `24px`                                               | Small controls, cards, dialogs                                   |
| `--o-font-sans`                                | Noto Sans, then the system sans                                     | Text                                                             |
| `--o-font-display`                             | Barlow Condensed, Fira Sans Condensed, then a condensed system face | Numbers and headings                                             |
| `--o-duration`                                 | `160ms`                                                             | Every transition                                                 |
| `--o-bg`, `--o-bg-1` … `--o-bg-4`              |                                                                     | [Background](/components/background)                             |

## Reduced motion

When the user asks for reduced motion, `--o-duration` becomes `0ms` and every transition in the library stops. Use the variable in your own transitions to get the same behaviour.
