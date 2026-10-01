<script setup lang="ts">
import type { ThemeConfig } from '../config'
import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'
import Home from './Home.vue'

const { frontmatter, theme, page } = useData<ThemeConfig>()
const route = useRoute()

const path = computed(() => route.path.replace(/(index)?\.html$/, ''))
const isCurrent = (link: string) => path.value === withBase(link)
</script>

<template>
  <OBackground />
  <OToaster />
  <div class="wrap">
    <header class="top">
      <a class="brand" :href="withBase('/')" aria-label="Oyna UI">OYNA</a>
      <nav class="top-nav">
        <OButton
          v-for="item in theme.nav"
          :key="item.link"
          shape="pill"
          :href="withBase(item.link)"
          :aria-current="path.startsWith(withBase(item.match)) ? 'page' : undefined"
        >
          {{ item.text }}
        </OButton>
      </nav>
    </header>

    <Home v-if="frontmatter.layout === 'home'" />

    <main v-else-if="frontmatter.layout === 'example'" class="example content">
      <nav class="example-nav" aria-label="Examples">
        <OButton
          v-for="item in theme.sidebar.find(group => group.text === 'Examples')?.items"
          :key="item.link"
          size="sm"
          shape="pill"
          :href="withBase(item.link)"
          :aria-current="isCurrent(item.link) ? 'page' : undefined"
        >
          {{ item.text }}
        </OButton>
      </nav>
      <Content />
    </main>

    <div v-else-if="page.isNotFound" class="not-found">
      <h1>404</h1>
      <OButton :href="withBase('/')">
        Home
      </OButton>
    </div>

    <div v-else class="docs">
      <aside class="side">
        <nav v-for="group in theme.sidebar" :key="group.text" :aria-label="group.text">
          <div class="label">
            {{ group.text }}
          </div>
          <a
            v-for="item in group.items"
            :key="item.link"
            :href="withBase(item.link)"
            :aria-current="isCurrent(item.link) ? 'page' : undefined"
          >{{ item.text }}</a>
        </nav>
      </aside>
      <main class="content">
        <Content />
      </main>
    </div>
  </div>
</template>
