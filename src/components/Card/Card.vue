<script setup lang="ts">
import OSurface from '../Surface/Surface.vue'

defineProps<{
  /** Element to render. */
  as?: string
  /** A ring that means something: `accent` is the main thing, `danger` is something at stake. */
  signal?: 'accent' | 'danger'
}>()
</script>

<template>
  <OSurface class="o-card" :as strong :signal>
    <slot />
  </OSurface>
</template>

<style>
.o-card {
  padding: 20px;
}
</style>
