import { fileURLToPath } from 'node:url'

import { defineConfigWithTheme } from 'vitepress'

export interface ThemeConfig {
  repo: string
  branch: string
  nav: { text: string; link: string; match: string }[]
  sidebar: { text: string; items: { text: string; link: string }[] }[]
}

// where the docs are meant to live; link previews need absolute addresses
const site = 'https://oyna-ui.org'
const description = 'A Vue 3 component library with a dark glass look. Plain CSS, no Tailwind.'

export default defineConfigWithTheme<ThemeConfig>({
  title: 'Oyna UI',
  description,
  lang: 'en',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#0b0b0f' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Oyna UI' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${site}/og.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Fira+Sans+Condensed:wght@700;800&family=Noto+Sans:wght@400;600;700&display=swap',
      },
    ],
  ],
  markdown: {
    theme: 'vitesse-dark',
    // a wide table of props scrolls inside its own box instead of stretching the page on a phone
    config(md) {
      md.renderer.rules.table_open = () => '<div class="table-scroll"><table>\n'
      md.renderer.rules.table_close = () => '</table></div>\n'
    },
  },
  vite: {
    resolve: {
      // examples import the library the way a consumer does
      alias: { 'oyna-ui': fileURLToPath(new URL('../../src/index.ts', import.meta.url)) },
    },
  },
  themeConfig: {
    repo: 'https://github.com/azabroflovski/oyna-ui',
    branch: 'master',
    nav: [
      { text: 'Guide', link: '/guide/installation', match: '/guide/' },
      { text: 'Components', link: '/components/surface', match: '/components/' },
      { text: 'Examples', link: '/examples/', match: '/examples/' },
      { text: 'Theme', link: '/theme', match: '/theme' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Why Oyna UI', link: '/guide/why' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'Hotkeys', link: '/guide/hotkeys' },
          { text: 'Icons', link: '/guide/icons' },
        ],
      },
      {
        text: 'Basics',
        items: [
          { text: 'Background', link: '/components/background' },
          { text: 'Surface', link: '/components/surface' },
          { text: 'Card', link: '/components/card' },
          { text: 'Button', link: '/components/button' },
          { text: 'Kbd', link: '/components/kbd' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Tag', link: '/components/tag' },
        ],
      },
      {
        text: 'Controls',
        items: [
          { text: 'Input', link: '/components/input' },
          { text: 'Textarea', link: '/components/textarea' },
          { text: 'PinInput', link: '/components/pin-input' },
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
        text: 'States',
        items: [
          { text: 'Alert', link: '/components/alert' },
          { text: 'Spinner', link: '/components/spinner' },
          { text: 'Skeleton', link: '/components/skeleton' },
          { text: 'Empty', link: '/components/empty' },
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
          { text: 'Timeline', link: '/components/timeline' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'All examples', link: '/examples/' },
          { text: 'Dashboard', link: '/examples/dashboard' },
          { text: 'Incident', link: '/examples/incident' },
          { text: 'Projects', link: '/examples/projects' },
          { text: 'Settings', link: '/examples/settings' },
          { text: 'Theme editor', link: '/theme' },
        ],
      },
    ],
  },
})
