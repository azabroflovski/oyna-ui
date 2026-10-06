<script setup lang="ts">
import { ArrowRight, Check, Copy, X } from '@lucide/vue'
import { toast } from 'oyna-ui'
import { useData, withBase } from 'vitepress'

import { data as facts } from './home.data'
import HomeDemo from './HomeDemo.vue'
import Logo from './Logo.vue'

const { theme } = useData()

const install = 'npm install oyna-ui'

async function copyInstall() {
  await navigator.clipboard.writeText(install)
  toast('Copied')
}

const meta = [`v${facts.version}`, 'MIT', `${facts.components} components`, `${facts.css} kB CSS gzipped`]

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

const fits = [
  'Dashboards, developer tools, internal tools',
  'Side projects and landing pages that want a look of their own',
  'Screens used from the keyboard: buttons show their hotkeys and react to them',
]
const misfits = [
  'You need a light theme. There is none, and none is planned.',
  'You need a data grid, a date picker or a tree view. PrimeVue, Naive UI and Element Plus have them.',
  'You are not on Vue 3.',
]
</script>

<template>
  <main>
    <section class="hero">
      <div>
        <!-- an instruction the panel next to it obeys: D runs its deploy; on a phone, its button -->
        <h1>
          <span class="hero__keys">Press <em>D</em><br />to ship</span>
          <span class="hero__touch">Tap <em>Deploy</em><br />to ship</span>
        </h1>
        <p class="lead">A Vue&nbsp;3 component library. Plain CSS, hotkeys built in.</p>
        <div class="hero__install">
          <code>{{ install }}</code>
          <OButton variant="ghost" size="sm" icon aria-label="Copy the install command" @click="copyInstall">
            <Copy />
          </OButton>
        </div>
        <div class="row hero__actions">
          <OButton variant="primary" size="lg" hotkey="Enter" :href="withBase('/guide/installation')">
            Installation
          </OButton>
          <OButton size="lg" :href="withBase('/components/button')">Components</OButton>
        </div>
        <p class="hero__meta">
          <span v-for="(item, i) in meta" :key="item"
            >{{ i ? ' · ' : '' }}<span>{{ item }}</span></span
          >
        </p>
      </div>

      <HomeDemo />
    </section>

    <h2 class="section">Try it now</h2>
    <section class="setup">
      <ol class="steps">
        <li v-for="(step, i) in facts.setup" :key="step.file" class="step">
          <span class="step__number" aria-hidden="true">{{ i + 1 }}</span>
          <div class="step__body">
            <span class="step__file">{{ step.file }}</span>
            <!-- highlighted at build time (home.data.ts); .content gives it the docs' code block look -->
            <div class="content" v-html="step.html" />
          </div>
        </li>
        <li class="step step--more">
          <OButton variant="link" :href="withBase('/guide/installation')">
            Installation guide: fonts, imports by name <ArrowRight />
          </OButton>
        </li>
      </ol>
      <div class="claims">
        <div v-for="claim in claims" :key="claim.title" class="claim">
          <h3>{{ claim.title }}</h3>
          <p>{{ claim.text }}</p>
          <OButton v-if="claim.link" variant="link" :href="withBase(claim.link.href)">
            {{ claim.link.text }} <ArrowRight />
          </OButton>
        </div>
      </div>
    </section>

    <h2 class="section">Is it for you</h2>
    <section class="fit">
      <OCard>
        <h3>Use it for</h3>
        <ul>
          <li v-for="item in fits" :key="item"><Check aria-hidden="true" /> {{ item }}</li>
        </ul>
      </OCard>
      <OCard>
        <h3>Look elsewhere if</h3>
        <ul>
          <li v-for="item in misfits" :key="item"><X aria-hidden="true" /> {{ item }}</li>
        </ul>
      </OCard>
    </section>

    <h2 class="section">Examples</h2>
    <p class="section-lead">
      Four screens built only from the library's components. Each one works and shows its source.
    </p>
    <ExamplesGallery />

    <h2 class="section">Why it exists</h2>
    <section class="story">
      <p>
        I was building <a href="https://invoke.wtf">invoke.wtf</a>, a trainer for Invoker from Dota 2, and wanted dark
        glass, no grey borders and everything on the keyboard. The Vue kits I tried all looked like admin panels, so I
        drew the interface by hand. This library is that look taken out of the project. I made it for myself; if it
        suits your project, use it too.
      </p>
      <p class="story__sign">
        — <a href="https://github.com/azabroflovski">azabroflovski</a> ·
        <a :href="withBase('/guide/why')">more on why</a>
      </p>
    </section>

    <footer class="home-footer">
      <Logo />
      <nav aria-label="Project links">
        <a :href="theme.repo">GitHub</a>
        <a href="https://www.npmjs.com/package/oyna-ui">npm</a>
        <a :href="`${theme.repo}/blob/${theme.branch}/CHANGELOG.md`">Changelog</a>
        <a :href="withBase('/llms.txt')">llms.txt</a>
      </nav>
    </footer>
  </main>
</template>
