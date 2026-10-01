import { fileURLToPath } from 'node:url'
import { defineConfigWithTheme } from 'vitepress'

export interface ThemeConfig {
  repo: string
  branch: string
  nav: { text: string, link: string, match: string }[]
  sidebar: { text: string, items: { text: string, link: string }[] }[]
}

export default defineConfigWithTheme<ThemeConfig>({
  title: 'Oyna UI',
  description: 'A Vue 3 component library with a dark glass look',
  lang: 'en',
  cleanUrls: true,
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Fira+Sans+Condensed:wght@700;800&family=Noto+Sans:wght@400;600;700&display=swap' }],
  ],
  markdown: {
    theme: 'vitesse-dark',
  },
  vite: {
    resolve: {
      // examples import the library the way a consumer does
      alias: { oyna: fileURLToPath(new URL('../../src/index.ts', import.meta.url)) },
    },
  },
  themeConfig: {
    repo: 'https://github.com/azabroflovski/oyna-ui',
    branch: 'master',
    nav: [
      { text: 'Guide', link: '/guide/installation', match: '/guide/' },
      { text: 'Components', link: '/components/surface', match: '/components/' },
      { text: 'Examples', link: '/examples/dashboard', match: '/examples/' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Why Oyna UI', link: '/guide/why' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'Hotkeys', link: '/guide/hotkeys' },
        ],
      },
      {
        text: 'Basics',
        items: [
          { text: 'Background', link: '/components/background' },
          { text: 'Surface', link: '/components/surface' },
          { text: 'Button', link: '/components/button' },
          { text: 'Kbd', link: '/components/kbd' },
          { text: 'Badge', link: '/components/badge' },
        ],
      },
      {
        text: 'Controls',
        items: [
          { text: 'Input', link: '/components/input' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Radio', link: '/components/radio' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Toggle', link: '/components/toggle' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'Select', link: '/components/select' },
          { text: 'KeyCapture', link: '/components/key-capture' },
        ],
      },
      {
        text: 'Layers',
        items: [
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Popover', link: '/components/popover' },
          { text: 'Menu', link: '/components/menu' },
          { text: 'Tooltip', link: '/components/tooltip' },
          { text: 'Toast', link: '/components/toast' },
        ],
      },
      {
        text: 'Data',
        items: [
          { text: 'Stat', link: '/components/stat' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Pips', link: '/components/pips' },
          { text: 'Sparkline', link: '/components/sparkline' },
          { text: 'BarChart', link: '/components/bar-chart' },
          { text: 'Table', link: '/components/table' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Dashboard', link: '/examples/dashboard' },
          { text: 'Settings', link: '/examples/settings' },
        ],
      },
    ],
  },
})
