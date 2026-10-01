# Stat

A number with a caption. The value is set in the display face with tabular figures, so numbers in a row line up.

<Demo>
  <OStat label="Requests">18 204</OStat>
  <OStat label="Median">142 ms</OStat>
  <OStat label="Best" tone="accent">96 ms</OStat>
  <OStat label="Errors" tone="danger">12</OStat>
</Demo>

```vue
<OStat label="Requests">
18 204
</OStat>

<OStat label="Median">
142 ms
</OStat>

<OStat label="Best" tone="accent">
96 ms
</OStat>

<OStat label="Errors" tone="danger">
12
</OStat>
```

Colour is a signal here too: `accent` for the best or the user's own number, `danger` for the one that needs attention. Most stats have no tone.

A stat is as wide as its content; put several in a grid to make them equal.

```vue
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px">
  <OStat v-for="stat in stats" :key="stat.label" :label="stat.label">
    {{ stat.value }}
  </OStat>
</div>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | required | |
| `tone` | `'accent' \| 'danger'` | — | Colours the value |
