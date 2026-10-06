<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <a class="brand" :href="withBase('/')" aria-label="Oyna UI">
    <!-- the favicon's mark; the ring takes the accent, so a theme recolours it -->
    <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" />
      <circle cx="16" cy="16" r="8" />
    </svg>
    OYNA <span class="brand__ui">UI</span>
  </a>
</template>
