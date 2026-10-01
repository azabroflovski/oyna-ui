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

Put an icon before the text; the badge sets the gap.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tone` | `'accent' \| 'danger'` | — | |
