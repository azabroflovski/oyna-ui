<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Whose it is: read out by screen readers, and the source of the initials. */
    name: string
    /** A picture; the initials show until it loads, and stay if it fails. */
    src?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' },
)

// "Ada Lovelace" → "AL", "grace" → "G"
const initials = computed(() =>
  props.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join(''),
)
</script>

<template>
  <AvatarRoot class="o-avatar" :class="`o-avatar--${size}`" role="img" :aria-label="name">
    <AvatarImage v-if="src" :src alt="" role="presentation" class="o-avatar__image" />
    <AvatarFallback class="o-avatar__initials" aria-hidden="true">{{ initials }}</AvatarFallback>
  </AvatarRoot>
</template>

<style>
.o-avatar {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
  background: var(--o-fill-3);
  color: var(--o-text);
  font: 600 12px/1 var(--o-font-sans);
  letter-spacing: 0.02em;
  vertical-align: middle;
  user-select: none;
}

.o-avatar--sm {
  width: 24px;
  height: 24px;
  font-size: 10px;
}

.o-avatar--lg {
  width: 48px;
  height: 48px;
  font-size: 16px;
}

.o-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
