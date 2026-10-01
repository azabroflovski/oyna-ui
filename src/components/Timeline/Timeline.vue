<script
  setup
  lang="ts"
  generic="Item extends { title: string; time?: string; text?: string; tone?: 'accent' | 'danger'; pending?: boolean }"
>
defineProps<{
  /**
   * Events, newest first or oldest first: the order is yours. `tone` lights the dot: `accent` for
   * the event that matters now, `danger` for one that went wrong. `pending` is an event that has not
   * happened yet: its dot is empty.
   */
  items: readonly Item[]
}>()

defineSlots<{
  /** More under an event: a button, a badge, a block of details. */
  default?: (props: { item: Item }) => unknown
}>()
</script>

<template>
  <ol class="o-timeline">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="o-timeline__item"
      :class="[item.tone && `o-timeline__item--${item.tone}`, item.pending && 'o-timeline__item--pending']"
    >
      <span class="o-timeline__dot" aria-hidden="true" />
      <div class="o-timeline__head">
        <span class="o-timeline__title">{{ item.title }}</span>
        <span v-if="item.time" class="o-timeline__time">{{ item.time }}</span>
      </div>
      <p v-if="item.text" class="o-timeline__text">{{ item.text }}</p>
      <div v-if="$slots.default" class="o-timeline__more"><slot :item /></div>
    </li>
  </ol>
</template>

<style>
.o-timeline {
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--o-text);
  font: 400 14px/20px var(--o-font-sans);
}

.o-timeline__item {
  position: relative;
  padding: 0 0 20px 28px;
}

.o-timeline__item:last-child {
  padding-bottom: 0;
}

/* the track the dots sit on: it joins the events, it is not a border around anything */
.o-timeline__item:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 20px;
  bottom: 0;
  left: 5px;
  width: 2px;
  border-radius: 1px;
  background: rgb(255 255 255 / 0.1);
}

.o-timeline__dot {
  position: absolute;
  top: 4px;
  left: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.45);
}

/* not yet: an outline, like an empty step */
.o-timeline__item--pending .o-timeline__dot {
  background: none;
  box-shadow: inset 0 0 0 2px rgb(255 255 255 / 0.3);
}

.o-timeline__item--pending .o-timeline__title {
  color: var(--o-text-2);
  font-weight: 400;
}

/* the event that matters now is lit; the halo is light, not a ring around a box */
.o-timeline__item--accent .o-timeline__dot {
  background: var(--o-accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--o-accent) 22%, transparent);
}

.o-timeline__item--danger .o-timeline__dot {
  background: var(--o-danger);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--o-danger) 22%, transparent);
}

.o-timeline__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.o-timeline__title {
  font-weight: 600;
}

.o-timeline__item--danger .o-timeline__title {
  color: var(--o-danger);
}

.o-timeline__time {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--o-text-3);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.o-timeline__text {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--o-text-2);
}

.o-timeline__more {
  margin-top: 8px;
}
</style>
