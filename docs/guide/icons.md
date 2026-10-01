<script setup>
import { ArrowRight, Check, CircleHelp, Rocket, Settings, Trash2 } from '@lucide/vue'
</script>

# Icons

Oyna UI ships no icons. Put any SVG in a component's slot and it takes the size of the text next to it. The examples on this site use [Lucide](https://lucide.dev): restrained line icons that match the look.

```bash
bun add @lucide/vue
```

<Demo>
  <OButton variant="primary"><Rocket /> Deploy</OButton>
  <OButton>Continue <ArrowRight /></OButton>
  <OButton icon shape="pill" aria-label="Settings"><Settings /></OButton>
  <OBadge tone="accent"><Check /> Passed</OBadge>
</Demo>

```vue
<script setup lang="ts">
import { ArrowRight, Check, Rocket, Settings } from '@lucide/vue'
</script>

<template>
  <OButton variant="primary"><Rocket /> Deploy</OButton>
  <OButton>Continue <ArrowRight /></OButton>
  <OButton icon shape="pill" aria-label="Settings"><Settings /></OButton>
  <OBadge tone="accent"><Check /> Passed</OBadge>
</template>
```

## Where icons are sized for you

| Component                                                                              | How                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [Button](/components/button), [Toggle](/components/toggle), [Badge](/components/badge) | An `<svg>` in the slot                             |
| [Menu](/components/menu)                                                               | `icon` of an item: the component itself, not a tag |
| [Empty](/components/empty)                                                             | The `icon` slot                                    |

Anywhere else an icon is just an element in your own layout.

## Rules of the look

- **Line icons, not filled ones, and no emoji.** They take the colour of the text, so they follow the tone of the component.
- **An icon alone needs a name.** Give an icon-only button an `aria-label`; a [tooltip](/components/tooltip) on top helps sighted users.
- **An icon next to a word is decoration.** Lucide marks its icons `aria-hidden` already, so screen readers read only the word.

<Demo>
  <OTooltip text="Help">
    <OButton icon shape="pill" aria-label="Help"><CircleHelp /></OButton>
  </OTooltip>
  <OButton variant="ghost"><Trash2 /> Remove</OButton>
</Demo>

```vue
<OTooltip text="Help">
  <OButton icon shape="pill" aria-label="Help"><CircleHelp /></OButton>
</OTooltip>
```

## Other icon sets

Anything that renders an `<svg>` works the same way: another icon package, or an SVG you paste in. Icon fonts and CSS-mask icons (such as UnoCSS `i-*` classes) are not sized by the components; set their size yourself.
