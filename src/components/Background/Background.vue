<template>
  <div class="o-background" aria-hidden="true" />
</template>

<style>
/* Generated, no image files: four colour glows, a vignette that keeps the centre readable, and noise. */
.o-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at 50% 40%, rgb(0 0 0 / 0.1) 0%, rgb(0 0 0 / 0.6) 80%),
    radial-gradient(60vw 50vh at 12% 8%, var(--o-bg-1) 0%, transparent 70%),
    radial-gradient(55vw 55vh at 92% 18%, var(--o-bg-2) 0%, transparent 70%),
    radial-gradient(60vw 50vh at 70% 100%, var(--o-bg-3) 0%, transparent 70%),
    radial-gradient(45vw 45vh at 8% 95%, var(--o-bg-4) 0%, transparent 70%),
    var(--o-bg);
}

.o-background::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.22;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
