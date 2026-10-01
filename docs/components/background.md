# Background

The stage behind the glass: colour glows, a vignette that keeps the centre readable, and noise. Generated in CSS, with no image files.

You are looking at it: this site uses the default background.

```vue
<template>
  <OBackground />
  <main>…</main>
</template>
```

It is fixed to the viewport and sits behind the page (`z-index: -1`), so place it anywhere in your app.

## Colours

Four glows over a base colour, each a CSS variable:

```css
:root {
  --o-bg: #0b0b0f;
  --o-bg-1: #3a4fd0; /* top left */
  --o-bg-2: #8a2bb8; /* top right */
  --o-bg-3: #0e7f78; /* bottom right */
  --o-bg-4: #b0561a; /* bottom left */
}
```

## Your own background

`OBackground` is optional. Any rich background works — a photo, a video, a gradient of your own — as long as it is dark enough for white text. Over a very busy one, use the `strong` [surface](/components/surface).
