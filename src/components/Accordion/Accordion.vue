<script setup lang="ts" generic="T extends string">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'

defineProps<{
  items: readonly { value: T; label: string; disabled?: boolean }[]
  /** Several sections may be open at once; the model is then a list. */
  multiple?: boolean
}>()

defineSlots<Partial<Record<T, () => unknown>>>()

// one open section (or none), or a list of them with `multiple`
const model = defineModel<T | T[]>()

// The row of a section is a plain block, not a heading: the library cannot know which level fits the
// page it is put on, and a wrong level is worse than none. The button still says whether it is open.
</script>

<template>
  <AccordionRoot v-model="model" :type="multiple ? 'multiple' : 'single'" collapsible class="o-accordion">
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      class="o-accordion__item"
    >
      <AccordionHeader as="div" class="o-accordion__header">
        <AccordionTrigger class="o-accordion__trigger">
          {{ item.label }}
          <svg class="o-accordion__chevron" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="o-accordion__content">
        <div class="o-accordion__body">
          <slot :name="item.value" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style>
/* sections are told apart by their fills, not by lines between them */
.o-accordion {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--o-text);
  font: 400 14px/1.5 var(--o-font-sans);
}

.o-accordion__item {
  border-radius: var(--o-radius-sm);
  background: var(--o-fill-1);
}

.o-accordion__item[data-state='open'] {
  background: var(--o-fill-2);
}

.o-accordion__header {
  margin: 0;
  font: inherit;
}

.o-accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 12px 14px;
  border: 0;
  border-radius: var(--o-radius-sm);
  background: none;
  color: var(--o-text-2);
  font: 600 14px/1.4 var(--o-font-sans);
  text-align: left;
  cursor: pointer;
  transition: color var(--o-duration) ease;
}

.o-accordion__trigger:hover,
.o-accordion__trigger[data-state='open'] {
  color: var(--o-text);
}

.o-accordion__trigger:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: -2px;
}

.o-accordion__trigger:disabled {
  opacity: 0.4;
  cursor: default;
}

/* the chevron turns over at once: an instant change of state, not a rotation to watch */
.o-accordion__chevron {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.o-accordion__trigger[data-state='open'] .o-accordion__chevron {
  transform: rotate(180deg);
}

@keyframes o-accordion-in {
  from {
    opacity: 0;
  }
}

/* the section appears with a fade; its height does not grow: nothing slides */
.o-accordion__content[data-state='open'] {
  animation: o-accordion-in var(--o-duration) ease;
}

.o-accordion__body {
  padding: 0 14px 14px;
  color: var(--o-text-2);
}

/* touch: a taller row to hit */
@media (pointer: coarse) {
  .o-accordion__trigger {
    padding-block: 14px;
  }
}
</style>
