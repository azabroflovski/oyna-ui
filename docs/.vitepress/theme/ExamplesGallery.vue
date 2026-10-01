<script setup lang="ts">
import { withBase } from 'vitepress'

// the level of the cards' headings: 2 right under a page title, 3 inside a section
withDefaults(defineProps<{ level?: 2 | 3 }>(), { level: 3 })

/** The example screens, each with a real screenshot (redrawn by scripts/thumbs.ts). */
const examples = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    text: 'An API overview: numbers that load, a chart, an alert, an activity feed, a deploy dialog.',
  },
  {
    name: 'incident',
    title: 'Incident',
    text: 'Something is at stake. Danger tells one story in five places, and a rollback turns the page calm.',
  },
  {
    name: 'projects',
    title: 'Projects',
    text: 'A list and all its states: loading, filtered to nothing, empty, with a menu on every row.',
  },
  {
    name: 'settings',
    title: 'Settings',
    text: 'Five tabs: a form that knows it is unsaved, a team, API tokens shown once, notifications, key bindings.',
  },
]
</script>

<template>
  <div class="gallery">
    <a
      v-for="example in examples"
      :key="example.name"
      class="gallery__item"
      :href="withBase(`/examples/${example.name}`)"
    >
      <OSurface class="gallery__shot">
        <img :src="withBase(`/examples/${example.name}.jpg`)" :alt="`The ${example.title} example`" loading="lazy" />
      </OSurface>
      <component :is="`h${level}`" class="gallery__title">{{ example.title }}</component>
      <p>{{ example.text }}</p>
    </a>
  </div>
</template>
