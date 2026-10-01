# Skeleton

A placeholder in the shape of content that is still loading, so the page does not jump when it arrives.

<Demo>
  <div style="display: flex; flex-direction: column; gap: 10px; width: 320px">
    <OSkeleton style="width: 40%; height: 12px" />
    <OSkeleton style="height: 34px" />
    <OSkeleton style="width: 70%" />
    <OSkeleton style="width: 55%" />
  </div>
  <OSkeleton style="width: 56px; height: 56px; border-radius: 50%" />
</Demo>

```vue
<OSkeleton style="width: 40%; height: 12px" />
<OSkeleton style="height: 34px" />
<OSkeleton style="width: 70%" />
<OSkeleton style="width: 56px; height: 56px; border-radius: 50%" />
```

It is a block one line of text high and as wide as its container. Give it the width and height of what it stands for, with a class or a style.

A skeleton is hidden from screen readers. Mark the region that is loading with `aria-busy="true"` so they know to wait:

```vue
<OCard :aria-busy="loading">
  <template v-if="loading">
    <OSkeleton style="width: 40%; height: 12px" />
    <OSkeleton style="height: 34px" />
  </template>
  <OStat v-else label="Requests">{{ requests }}</OStat>
</OCard>
```

When the user asks for reduced motion, the pulse stops.
