<script setup lang="ts">
import { ref } from 'vue'

import { toast } from '../src'

const variants = ['primary', 'secondary', 'soft', 'ghost', 'link'] as const
const sizes = ['sm', 'md', 'lg'] as const
const saved = ref(0)
const retried = ref(0)

const tabs = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
]
const tab = ref('two')
const sound = ref(true)
const text = ref('')
const choice = ref('two')
const key = ref('KeyR')
const bars = [
  { label: 'Mon', value: 3 },
  { label: 'Tue', value: 7, tone: 'danger' as const, dot: true },
  { label: 'Wed', value: 2, tone: 'accent' as const },
  { label: 'Thu', value: 5 },
]
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'score', label: 'Score', numeric: true },
] as const
const rows = [
  { name: 'ada', score: 12 },
  { name: 'you', score: 9 },
  { name: 'linus', score: 7 },
]
// open the page with #dialog to start with the dialog open
const open = ref(location.hash === '#dialog')
</script>

<template>
  <OBackground />
  <main class="page">
    <h1>Oyna UI playground</h1>

    <OCard class="block">
      <h2>Button</h2>
      <div class="row">
        <OButton v-for="variant in variants" :key="variant" :variant>
          {{ variant }}
        </OButton>
      </div>
      <div class="row">
        <OButton v-for="size in sizes" :key="size" :size>
          {{ size }}
        </OButton>
        <OButton shape="pill"> pill </OButton>
        <OButton shape="pill" aria-current="page"> current </OButton>
        <OButton icon shape="pill" aria-label="Icon"> ? </OButton>
        <OButton disabled> disabled </OButton>
        <OButton href="#link"> link </OButton>
      </div>
      <div class="row">
        <OButton variant="primary" size="lg" hotkey="Enter" @click="saved++"> Save </OButton>
        <OButton variant="soft" hotkey="KeyR" @click="retried++"> Retry </OButton>
        <input placeholder="typing here is safe" />
        <span>saved {{ saved }} · retried {{ retried }}</span>
      </div>
    </OCard>

    <div class="grid">
      <OSurface class="pad"> Surface </OSurface>
      <OSurface class="pad" strong> Strong </OSurface>
      <OCard signal="accent"> Accent: the main thing </OCard>
      <OCard signal="danger"> Danger: at stake </OCard>
    </div>

    <OCard class="block">
      <h2>Kbd</h2>
      <div class="row">
        <span><OKbd>Esc</OKbd> closes</span>
        <OKbd variant="outline"> M </OKbd>
        <OKbd variant="cap"> Q </OKbd>
        <OKbd variant="cap"> W </OKbd>
      </div>
    </OCard>

    <OCard class="block">
      <h2>Input, Toggle, Tabs</h2>
      <div class="row">
        <OField label="Name" hint="2–16 characters" :error="text === 'x' ? 'Too short' : undefined">
          <OInput v-model="text" placeholder="type x for an error" />
        </OField>
        <OToggle v-model="sound" hotkey="KeyM"> Sound </OToggle>
        <OToggle disabled> Disabled </OToggle>
        <OTabs v-model="tab" :items="tabs" />
      </div>
      <OTabs :items="tabs" variant="underline">
        <template #one> Panel one </template>
        <template #two> Panel two </template>
        <template #three> Panel three </template>
      </OTabs>
    </OCard>

    <OCard class="block">
      <h2>Stat, Progress, Badge, Dialog</h2>
      <div class="row">
        <OStat label="Requests"> 18 204 </OStat>
        <OStat label="Best" tone="accent"> 96 ms </OStat>
        <OStat label="Errors" tone="danger"> 12 </OStat>
        <OBadge>Pro</OBadge>
        <OBadge tone="accent"> New </OBadge>
        <OBadge tone="danger"> Expired </OBadge>
        <OButton hotkey="KeyD" @click="open = true"> Dialog </OButton>
      </div>
      <OProgress :value="72" aria-label="Done" />
      <OProgress :value="18" tone="danger" aria-label="Left" />
    </OCard>

    <OCard class="block">
      <h2>Select, Tooltip, Toast, KeyCapture</h2>
      <div class="row">
        <OSelect v-model="choice" :items="tabs" aria-label="Choice" />
        <OTooltip text="A tooltip">
          <OButton icon shape="pill" aria-label="Help"> ? </OButton>
        </OTooltip>
        <OButton @click="toast('Saved', { tone: 'accent' })"> Toast </OButton>
        <OButton @click="toast('Failed', { tone: 'danger', duration: 0 })"> Sticky toast </OButton>
        <OKeyCapture v-model="key"> Retry </OKeyCapture>
      </div>
    </OCard>

    <OCard class="block">
      <h2>Pips, Sparkline, BarChart, Table</h2>
      <div class="row">
        <OPips :done="3" :total="8" :marker="4.5" aria-label="Steps" />
        <OSparkline :values="[3, 5, 4, 8, 7, 11]" label="Rising" :width="160" :height="40" />
      </div>
      <OBarChart :items="bars" />
      <OTable :columns :rows row-key="name" :signal="(row) => (row.name === 'you' ? 'accent' : undefined)" />
    </OCard>
    <OToaster />

    <ODialog v-model:open="open" title="Settings" description="Kept on this device.">
      <OField label="Name" hint="2–16 characters">
        <OInput />
      </OField>
      <div class="row">
        <OToggle v-model="sound" hotkey="KeyM"> Sound </OToggle>
        <OButton variant="primary" hotkey="Enter" style="margin-left: auto" @click="open = false"> Save </OButton>
      </div>
    </ODialog>
  </main>
</template>

<style>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h1,
h2 {
  margin: 0;
  font-family: var(--o-font-display);
  text-transform: uppercase;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.pad {
  padding: 20px;
}
</style>
