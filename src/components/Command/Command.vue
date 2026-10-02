<script setup lang="ts">
import { ListboxContent, ListboxFilter, ListboxGroup, ListboxGroupLabel, ListboxItem, ListboxRoot } from 'reka-ui'
import type { Component } from 'vue'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

import ODialog from '../Dialog/Dialog.vue'

export interface CommandItem {
  value: string
  label: string
  /** Items with the same group stand together under its name. */
  group?: string
  /** A dim note at the end of the row, e.g. the keys that do the same. */
  hint?: string
  /** Extra words the item is found by, besides its label and group. */
  keywords?: string
  icon?: Component
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    items: readonly CommandItem[]
    /** The dialog's title. */
    title?: string
    placeholder?: string
    /** Shown when nothing matches what was typed. */
    emptyText?: string
  }>(),
  { title: 'Commands', placeholder: 'Type a command', emptyText: 'Nothing found' },
)

const emit = defineEmits<{ select: [item: CommandItem] }>()
const open = defineModel<boolean>('open', { default: false })

const query = ref('')
const list = useTemplateRef<{ highlightFirstItem: () => void }>('list')
const field = useTemplateRef<{ $el: HTMLInputElement }>('field')

// every typed word must occur somewhere in the item: "dep prod" finds "Deploy to production"
const found = computed(() => {
  const words = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  return props.items.filter((item) => {
    const text = `${item.label} ${item.group ?? ''} ${item.keywords ?? ''}`.toLowerCase()
    return words.every((word) => text.includes(word))
  })
})

// groups in the order their first item comes; items without a group form a nameless one
const groups = computed(() => {
  const byName = new Map<string, CommandItem[]>()
  for (const item of found.value) {
    const name = item.group ?? ''
    byName.set(name, [...(byName.get(name) ?? []), item])
  }
  return [...byName].map(([name, items]) => ({ name, items }))
})

// Enter must always have something to run: the first row is lit whenever the list changes, and again
// when the pointer leaves the list (Reka unlights the row it was on, also when the row is filtered away)
const highlightFirst = () => nextTick(() => list.value?.highlightFirstItem())
watch(query, highlightFirst)
watch(open, async (isOpen) => {
  if (!isOpen) return
  query.value = ''
  // the dialog focuses itself first; the field takes over once it is in the page
  await nextTick()
  field.value?.$el.focus()
  void highlightFirst()
})

function choose(item: CommandItem) {
  open.value = false
  emit('select', item)
}
</script>

<template>
  <ODialog v-model:open="open" :title class="o-command">
    <ListboxRoot ref="list" class="o-command__box" highlight-on-hover @leave="highlightFirst">
      <ListboxFilter ref="field" v-model="query" class="o-input" :placeholder :aria-label="title" autocomplete="off" />
      <ListboxContent v-if="found.length" class="o-command__list">
        <ListboxGroup v-for="group in groups" :key="group.name" class="o-command__group">
          <ListboxGroupLabel v-if="group.name" class="o-command__label">{{ group.name }}</ListboxGroupLabel>
          <ListboxItem
            v-for="item in group.items"
            :key="item.value"
            :value="item.value"
            :disabled="item.disabled"
            class="o-command__item"
            @select="choose(item)"
          >
            <component :is="item.icon" v-if="item.icon" class="o-command__icon" aria-hidden="true" />
            <span class="o-command__text">{{ item.label }}</span>
            <span v-if="item.hint" class="o-command__hint">{{ item.hint }}</span>
          </ListboxItem>
        </ListboxGroup>
      </ListboxContent>
      <p v-else class="o-command__empty">{{ emptyText }}</p>
    </ListboxRoot>
  </ODialog>
</template>

<style>
.o-command__box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.o-command__list {
  max-height: min(340px, 50dvh);
  overflow-y: auto;
  outline: none;
}

.o-command__group + .o-command__group {
  margin-top: 8px;
}

.o-command__label {
  padding: 6px 12px;
  font: 700 11px/1.4 var(--o-font-sans);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.o-command__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--o-radius-sm);
  outline: none;
  color: var(--o-text-2);
  font: 400 14px/1.4 var(--o-font-sans);
  cursor: pointer;
  user-select: none;
}

.o-command__item[data-highlighted] {
  background: var(--o-fill-3);
  color: var(--o-text);
}

.o-command__item[data-disabled] {
  opacity: 0.4;
  cursor: default;
}

.o-command__icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.o-command__text {
  flex-grow: 1;
}

.o-command__hint {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--o-text-3);
}

.o-command__empty {
  margin: 0;
  padding: 20px 12px;
  text-align: center;
  font: 400 14px/1.4 var(--o-font-sans);
  color: var(--o-text-3);
}

/* touch: a row is a taller target */
@media (pointer: coarse) {
  .o-command__item {
    padding-block: 12px;
  }
}
</style>
