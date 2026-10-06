<script setup lang="ts">
import { ArrowRight, Copy } from '@lucide/vue'
import { toast } from 'oyna-ui'
import { useData, withBase } from 'vitepress'

import { data as facts } from './home.data'
import HomeDemo from './HomeDemo.vue'
import demoSource from './HomeDemo.vue?raw'

const { theme } = useData()

const install = 'npm install oyna-ui'

async function copyInstall() {
  await navigator.clipboard.writeText(install)
  toast('Copied')
}

// the panel's markup, shown next to it; its script is only the fake deploy
const demoTemplate = demoSource
  .slice(demoSource.indexOf('<template>'))
  .replace(/^<template>\n|<\/template>\s*$/g, '')
  .replace(/^\s*<!--.*-->\n/gm, '')
  .replace(/^ {2}/gm, '')
  .trimEnd()
const demoFile = `${theme.value.repo}/blob/${theme.value.branch}/docs/.vitepress/theme/HomeDemo.vue`

// every component page, in the sidebar's groups
const groups = (theme.value.sidebar as { text: string; items: { text: string; link: string }[] }[]).filter((group) =>
  group.items.every((item) => item.link.startsWith('/components/')),
)

/** Everything a consumer writes to start; shown as it is. */
const setup = `# or: pnpm add, yarn add, bun add
npm install oyna-ui

// main.ts
import oyna from 'oyna-ui'
import 'oyna-ui/style.css'
import 'oyna-ui/fonts.css' // from Google Fonts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(oyna).mount('#app')

<!-- App.vue -->
<OBackground />
<OButton variant="primary" hotkey="Enter">
  Save
</OButton>`

const spec = [
  ['Package', `oyna-ui ${facts.version}, MIT`],
  ['Needs', 'Vue 3.5+. ESM, TypeScript types included'],
  ['CSS', `One stylesheet, ${facts.css} kB gzipped. No Tailwind or UnoCSS needed`],
  ['Depends on', 'Reka UI: focus, keyboard and ARIA in dialogs, menus, selects'],
  ['Theme', 'Dark only. Colours, radii and fonts are --o-* variables'],
  ['Keyboard', 'Hotkeys by physical key, off while typing. Esc closes layers in order'],
  ['Not included', 'Light theme, data grid, date picker, tree view'],
] as const
</script>

<template>
  <main>
    <section class="intro">
      <h1>
        <span class="intro__keys">Press <em>D</em></span>
        <span class="intro__touch">Tap <em>Deploy</em></span>
      </h1>
      <div class="intro__side">
        <p class="lead">Dark glass components for Vue&nbsp;3. Plain CSS, hotkeys built in.</p>
        <div class="row">
          <div class="intro__install">
            <code>{{ install }}</code>
            <OButton variant="ghost" size="sm" icon aria-label="Copy the install command" @click="copyInstall">
              <Copy />
            </OButton>
          </div>
          <OButton variant="primary" hotkey="Enter" :href="withBase('/guide/installation')">Install</OButton>
        </div>
      </div>
    </section>

    <section class="stage">
      <HomeDemo />
      <OCard class="stage__code" label="The panel's markup">
        <template #actions>
          <OButton variant="link" :href="demoFile">Whole file <ArrowRight /></OButton>
        </template>
        <pre tabindex="0" aria-label="The panel's markup">{{ demoTemplate }}</pre>
      </OCard>
    </section>

    <h2 class="section">{{ facts.components }} components</h2>
    <nav class="inventory" aria-label="Components">
      <div v-for="group in groups" :key="group.text">
        <span class="label">{{ group.text }}</span>
        <a v-for="item in group.items" :key="item.link" :href="withBase(item.link)">{{ item.text }}</a>
      </div>
    </nav>

    <h2 class="section">Examples</h2>
    <p class="section-lead">Whole screens from the library's components only. Each one works and shows its source.</p>
    <ExamplesGallery />

    <section class="specs">
      <div>
        <h2 class="section">Spec</h2>
        <dl class="spec">
          <template v-for="[key, value] in spec" :key="key">
            <dt>{{ key }}</dt>
            <dd>{{ value }}</dd>
          </template>
        </dl>
      </div>
      <div>
        <h2 class="section">Setup</h2>
        <OCard class="col">
          <pre class="setup__code" tabindex="0" aria-label="Setup code">{{ setup }}</pre>
          <OButton variant="link" class="setup__more" :href="withBase('/guide/installation')">
            Installation guide <ArrowRight />
          </OButton>
        </OCard>
      </div>
    </section>

    <section class="story">
      <h2 class="section">Why it exists</h2>
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
