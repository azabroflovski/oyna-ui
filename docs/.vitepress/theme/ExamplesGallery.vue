<script setup lang="ts">
import { withBase } from 'vitepress'

// the level of the cards' headings: 2 right under a page title, 3 inside a section
withDefaults(defineProps<{ level?: 2 | 3 }>(), { level: 3 })

/** The example screens, each with a real screenshot (redrawn by scripts/thumbs.ts). */
const examples = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    text: 'An API overview: stats that load, a bar chart, an alert, an activity feed and a deploy dialog. K opens a command palette.',
  },
  {
    name: 'incident',
    title: 'Incident',
    text: 'An error spike shown in the alert, the stats, the chart and the timeline, with a runbook beside it. Roll back clears it all.',
  },
  {
    name: 'projects',
    title: 'Projects',
    text: "A table in every state: loading, filtered to nothing, empty. A menu on each row; a project's details open in a drawer.",
  },
  {
    name: 'settings',
    title: 'Settings',
    text: 'Five tabs: a form with unsaved changes, a team, API tokens shown once, notifications with a threshold, key bindings.',
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
