<script setup lang="ts">
import { Search } from '@lucide/vue'
import { useData, useRouter, withBase } from 'vitepress'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

import type { ThemeConfig } from '../config'

/** Jumps to a page by its name. It searches titles, not the text of the pages. */
const { theme } = useData<ThemeConfig>()
const router = useRouter()

const open = ref(false)
const query = ref('')
const active = ref(0)
const input = useTemplateRef<{ $el: HTMLInputElement }>('input')

const pages = computed(() =>
  theme.value.sidebar.flatMap((group) => group.items.map((item) => ({ ...item, group: group.text }))),
)
const found = computed(() => {
  const words = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  return pages.value.filter((page) => words.every((word) => `${page.text} ${page.group}`.toLowerCase().includes(word)))
})

watch(open, async (isOpen) => {
  if (!isOpen) return
  query.value = ''
  // the dialog focuses itself first; the field takes over once it is in the page
  await nextTick()
  input.value?.$el.focus()
})
watch(query, () => (active.value = 0))

function move(step: number) {
  if (found.value.length) active.value = (active.value + step + found.value.length) % found.value.length
}

function go(link?: string) {
  if (!link) return
  open.value = false
  router.go(withBase(link))
}
</script>

<template>
  <OButton shape="pill" hotkey="Slash" @click="open = true"> <Search /> Search </OButton>

  <ODialog v-model:open="open" title="Search" class="search">
    <OInput
      ref="input"
      v-model="query"
      placeholder="Find a page"
      aria-label="Find a page"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.enter.prevent="go(found[active]?.link)"
    />
    <ul v-if="found.length" class="search__list">
      <li v-for="(page, index) in found" :key="page.link">
        <a
          :href="withBase(page.link)"
          class="search__item"
          :aria-current="index === active ? 'true' : undefined"
          @click.prevent="go(page.link)"
          @mousemove="active = index"
        >
          {{ page.text }}
          <span>{{ page.group }}</span>
        </a>
      </li>
    </ul>
    <OEmpty v-else title="Nothing found">Search looks at page names. Try a component: Button, Dialog, Table.</OEmpty>
    <span class="hint"><OKbd>↑</OKbd> <OKbd>↓</OKbd> to choose · <OKbd>Enter</OKbd> to open</span>
  </ODialog>
</template>
