<script setup lang="ts">
import { dismissToast, toasts } from './toast'
</script>

<template>
  <Teleport to="body">
    <div class="o-toaster">
      <button
        v-for="item in toasts"
        :key="item.id"
        type="button"
        class="o-toast"
        :class="item.tone && `o-toast--${item.tone}`"
        :role="item.tone === 'danger' ? 'alert' : 'status'"
        @click="dismissToast(item.id)"
      >
        {{ item.message }}
      </button>
    </div>
  </Teleport>
</template>

<style>
@keyframes o-toast-in {
  from {
    opacity: 0;
  }
}

.o-toaster {
  position: fixed;
  right: 16px;
  bottom: 24px;
  left: 16px;
  z-index: 130;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  /* the empty strip must not catch clicks */
  pointer-events: none;
}

.o-toast {
  max-width: min(480px, 100%);
  margin: 0;
  padding: 10px 16px;
  border: 0;
  border-radius: 12px;
  background: rgb(22 22 28 / 0.97);
  box-shadow: 0 16px 40px rgb(0 0 0 / 0.5);
  color: var(--o-text);
  font: 400 14px/1.4 var(--o-font-sans);
  text-align: left;
  cursor: pointer;
  pointer-events: auto;
  animation: o-toast-in var(--o-duration) ease;
}

.o-toast--accent {
  box-shadow:
    inset 0 0 0 2px color-mix(in srgb, var(--o-accent) 45%, transparent),
    0 16px 40px rgb(0 0 0 / 0.5);
}

.o-toast--danger {
  box-shadow:
    inset 0 0 0 2px color-mix(in srgb, var(--o-danger) 45%, transparent),
    0 16px 40px rgb(0 0 0 / 0.5);
}

.o-toast:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}
</style>
