<script setup lang="ts">
import { useRoute } from 'vitepress'
import { nextTick, onMounted, ref, watch } from 'vue'

/** The sections of the open page, read from its headings once it is rendered. */
const headings = ref<{ id: string; text: string }[]>([])
const route = useRoute()

function read() {
  headings.value = [...document.querySelectorAll<HTMLElement>('.content h2[id]')].map((h) => ({
    id: h.id,
    // without the hidden "#" anchor VitePress puts in every heading
    text: [...h.childNodes]
      .filter((node) => !(node instanceof HTMLElement && node.classList.contains('header-anchor')))
      .map((node) => node.textContent)
      .join('')
      .trim(),
  }))
}

onMounted(read)
watch(
  () => route.path,
  () => nextTick(read),
)
</script>

<template>
  <nav v-if="headings.length > 1" class="outline" aria-label="On this page">
    <div class="label">On this page</div>
    <a v-for="heading in headings" :key="heading.id" :href="`#${heading.id}`">{{ heading.text }}</a>
  </nav>
</template>
