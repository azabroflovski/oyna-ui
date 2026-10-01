<script setup>
import { ArrowRight, Ellipsis } from '@lucide/vue'
</script>

# Card

The block most screens are made of: a darker [surface](/components/surface) with padding, and an optional header and footer.

<Demo>
  <OCard label="Usage" title="Requests" title-as="h2" style="width: 340px">
    <template #actions>
      <OBadge>Pro</OBadge>
    </template>
    <span style="font: 700 56px/1 var(--o-font-display)">131.6k</span>
    <OProgress :value="72" aria-label="Plan usage" style="margin-top: 12px" />
    <template #footer>72% of the plan, resets on Monday.</template>
  </OCard>
</Demo>

```vue
<OCard label="Usage" title="Requests">
  <template #actions>
    <OBadge>Pro</OBadge>
  </template>

  <span class="number">131.6k</span>
  <OProgress :value="72" aria-label="Plan usage" />

  <template #footer>72% of the plan, resets on Monday.</template>
</OCard>
```

Everything but the content is optional. A card with no header and no footer is just padding around what you put in it.

## Header

- `label` — a small caption: what the card is about. The quiet way to name a card, and the one to reach for first.
- `title` — a heading in display type, for a card that is a section of the page. It is an `<h3>`; set `title-as` to the level that fits your page.
- `actions` — the slot at the right end: a badge, a button, a menu.

<Demo>
  <OCard label="Endpoints" style="width: 260px">
    <template #actions>
      <OButton icon size="sm" variant="ghost" aria-label="More"><Ellipsis /></OButton>
    </template>
    Only a label and an action.
  </OCard>
  <OCard title="Billing" title-as="h2" style="width: 260px">
    Only a title.
  </OCard>
</Demo>

```vue
<OCard label="Endpoints">
  <template #actions>
    <OButton icon size="sm" variant="ghost" aria-label="More"><Ellipsis /></OButton>
  </template>
  Only a label and an action.
</OCard>

<OCard title="Billing" title-as="h2">Only a title.</OCard>
```

## Footer

What comes after the content: a total, a note, a link to more. A thin line sets it apart — a line between two parts of one card, not a border around it.

<Demo>
  <OCard label="Activity" style="width: 340px">
    <OTimeline :items="[{ title: 'v1.4.1 is live', time: '2 min ago', tone: 'accent' }, { title: 'Tests passed', time: '4 min ago' }]" />
    <template #footer>
      <OButton variant="link">All activity <ArrowRight /></OButton>
    </template>
  </OCard>
</Demo>

## Signal

The ring from [Surface](/components/surface#signal): `accent` for the main thing, `danger` for something at stake. One per screen, rarely two.

<Demo>
  <OCard signal="accent" label="Next release" style="width: 220px">v1.4.1</OCard>
  <OCard signal="danger" label="Quota runs out in" style="width: 220px">3 days</OCard>
</Demo>

```vue
<OCard signal="accent" label="Next release">v1.4.1</OCard>
<OCard signal="danger" label="Quota runs out in">3 days</OCard>
```

## Props and slots

| Prop      | Type                   | Default | Description                   |
| --------- | ---------------------- | ------- | ----------------------------- |
| `label`   | `string`               | —       | A small caption over the card |
| `title`   | `string`               | —       | A heading in display type     |
| `titleAs` | `string`               | `'h3'`  | The element of the title      |
| `signal`  | `'accent' \| 'danger'` | —       | A ring that means something   |
| `as`      | `string`               | `'div'` | Element to render             |

| Slot      | Description                     |
| --------- | ------------------------------- |
| default   | The content                     |
| `actions` | At the right end of the header  |
| `footer`  | Under the content, after a line |
