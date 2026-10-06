// The numbers quoted on the home page, worked out at build time so they cannot go stale: the version,
// the number of components the plugin registers, and the size of the stylesheet a user imports.
//
// The stylesheet is built here with the library's own Vite settings rather than read from `dist`:
// the docs are built on their own (Cloudflare runs `docs:build` only), so `dist` may not exist.
//
// The setup code is highlighted here too, by the same renderer as the Markdown pages, so the page
// ships it as HTML.

import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

import vue from '@vitejs/plugin-vue'
import { build } from 'vite'
import { createMarkdownRenderer } from 'vitepress'

import pkg from '../../../package.json'

export interface HomeData {
  version: string
  components: number
  /** The gzipped size of `oyna-ui/style.css`, in kB, one decimal. */
  css: string
  /** The whole setup, one highlighted block per file. */
  /** The install command has no file, so no name over it. */
  setup: { file?: string; html: string }[]
}

const setup = [
  {
    lang: 'sh',
    code: `npm install oyna-ui
# or: pnpm add, yarn add, bun add`,
  },
  {
    file: 'main.ts',
    lang: 'ts',
    code: `import oyna from 'oyna-ui'
import 'oyna-ui/style.css'
import 'oyna-ui/fonts.css' // from Google Fonts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(oyna).mount('#app')`,
  },
  {
    file: 'App.vue',
    lang: 'vue',
    code: `<template>
  <OBackground />
  <OButton variant="primary" hotkey="Enter">Save</OButton>
</template>`,
  },
]

declare const data: HomeData
export { data }

const root = new URL('../../../', import.meta.url).pathname

export default {
  watchFiles: ['../../../src/**/*.vue', '../../../src/**/*.css', '../../../src/index.ts'],
  async load(): Promise<HomeData> {
    // the entries of `const components = { … }`, which `app.use(oyna)` registers
    const index = readFileSync(`${root}src/index.ts`, 'utf8')
    const block = index.match(/const components = \{([^}]*)\}/)?.[1]
    if (!block) throw new Error('No `const components` in src/index.ts')
    const components = block.split(',').filter((name) => name.trim()).length

    const output = await build({
      root,
      configFile: false,
      logLevel: 'silent',
      plugins: [vue()],
      build: {
        write: false,
        lib: { entry: 'src/index.ts', formats: ['es'], cssFileName: 'style' },
        rolldownOptions: { external: ['vue', /^reka-ui/] },
      },
    })
    const chunks = (Array.isArray(output) ? output : [output]).flatMap((result) =>
      'output' in result ? result.output : [],
    )
    const style = chunks.find((chunk) => chunk.fileName === 'style.css')
    if (!style || style.type !== 'asset') throw new Error('The library build made no style.css')

    const md = await createMarkdownRenderer(`${root}docs`, { theme: 'vitesse-dark' })

    return {
      setup: setup.map(({ file, lang, code }) => ({
        file,
        html: md.render(`\`\`\`${lang}\n${code}\n\`\`\``),
      })),
      version: pkg.version,
      components,
      css: (gzipSync(style.source).length / 1024).toFixed(1),
    }
  },
}
