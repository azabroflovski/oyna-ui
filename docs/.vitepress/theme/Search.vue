<script setup lang="ts">
import { Search } from '@lucide/vue'
import type { CommandItem } from 'oyna-ui'
import { useData, useRouter, withBase } from 'vitepress'
import { computed, ref, shallowRef, watch } from 'vue'

import type { ThemeConfig } from '../config'
import type { Section } from './search.data'

/**
 * Finds a page by its name, or a section of a page by the words in it. With nothing typed it lists
 * every page: on a phone, where the sidebar is hidden, this is the navigation.
 *
 * It is the library's command palette with a search of its own: the palette shows what it is given.
 */
const { theme } = useData<ThemeConfig>()
const router = useRouter()

const open = ref(false)
const query = ref('')

interface Page {
  url: string
  title: string
  group: string
}

const pages = computed<Page[]>(() =>
  theme.value.sidebar.flatMap((group) =>
    group.items.map((item) => ({ url: item.link, title: item.text, group: group.text })),
  ),
)

// the text of the pages is a separate file, fetched the first time the search is opened
const sections = shallowRef<Section[]>([])
watch(open, async (isOpen) => {
  if (isOpen && !sections.value.length) sections.value = (await import('./search.data')).data
})

const words = computed(() => query.value.toLowerCase().split(/\s+/).filter(Boolean))

/** The text around the first place a word occurs, so the result shows why it was found. */
function around(text: string, word: string) {
  const at = text.toLowerCase().indexOf(word)
  if (at < 0) return undefined
  const from = Math.max(0, at - 40)
  return `${from > 0 ? '…' : ''}${text.slice(from, at + 80).trim()}${at + 80 < text.length ? '…' : ''}`
}

const found = computed<CommandItem[]>(() => {
  // nothing typed: every page under the name of its group, as in the sidebar
  if (!words.value.length) return pages.value.map((page) => ({ value: page.url, label: page.title, group: page.group }))
  const has = (text: string) => (word: string) => text.toLowerCase().includes(word)

  // pages by name first: someone typing "button" wants the Button page
  const byName = pages.value
    .filter((page) => words.value.every(has(`${page.title} ${page.group}`)))
    .map((page): CommandItem => ({ value: page.url, label: page.title, hint: page.group }))

  // then sections, the ones with the words in their heading before the ones with them in the text
  const byText = sections.value
    .filter((section) => words.value.every(has(`${section.page} ${section.heading} ${section.text}`)))
    .map((section) => ({
      section,
      score: words.value.filter(has(section.heading)).length * 2 + words.value.filter(has(section.page)).length,
    }))
    .toSorted((a, b) => b.score - a.score)
    .map(({ section }): CommandItem => ({
      value: section.url,
      label: section.heading || section.page,
      hint: section.heading ? section.page : undefined,
      description: around(section.text, words.value.find(has(section.text)) ?? ''),
    }))
    // a page already listed by name is not listed again for its opening part (and two results with
    // one address would confuse the list)
    .filter((result) => !byName.some((page) => page.value === result.value))

  return [...byName, ...byText].slice(0, 30)
})
</script>

<template>
  <OButton shape="pill" hotkey="Slash" @click="open = true"> <Search /> Search </OButton>

  <OCommand
    v-model:open="open"
    v-model:query="query"
    :items="found"
    :filter="false"
    title="Search"
    placeholder="A page, a prop, a word"
    empty-text="Nothing found. Try another word, or the name of a component: Button, Dialog, Table."
    @select="(item) => router.go(withBase(item.value))"
  >
    <template #footer>
      <span class="hint"><OKbd>↑</OKbd> <OKbd>↓</OKbd> to choose · <OKbd>Enter</OKbd> to open</span>
    </template>
  </OCommand>
</template>
