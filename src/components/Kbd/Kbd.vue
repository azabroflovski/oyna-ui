<script setup lang="ts">
import { computed } from 'vue'

import { usePressedKeys } from '../../composables/pressedKeys'

const props = withDefaults(
  defineProps<{
    /** `key`: a small key cap in a sentence. `cap`: a large one on its own. `outline`: a key inside a control. */
    variant?: 'key' | 'cap' | 'outline'
    /** The physical key (`KeyboardEvent.code`) this stands for: the cap lights up while it is held. */
    code?: string
  }>(),
  { variant: 'key' },
)

const pressed = usePressedKeys()
const down = computed(() => !!props.code && pressed.has(props.code))
</script>

<template>
  <kbd class="o-kbd" :class="[`o-kbd--${variant}`, down && 'o-kbd--pressed']"><slot /></kbd>
</template>

<style>
/*
  A key cap: a face lit from above (a lighter top, a bright top edge) standing on a dark lip.
  Sized in em, so it follows the text it sits in.
*/
.o-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 1.75em;
  height: 1.75em;
  padding: 0 0.45em;
  border-radius: 0.4em;
  background: linear-gradient(rgb(255 255 255 / 0.18), rgb(255 255 255 / 0.07));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.28),
    0 0.16em 0 rgb(0 0 0 / 0.55);
  color: var(--o-text);
  font: 700 max(0.82em, 11px) / 1 var(--o-font-sans);
  white-space: nowrap;
  transition:
    background-color var(--o-duration) ease,
    color var(--o-duration) ease,
    box-shadow var(--o-duration) ease;
}

.o-kbd--cap {
  min-width: 42px;
  height: 42px;
  padding: 0 10px;
  border-radius: var(--o-radius-sm);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.28),
    0 3px 0 rgb(0 0 0 / 0.55);
  font: 700 24px/1 var(--o-font-display);
}

/* held down: the cap lights up in the accent colour. It does not move: light, not movement. */
.o-kbd--pressed {
  background: color-mix(in srgb, var(--o-accent) 24%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--o-accent) 70%, transparent),
    0 0.16em 0 rgb(0 0 0 / 0.55);
  color: var(--o-accent);
}

.o-kbd--cap.o-kbd--pressed {
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--o-accent) 70%, transparent),
    0 3px 0 rgb(0 0 0 / 0.55);
}

/* inside a control there is no room for a cap: a flat key that takes the colour of the text around it */
.o-kbd--outline {
  min-width: 0;
  height: auto;
  padding: 0 6px;
  border-radius: 5px;
  background: none;
  /* the edge of a key: one of the allowed 1px lines */
  box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 40%, transparent);
  color: inherit;
  font: 700 11px/1.5 var(--o-font-sans);
}

.o-kbd--outline.o-kbd--pressed {
  background: color-mix(in srgb, var(--o-accent) 24%, transparent);
  box-shadow: inset 0 0 0 1px var(--o-accent);
  color: var(--o-accent);
}
</style>
