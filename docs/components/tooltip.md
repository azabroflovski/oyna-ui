<script setup>
import { CircleHelp } from '@lucide/vue'
</script>

# Tooltip

A short note about a control, shown on hover and on keyboard focus. For controls whose meaning is not written on them, such as icon buttons.

<Demo>
  <OTooltip text="Help">
    <OButton icon shape="pill" aria-label="Help"><CircleHelp /></OButton>
  </OTooltip>
  <OTooltip text="Shown below" side="bottom">
    <OButton>Bottom</OButton>
  </OTooltip>
  <OTooltip text="Shown on the right" side="right">
    <OButton>Right</OButton>
  </OTooltip>
</Demo>

```vue
<OTooltip text="Help">
  <OButton icon shape="pill" aria-label="Help"><CircleHelp /></OButton>
</OTooltip>

<OTooltip text="Shown below" side="bottom">
  <OButton>Bottom</OButton>
</OTooltip>
```

The slot takes exactly one element that can receive focus: a button, a link, a toggle. It becomes the trigger.

A tooltip is not a place for something the user must read: it is not shown on touch screens. Keep the `aria-label` on an icon button.

## Props

| Prop   | Type                                     | Default  | Description                 |
| ------ | ---------------------------------------- | -------- | --------------------------- |
| `text` | `string`                                 | required |                             |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`  | Flips when there is no room |

Built on [Reka UI](https://reka-ui.com) Tooltip.
