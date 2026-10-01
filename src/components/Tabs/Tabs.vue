<script setup lang="ts" generic="T extends string">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

withDefaults(
  defineProps<{
    items: readonly { value: T; label: string; disabled?: boolean }[]
    /** `segmented`: pills in a dark track, for a switch. `underline`: for the sections of a page. */
    variant?: 'segmented' | 'underline'
  }>(),
  { variant: 'segmented' },
)

defineSlots<Partial<Record<T, () => unknown>>>()

// without a v-model the first tab is open (default-value in the template)
const model = defineModel<T>()
</script>

<template>
  <TabsRoot v-model="model" :default-value="items[0]?.value" class="o-tabs" :class="`o-tabs--${variant}`">
    <TabsList class="o-tabs__list">
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
        class="o-tabs__tab"
      >
        {{ item.label }}
      </TabsTrigger>
    </TabsList>
    <template v-for="item in items" :key="item.value">
      <TabsContent v-if="$slots[item.value]" :value="item.value" class="o-tabs__panel">
        <slot :name="item.value" />
      </TabsContent>
    </template>
  </TabsRoot>
</template>

<style>
.o-tabs {
  font-family: var(--o-font-sans);
}

.o-tabs__list {
  display: flex;
  gap: 4px;
  max-width: 100%;
  overflow-x: auto;
}

.o-tabs__tab {
  flex-shrink: 0;
  margin: 0;
  border: 0;
  background: none;
  color: var(--o-text-2);
  font: 600 13px/1.4 var(--o-font-sans);
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--o-duration) ease,
    color var(--o-duration) ease,
    box-shadow var(--o-duration) ease;
}

.o-tabs__tab:hover,
.o-tabs__tab[data-state='active'] {
  color: var(--o-text);
}

.o-tabs__tab:focus-visible {
  outline: 2px solid var(--o-accent);
  outline-offset: -2px;
}

.o-tabs__tab:disabled {
  opacity: 0.4;
  cursor: default;
}

.o-tabs--segmented .o-tabs__list {
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background: var(--o-surface);
}

.o-tabs--segmented .o-tabs__tab {
  padding: 6px 16px;
  border-radius: 999px;
}

.o-tabs--segmented .o-tabs__tab[data-state='active'] {
  background: rgb(255 255 255 / 0.14);
}

/* the line under the sections is the track the active mark sits on, not a border around a box */
.o-tabs--underline .o-tabs__list {
  box-shadow: inset 0 -1px 0 rgb(255 255 255 / 0.1);
}

.o-tabs--underline .o-tabs__tab {
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 400;
}

.o-tabs--underline .o-tabs__tab[data-state='active'] {
  box-shadow: inset 0 -2px 0 var(--o-accent);
  font-weight: 600;
}

.o-tabs__panel {
  padding-top: 16px;
  outline: none;
}

/* touch: a taller tab. Padding, not an invisible target: the list scrolls and would clip one */
@media (pointer: coarse) {
  .o-tabs--segmented .o-tabs__tab {
    padding-block: 10px;
  }
}
</style>
