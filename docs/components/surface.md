# Surface

Glass: a translucent dark fill over the background. No borders. `OCard` is a surface with padding and the darker fill.

<Demo>
  <OSurface style="padding: 20px">Surface</OSurface>
  <OSurface strong style="padding: 20px">Strong surface</OSurface>
  <OCard>Card</OCard>
</Demo>

```vue
<OSurface>
Surface
</OSurface>

<OSurface strong>
Strong surface
</OSurface>

<OCard>
Card
</OCard>
```

`OSurface` has no padding of its own: it is the fill and the radius, for layouts you size yourself.

## Signal

A ring appears only when it means something. `accent` marks the main thing on the screen, or what belongs to the user. `danger` marks something at stake. Never use a ring as decoration: if everything has one, none of them says anything.

<Demo>
  <OCard signal="accent">Your plan</OCard>
  <OCard signal="danger">Streak at risk</OCard>
</Demo>

```vue
<OCard signal="accent">
Your plan
</OCard>

<OCard signal="danger">
Streak at risk
</OCard>
```

## Props

### OSurface

| Prop     | Type                   | Default | Description                                                  |
| -------- | ---------------------- | ------- | ------------------------------------------------------------ |
| `as`     | `string`               | `'div'` | Element to render                                            |
| `strong` | `boolean`              | `false` | A darker fill, for text-heavy content over a busy background |
| `signal` | `'accent' \| 'danger'` | —       | A ring that means something                                  |

### OCard

| Prop     | Type                   | Default | Description                 |
| -------- | ---------------------- | ------- | --------------------------- |
| `as`     | `string`               | `'div'` | Element to render           |
| `signal` | `'accent' \| 'danger'` | —       | A ring that means something |
