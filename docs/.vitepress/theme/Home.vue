<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { withBase } from 'vitepress'

import HomeDemo from './HomeDemo.vue'

const principles = [
  ['Glass, not boxes', 'A card is a translucent dark fill over the background. No neutral borders.'],
  ['A ring is a signal', 'An outline appears only when it means something: the main thing, or something at stake.'],
  ['One accent', 'A single bright accent on a dark stage. Everything else is white at different opacities.'],
  ['Two typefaces', 'A condensed display face for numbers and headings, a plain sans for text.'],
  ['Light, not motion', 'Feedback under 300 ms, nothing bounces. Reduced motion turns it all off.'],
  ['Keyboard first', 'A button can show and own its hotkey, read from the physical key.'],
] as const

// refresh on a release: the count from src/index.ts, the size from the `bun run build` output
const facts = [
  ['CSS framework', 'None'],
  ['Stylesheet, gzip', '5.2 kB'],
  ['Components', '32'],
  ['Runtime dependencies', '1'],
] as const

/** Everything a consumer writes to start; shown as it is. */
const setup = `# or pnpm, yarn, bun
npm install oyna

// main.ts
import 'oyna/style.css'

<!-- any component -->
<OButton variant="primary" hotkey="Enter">
  Save
</OButton>`

const claims = [
  {
    title: 'No Tailwind, no UnoCSS',
    text: 'One plain stylesheet. No build plugin, no class scanning, no config file to keep in step with ours.',
  },
  {
    title: 'Your colours',
    text: 'Every colour, radius and font is a CSS variable. Change them and the whole library follows.',
    link: { text: 'Open the theme editor', href: '/theme' },
  },
  {
    title: 'Accessibility, not reinvented',
    text: 'The one dependency is Reka UI. It handles focus, the keyboard and screen readers, where there is nothing to look at.',
  },
]
</script>

<template>
  <main>
    <section class="hero">
      <div>
        <h1>Glass,<br />not <em>boxes</em></h1>
        <p class="lead">
          A Vue 3 component library with a dark glass look: translucent surfaces over a rich background, no borders,
          light used as a signal, and a keyboard-first feel.
        </p>
        <div class="row">
          <OButton variant="primary" size="lg" hotkey="Enter" :href="withBase('/guide/installation')">
            Get started
          </OButton>
          <OButton size="lg" :href="withBase('/components/button')"> Components </OButton>
        </div>
      </div>

      <HomeDemo />
    </section>

    <h2 class="section">Nothing to set up</h2>
    <section class="facts">
      <OStat v-for="[label, value] in facts" :key="label" :label>
        {{ value }}
      </OStat>
    </section>
    <section class="setup">
      <OCard class="col">
        <span class="label">The whole setup</span>
        <pre class="setup__code" tabindex="0" aria-label="Setup code">{{ setup }}</pre>
        <OButton variant="link" class="setup__more" :href="withBase('/guide/installation')">
          Installation <ArrowRight />
        </OButton>
      </OCard>
      <div class="col">
        <OCard v-for="claim in claims" :key="claim.title" class="claim">
          <h3>{{ claim.title }}</h3>
          <p>{{ claim.text }}</p>
          <OButton v-if="claim.link" variant="link" :href="withBase(claim.link.href)">
            {{ claim.link.text }} <ArrowRight />
          </OButton>
        </OCard>
      </div>
    </section>

    <h2 class="section">Whole screens</h2>
    <p class="section-lead">Built only from the library's components. Each one works, and shows its source.</p>
    <ExamplesGallery />

    <h2 class="section">The look</h2>
    <section class="principles">
      <OCard v-for="[title, text] in principles" :key="title">
        <h3>{{ title }}</h3>
        <p>{{ text }}</p>
      </OCard>
    </section>
  </main>
</template>
