# Badge

A short label next to something: a plan, a status, a count.

<Demo>
  <OBadge>Pro</OBadge>
  <OBadge tone="accent">New</OBadge>
  <OBadge tone="danger">Expired</OBadge>
</Demo>

```vue
<OBadge>
Pro
</OBadge>

<OBadge tone="accent">
New
</OBadge>

<OBadge tone="danger">
Expired
</OBadge>
```

Put an [icon](/guide/icons) before the text: the badge sizes it and sets the gap.

## Props

| Prop   | Type                   | Default | Description |
| ------ | ---------------------- | ------- | ----------- |
| `tone` | `'accent' \| 'danger'` | —       |             |
