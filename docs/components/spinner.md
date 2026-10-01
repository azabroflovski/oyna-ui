# Spinner

Something is under way and there is nothing to show yet. Three dots light up in turn: the library signals with light, so nothing rotates.

<Demo>
  <OSpinner />
  <span style="font-size: 24px"><OSpinner label="Loading the report" /></span>
  <span style="color: var(--o-accent)"><OSpinner /></span>
  <OButton loading>Saving</OButton>
  <OButton variant="primary" loading>Deploying</OButton>
</Demo>

```vue
<OSpinner />
<OSpinner label="Loading the report" />
<OButton loading>Saving</OButton>
```

It takes the size and the colour of the text around it. `label` is what a screen reader says; the default is "Loading".

A [button](/components/button) has a `loading` prop that shows a spinner inside it and stops clicks and the hotkey.

When the user asks for reduced motion, the dots stop and stay half lit.

## Spinner or skeleton

- **Spinner** — an action is running: saving, sending, deploying.
- **[Skeleton](/components/skeleton)** — content is on its way and you know its shape.

## Props

| Prop    | Type     | Default     | Description                         |
| ------- | -------- | ----------- | ----------------------------------- |
| `label` | `string` | `'Loading'` | What is loading, for screen readers |
