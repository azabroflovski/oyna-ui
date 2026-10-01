<script setup>
const week = [
  { label: 'Mon', value: 1.42, display: '1.42' },
  { label: 'Tue', value: 1.18, display: '1.18' },
  { label: 'Wed', value: 2.31, display: '2.31', tone: 'danger', dot: true },
  { label: 'Thu', value: 1.27, display: '1.27' },
  { label: 'Fri', value: 0.96, display: '0.96', tone: 'accent' },
  { label: 'Sat', value: 1.51, display: '1.51', dot: true },
  { label: 'Sun', value: 1.33, display: '1.33' },
]
const month = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 40 + Math.round(30 * Math.sin(i / 3) + 20 * Math.sin(i * 1.7)),
  tone: i === 22 ? 'danger' : undefined,
}))
</script>

# BarChart

A few values side by side. All bars are quiet; colour picks out the one to look at.

<Demo style="justify-content: stretch">
  <OBarChart :items="week" style="width: 100%" />
</Demo>

```vue
<script setup lang="ts">
const week = [
  { label: 'Mon', value: 1.42, display: '1.42' },
  { label: 'Tue', value: 1.18, display: '1.18' },
  { label: 'Wed', value: 2.31, display: '2.31', tone: 'danger', dot: true },
  { label: 'Thu', value: 1.27, display: '1.27' },
  { label: 'Fri', value: 0.96, display: '0.96', tone: 'accent' },
  { label: 'Sat', value: 1.51, display: '1.51', dot: true },
  { label: 'Sun', value: 1.33, display: '1.33' },
]
</script>

<template>
  <OBarChart :items="week" />
</template>
```

- `tone` colours one bar and its value: `danger` for the worst, `accent` for the best. Use it on one or two bars, or it stops meaning anything.
- `dot` marks a bar where something happened — an error, a miss. Say what the dot means next to the chart.
- `display` is the value as text. Bars are scaled to the highest value.

## Many bars

With more than 12 bars the chart gets dense: thin bars, no text. The values stay in the hover titles.

<Demo style="justify-content: stretch">
  <OBarChart :items="month" style="width: 100%; --o-bar-chart-height: 110px" />
</Demo>

## Height and labels

The chart is `180px` high; set `--o-bar-chart-height` to change it. The `label` slot replaces the text under a bar, for an icon or an avatar:

```vue
<OBarChart :items="week" style="--o-bar-chart-height: 240px">
  <template #label="{ item }">
    <img :src="item.icon" :alt="item.label">
  </template>
</OBarChart>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `{ label: string, value: number, display?: string, tone?: 'accent' \| 'danger', dot?: boolean }[]` | required | |
