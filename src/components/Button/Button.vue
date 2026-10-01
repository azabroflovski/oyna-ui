<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

import { hotkeyLabel as labelFor, useHotkey } from '../../composables/useHotkey'
import OSpinner from '../Spinner/Spinner.vue'

const props = withDefaults(
  defineProps<{
    /** Visual weight. Use `primary` once per screen. */
    variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'link'
    size?: 'sm' | 'md' | 'lg'
    /** `pill` for navigation and chips. */
    shape?: 'rounded' | 'pill'
    /** A square (or round, with `pill`) button holding only an icon. Give it an `aria-label`. */
    icon?: boolean
    /** Physical key (`KeyboardEvent.code`, e.g. `Enter`, `KeyR`) that clicks the button. Shown inside it. */
    hotkey?: string
    /** Text shown for the key; by default made from `hotkey`. */
    hotkeyLabel?: string
    /** Also turns the hotkey off. */
    disabled?: boolean
    /** Work is under way: shows a spinner and does not react to clicks or to the hotkey. */
    loading?: boolean
    /** Renders a link instead of a button. */
    href?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'secondary', size: 'md', shape: 'rounded', type: 'button' },
)

const el = useTemplateRef<HTMLElement>('el')
const keyText = computed(() => (props.hotkey ? (props.hotkeyLabel ?? labelFor(props.hotkey)) : undefined))

// a short brightening, so a key press is seen on the button it belongs to
const flashing = ref(false)
useHotkey(
  () => props.hotkey,
  () => {
    flashing.value = true
    setTimeout(() => (flashing.value = false), 140)
    el.value?.click()
  },
  { enabled: () => !props.disabled && !props.loading },
)
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    ref="el"
    class="o-button"
    :class="[
      `o-button--${variant}`,
      `o-button--${size}`,
      shape === 'pill' && 'o-button--pill',
      icon && 'o-button--icon',
      flashing && 'o-button--flash',
      loading && 'o-button--loading',
    ]"
    :href="disabled ? undefined : href"
    :type="href ? undefined : type"
    :disabled="href ? undefined : disabled"
    :aria-disabled="href && disabled ? true : undefined"
    :aria-keyshortcuts="hotkey?.replace(/^(Key|Digit)/, '')"
    :aria-busy="loading || undefined"
  >
    <OSpinner v-if="loading" />
    <slot />
    <kbd v-if="keyText" class="o-button__key">{{ keyText }}</kbd>
  </component>
</template>

<style>
.o-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0;
  padding: 9px 18px;
  border: 0;
  border-radius: 12px;
  background: var(--o-fill-2);
  color: var(--o-text);
  font: 600 15px/1.4 var(--o-font-sans);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--o-duration) ease,
    color var(--o-duration) ease,
    filter var(--o-duration) ease;
}

.o-button:hover {
  background: var(--o-fill-3);
}

.o-button:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: 2px;
}

.o-button:disabled,
.o-button[aria-disabled='true'] {
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
}

/* the current page in a navigation */
.o-button[aria-current]:not([aria-current='false']) {
  background: var(--o-text);
  color: var(--o-on-accent);
}

.o-button--primary {
  background: var(--o-accent);
  color: var(--o-on-accent);
  font-weight: 700;
}

.o-button--primary:hover {
  background: var(--o-accent);
  filter: brightness(1.1);
}

.o-button--soft {
  background: color-mix(in srgb, var(--o-accent) 15%, transparent);
  color: var(--o-accent);
  font-weight: 700;
}

.o-button--soft:hover {
  background: color-mix(in srgb, var(--o-accent) 24%, transparent);
}

.o-button--ghost {
  background: none;
  color: var(--o-text-3);
}

.o-button--ghost:hover {
  background: none;
  color: var(--o-text);
}

.o-button--link {
  padding: 0;
  border-radius: 4px;
  background: none;
  color: var(--o-accent);
  font-size: 13px;
}

.o-button--link:hover {
  background: none;
  filter: brightness(1.1);
}

.o-button--sm {
  gap: 6px;
  padding: 5px 11px;
  border-radius: var(--o-radius-sm);
  font-size: 13px;
}

.o-button--lg {
  gap: 14px;
  padding: 15px 30px;
  border-radius: var(--o-radius);
  font-size: 20px;
}

.o-button--pill {
  border-radius: 999px;
}

.o-button--icon {
  width: 42px;
  height: 42px;
  padding: 0;
}

.o-button--icon.o-button--sm {
  width: 30px;
  height: 30px;
}

.o-button--icon.o-button--lg {
  width: 58px;
  height: 58px;
}

/* still fully lit, unlike a disabled button: it is busy, not unavailable */
.o-button--loading {
  cursor: default;
  pointer-events: none;
}

/* an icon in the slot takes the size of the text next to it */
.o-button svg {
  flex-shrink: 0;
  width: 1.2em;
  height: 1.2em;
}

.o-button--flash {
  filter: brightness(1.35);
}

.o-button__key {
  padding: 2px 7px;
  border-radius: 6px;
  background: rgb(255 255 255 / 0.1);
  font: 700 11px/1.4 var(--o-font-sans);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.o-button--primary .o-button__key,
.o-button[aria-current]:not([aria-current='false']) .o-button__key {
  background: rgb(0 0 0 / 0.15);
}
</style>
