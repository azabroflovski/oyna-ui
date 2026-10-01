<script setup lang="ts">
import { Search } from '@lucide/vue'
import { useData, useRouter, withBase } from 'vitepress'
import { computed, nextTick, ref, shallowRef, useTemplateRef, watch } from 'vue'

import type { ThemeConfig } from '../config'
import type { Section } from './search.data'

/**
 * Finds a page by its name, or a section of a page by the words in it. With nothing typed it lists
 * every page: on a phone, where the sidebar is hidden, this is the navigation.
 */
const { theme } = useData<ThemeConfig>()
const router = useRouter()

const open = ref(false)
const query = ref('')
const active = ref(0)
const input = useTemplateRef<{ $el: HTMLInputElement }>('input')

interface Result {
  url: string
  title: string
  /** What stands at the right end: the sidebar group of a page, the page of a section. */
  where: string
  /** The words around the match, for a section found by its text. */
  snippet?: string
}

const pages = computed<Result[]>(() =>
  theme.value.sidebar.flatMap((group) =>
    group.items.map((item) => ({ url: item.link, title: item.text, where: group.text })),
  ),
)

// the text of the pages is a separate file, fetched the first time the search is opened
const sections = shallowRef<Section[]>([])
async function load() {
  if (!sections.value.length) sections.value = (await import('./search.data')).data
}

const words = computed(() => query.value.toLowerCase().split(/\s+/).filter(Boolean))

/** The text around the first place a word occurs, so the result shows why it was found. */
function around(text: string, word: string) {
  const at = text.toLowerCase().indexOf(word)
  if (at < 0) return undefined
  const from = Math.max(0, at - 40)
  return `${from > 0 ? '…' : ''}${text.slice(from, at + 80).trim()}${at + 80 < text.length ? '…' : ''}`
}

const found = computed<Result[]>(() => {
  if (!words.value.length) return pages.value
  const has = (text: string) => (word: string) => text.toLowerCase().includes(word)

  // pages by name first: someone typing "button" wants the Button page
  const byName = pages.value.filter((page) => words.value.every(has(`${page.title} ${page.where}`)))

  // then sections, the ones with the words in their heading before the ones with them in the text
  const byText = sections.value
    .filter((section) => words.value.every(has(`${section.page} ${section.heading} ${section.text}`)))
    .map((section) => ({
      section,
      score: words.value.filter(has(section.heading)).length * 2 + words.value.filter(has(section.page)).length,
    }))
    .toSorted((a, b) => b.score - a.score)
    .map(({ section }): Result => ({
      url: section.url,
      title: section.heading || section.page,
      where: section.heading ? section.page : '',
      snippet: around(section.text, words.value.find(has(section.text)) ?? ''),
    }))
    // a page already listed by name is not listed again for its opening part (and two results with
    // one address would confuse the list)
    .filter((result) => !byName.some((page) => page.url === result.url))

  return [...byName, ...byText].slice(0, 30)
})

watch(open, async (isOpen) => {
  if (!isOpen) return
  query.value = ''
  void load()
  // the dialog focuses itself first; the field takes over once it is in the page
  await nextTick()
  input.value?.$el.focus()
})
watch(query, () => (active.value = 0))

function move(step: number) {
  if (!found.value.length) return
  active.value = (active.value + step + found.value.length) % found.value.length
  // keep the chosen result in view while the arrow keys walk the list
  void nextTick(() => document.querySelector('.search__item[aria-current]')?.scrollIntoView({ block: 'nearest' }))
}

function go(url?: string) {
  if (!url) return
  open.value = false
  router.go(withBase(url))
}
</script>

<template>
  <OButton shape="pill" hotkey="Slash" @click="open = true"> <Search /> Search </OButton>

  <ODialog v-model:open="open" title="Search" class="search">
    <OInput
      ref="input"
      v-model="query"
      placeholder="A page, a prop, a word"
      aria-label="Search the docs"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.enter.prevent="go(found[active]?.url)"
    />
    <ul v-if="found.length" class="search__list">
      <li v-for="(result, index) in found" :key="result.url">
        <a
          :href="withBase(result.url)"
          class="search__item"
          :aria-current="index === active ? 'true' : undefined"
          @click.prevent="go(result.url)"
          @mousemove="active = index"
        >
          <span class="search__title">
            {{ result.title }}
            <span v-if="result.where">{{ result.where }}</span>
          </span>
          <span v-if="result.snippet" class="search__snippet">{{ result.snippet }}</span>
        </a>
      </li>
    </ul>
    <OEmpty v-else title="Nothing found">Try another word, or the name of a component: Button, Dialog, Table.</OEmpty>
    <span class="hint"><OKbd>↑</OKbd> <OKbd>↓</OKbd> to choose · <OKbd>Enter</OKbd> to open</span>
  </ODialog>
</template>
