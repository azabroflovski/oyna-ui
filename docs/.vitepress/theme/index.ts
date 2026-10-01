import oyna from 'oyna-ui'
import type { Theme } from 'vitepress'

import Demo from './Demo.vue'
import ExamplesGallery from './ExamplesGallery.vue'
import ExampleSource from './ExampleSource.vue'
import Layout from './Layout.vue'
import ThemeEditor from './ThemeEditor.vue'

import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(oyna)
    app.component('Demo', Demo)
    app.component('ExampleSource', ExampleSource)
    app.component('ExamplesGallery', ExamplesGallery)
    app.component('ThemeEditor', ThemeEditor)
  },
} satisfies Theme
