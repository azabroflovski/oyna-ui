# Sparkline

The shape of a series in a small space: no axes, no numbers. The last value gets a dot in the accent colour — it is the one that matters.

<Demo>
  <OSparkline :values="[12, 14, 13, 17, 16, 21, 19, 24, 23, 28]" label="Visits over ten days, rising to 28" />
</Demo>

```vue
<OSparkline
  :values="[12, 14, 13, 17, 16, 21, 19, 24, 23, 28]"
  label="Visits over ten days, rising to 28"
/>
```

The `label` is what a screen reader says instead of the picture: put the conclusion in it, not "chart".

## Lower is better

For times, ranks and error counts, turn the chart over so that an improvement still goes up.

<Demo>
  <OSparkline :values="[9.4, 9.1, 9.6, 8.7, 8.9, 8.2, 8.4, 7.8]" lower-is-better :width="160" :height="40" label="Lap times, down to 7.8 s" />
</Demo>

```vue
<OSparkline :values="laps" lower-is-better :width="160" :height="40" label="Lap times, down to 7.8 s" />
```

## Tone

The dot is accent by default. Make it `danger` when the series ends somewhere bad.

<Demo>
  <OSparkline :values="[210, 230, 260, 310, 420, 560, 710]" lower-is-better tone="danger" :width="160" :height="40" label="Latency, climbing to 710 ms" />
</Demo>

```vue
<OSparkline :values="latency" lower-is-better tone="danger" label="Latency, climbing to 710 ms" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `values` | `number[]` | required | Oldest first |
| `label` | `string` | required | What the chart shows, for screen readers |
| `width` | `number` | `240` | Shrinks to its container when narrower |
| `height` | `number` | `56` | |
| `lowerIsBetter` | `boolean` | `false` | Smaller values sit higher |
| `tone` | `'accent' \| 'danger'` | `'accent'` | Colour of the last point |
