import type { Theme } from 'vitepress'
import oyna from 'oyna'
import Demo from './Demo.vue'
import ExampleSource from './ExampleSource.vue'
import Layout from './Layout.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(oyna)
    app.component('Demo', Demo)
    app.component('ExampleSource', ExampleSource)
  },
} satisfies Theme
