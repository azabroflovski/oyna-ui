<script setup lang="ts">
import { ArrowRight, Check, Copy, X } from '@lucide/vue'
import { toast } from 'oyna-ui'
import { useData, withBase } from 'vitepress'

import { data as facts } from './home.data'
import HomeDemo from './HomeDemo.vue'

const { theme } = useData()

const install = 'npm install oyna-ui'

async function copyInstall() {
  await navigator.clipboard.writeText(install)
  toast('Copied')
}

const meta = [
  `v${facts.version}`,
  'MIT',
  'Vue 3.5+',
  'TypeScript',
  `${facts.components} components`,
  `${facts.css} kB CSS gzipped`,
  '1 dependency',
]

const claims = [
  {
    title: 'Plain CSS',
    text: 'One stylesheet. No Tailwind or UnoCSS needed; if you use one, the tokens are there as its utilities.',
    link: { text: 'Theming', href: '/guide/theming' },
  },
  {
    title: 'CSS variables',
    text: 'Colours, radii and fonts are --o-* variables. Set them on :root, or on one part of the page.',
    link: { text: 'Theme editor', href: '/theme' },
  },
  {
    title: 'Reka UI underneath',
    text: 'Dialogs, menus, selects and tooltips use Reka UI for focus, keyboard navigation and ARIA. It is the only runtime dependency.',
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

    <h2 class="section">Setup</h2>
    <section class="setup">
      <OCard class="col">
        <span class="label">All of it</span>
        <!-- highlighted at build time (home.data.ts); .content gives it the docs' code block look -->
        <div v-for="block in facts.setup" :key="block.file" class="content setup__block">
          <span class="setup__file">{{ block.file }}</span>
          <div v-html="block.html" />
        </div>
        <OButton variant="link" class="setup__more" :href="withBase('/guide/installation')">
          Installation guide <ArrowRight />
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

    <h2 class="section">Examples</h2>
    <p class="section-lead">
      Four screens built only from the library's components. Each one works and shows its source.
    </p>
    <ExamplesGallery />

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
      <span>Oyna UI {{ facts.version }} · MIT</span>
      <nav aria-label="Project links">
        <a :href="theme.repo">GitHub</a>
        <a href="https://www.npmjs.com/package/oyna-ui">npm</a>
        <a :href="`${theme.repo}/blob/${theme.branch}/CHANGELOG.md`">Changelog</a>
        <a :href="withBase('/llms.txt')">llms.txt</a>
      </nav>
    </footer>
  </main>
</template>
