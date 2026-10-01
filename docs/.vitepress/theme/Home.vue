<script setup lang="ts">
import { withBase } from 'vitepress'
import { ref } from 'vue'

const principles = [
  ['Glass, not boxes', 'A card is a translucent dark fill over the background. No neutral borders.'],
  ['A ring is a signal', 'An outline appears only when it means something: the main thing, or something at stake.'],
  ['One accent', 'A single bright accent on a dark stage. Everything else is white at different opacities.'],
  ['Two typefaces', 'A condensed display face for numbers and headings, a plain sans for text.'],
  ['Light, not motion', 'Feedback under 300 ms, nothing bounces. Reduced motion turns it all off.'],
  ['Keyboard first', 'A button can show and own its hotkey, read from the physical key.'],
] as const

const periods = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'all', label: 'All time' },
]

// refresh on a release: the count from src/index.ts, the size from the `bun run build` output
const facts = [
  ['CSS framework', 'None'],
  ['Stylesheet, gzip', '4.5 kB'],
  ['Components', '27'],
  ['Runtime dependencies', '1'],
] as const

const sound = ref(true)
const hints = ref(false)
const open = ref(false)
const search = ref('')
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

      <div class="showcase">
        <OStat label="Requests"> 18 204 </OStat>
        <OStat label="Median"> 142 ms </OStat>

        <OCard signal="accent" class="col wide">
          <div class="row between">
            <span class="label">Your plan</span>
            <OBadge>Pro</OBadge>
          </div>
          <div class="row between">
            <span class="number">72%</span>
            <OButton variant="soft"> Upgrade </OButton>
          </div>
          <OProgress :value="72" aria-label="Plan usage" />
          <span class="hint">An accent ring marks the main thing on the screen.</span>
        </OCard>

        <OCard signal="danger" class="col">
          <span class="label">Streak at risk</span>
          <span class="number small">6 days</span>
          <OProgress :value="18" tone="danger" aria-label="Time left" />
        </OCard>
        <OCard class="col">
          <span class="label">Keys</span>
          <div class="row">
            <OKbd variant="cap"> Q </OKbd>
            <OKbd variant="cap"> W </OKbd>
            <OKbd variant="cap"> E </OKbd>
          </div>
        </OCard>

        <OCard class="col wide">
          <div class="row between">
            <OTabs :items="periods" />
            <div class="row">
              <OToggle v-model="sound" hotkey="KeyM"> Sound </OToggle>
              <OToggle v-model="hints" hotkey="KeyH"> Hints </OToggle>
            </div>
          </div>
          <div class="row nowrap">
            <OInput v-model="search" placeholder="Search…" aria-label="Search" />
            <OButton hotkey="KeyD" @click="open = true"> Dialog </OButton>
          </div>
          <span class="hint">
            Try <OKbd>M</OKbd>, <OKbd>H</OKbd>, <OKbd>D</OKbd>, <OKbd>Esc</OKbd> and <OKbd>Enter</OKbd> — on any
            keyboard layout. Keys are ignored while you type in the field.
          </span>
        </OCard>
      </div>

      <ODialog v-model:open="open" title="Settings" description="Hotkeys behind a dialog are off while it is open.">
        <OField label="Name" hint="2–16 characters">
          <OInput />
        </OField>
        <div class="row between">
          <OToggle v-model="sound" hotkey="KeyM"> Sound </OToggle>
          <OButton variant="primary" hotkey="Enter" @click="open = false"> Done </OButton>
        </div>
      </ODialog>
    </section>

    <section class="facts">
      <OStat v-for="[label, value] in facts" :key="label" :label>
        {{ value }}
      </OStat>
    </section>
    <p class="facts-note">
      No Tailwind, no UnoCSS, nothing to configure: import one plain stylesheet and use the components. Theme it with
      CSS variables. The one dependency is Reka UI, so that accessibility is not reinvented here.
    </p>

    <h2 class="section">The look</h2>
    <section class="principles">
      <OCard v-for="[title, text] in principles" :key="title">
        <h3>{{ title }}</h3>
        <p>{{ text }}</p>
      </OCard>
    </section>
  </main>
</template>
