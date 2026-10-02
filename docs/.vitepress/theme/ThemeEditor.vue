<script setup lang="ts">
import { Check, Copy, RotateCcw } from '@lucide/vue'
import { toast } from 'oyna-ui'
import { computed, onMounted, reactive, ref, watch } from 'vue'

/** The tokens the editor changes, with the library's defaults. */
const defaults = {
  accent: '#a5ff4d',
  danger: '#ff8a8a',
  radius: 14,
  glass: 30,
  bg1: '#3a4fd0',
  bg2: '#8a2bb8',
  bg3: '#0e7f78',
  bg4: '#b0561a',
}
type Theme = typeof defaults

const presets: { name: string; theme: Partial<Theme> }[] = [
  { name: 'Lime', theme: {} },
  { name: 'Cyan', theme: { accent: '#4dd2ff', bg1: '#1d4ed8', bg2: '#0e7490', bg3: '#155e75', bg4: '#4338ca' } },
  { name: 'Amber', theme: { accent: '#ffc24d', bg1: '#b45309', bg2: '#9f1239', bg3: '#7c2d12', bg4: '#a16207' } },
  { name: 'Pink', theme: { accent: '#ff6bcb', bg1: '#a21caf', bg2: '#be185d', bg3: '#6d28d9', bg4: '#9d174d' } },
  { name: 'Violet', theme: { accent: '#b69cff', bg1: '#4c1d95', bg2: '#1e3a8a', bg3: '#5b21b6', bg4: '#312e81' } },
  { name: 'Paper', theme: { accent: '#f4f4f5', bg1: '#3f3f46', bg2: '#27272a', bg3: '#3f3f46', bg4: '#52525b' } },
]

const theme = reactive<Theme>({ ...defaults })

/** What each value becomes in CSS. */
function toCss(values: Theme): Record<string, string> {
  return {
    '--o-accent': values.accent,
    '--o-danger': values.danger,
    '--o-radius-sm': `${Math.round(values.radius * 0.57)}px`,
    '--o-radius': `${values.radius}px`,
    '--o-radius-lg': `${Math.round(values.radius * 1.7)}px`,
    '--o-surface': `rgb(0 0 0 / ${values.glass / 100})`,
    '--o-surface-strong': `rgb(0 0 0 / ${Math.min(100, values.glass + 10) / 100})`,
    '--o-bg-1': values.bg1,
    '--o-bg-2': values.bg2,
    '--o-bg-3': values.bg3,
    '--o-bg-4': values.bg4,
  }
}
const variables = computed(() => toCss(theme))
const initial = toCss(defaults)

/** Only what differs from the defaults: that is all a consumer has to write. */
const changed = computed(() => Object.entries(variables.value).filter(([name, value]) => initial[name] !== value))
const css = computed(() =>
  changed.value.length
    ? `:root {\n${changed.value.map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`
    : '/* the defaults: nothing to override */',
)

// applied to the whole document, so the header, the dialogs and every other page follow
onMounted(() => {
  watch(
    variables,
    (now) => {
      const root = document.documentElement.style
      for (const name of Object.keys(now)) root.removeProperty(name)
      for (const [name, value] of changed.value) root.setProperty(name, value)
    },
    { immediate: true },
  )
})

function use(preset: Partial<Theme>) {
  Object.assign(theme, defaults, preset)
}

const copied = ref(false)
async function copy() {
  await navigator.clipboard.writeText(css.value)
  copied.value = true
  toast('Copied', { tone: 'accent' })
  setTimeout(() => (copied.value = false), 2000)
}

// the preview
const sound = ref(true)
const agree = ref(true)
const live = ref(true)
const plan = ref('pro')
const period = ref('week')
const language = ref('en')
const periods = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]
const plans = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
]
const languages = [
  { value: 'en', label: 'English', hint: 'en' },
  { value: 'uz', label: 'Oʻzbekcha', hint: 'uz' },
]
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'best', label: 'Best', numeric: true },
] as const
const rows = [
  { name: 'ada', best: '18.42' },
  { name: 'you', best: '19.31' },
  { name: 'linus', best: '20.74' },
]
</script>

<template>
  <div class="editor">
    <OCard class="editor__panel">
      <div class="editor__group">
        <span class="label">Presets</span>
        <div class="editor__row">
          <OButton v-for="preset in presets" :key="preset.name" size="sm" shape="pill" @click="use(preset.theme)">
            <span class="editor__dot" :style="{ background: preset.theme.accent ?? defaults.accent }" />
            {{ preset.name }}
          </OButton>
        </div>
      </div>

      <div class="editor__group">
        <span class="label">Colours</span>
        <label class="editor__colour"><input v-model="theme.accent" type="color" /> Accent</label>
        <label class="editor__colour"><input v-model="theme.danger" type="color" /> Danger</label>
      </div>

      <div class="editor__group">
        <span class="label">Background glows</span>
        <div class="editor__row">
          <input v-model="theme.bg1" type="color" aria-label="Top left glow" />
          <input v-model="theme.bg2" type="color" aria-label="Top right glow" />
          <input v-model="theme.bg4" type="color" aria-label="Bottom left glow" />
          <input v-model="theme.bg3" type="color" aria-label="Bottom right glow" />
        </div>
      </div>

      <div class="editor__group">
        <span class="label">Radius · {{ theme.radius }}px</span>
        <OSlider v-model="theme.radius" :max="24" aria-label="Radius" />
      </div>

      <div class="editor__group">
        <span class="label">Glass darkness · {{ theme.glass }}%</span>
        <OSlider v-model="theme.glass" :min="10" :max="70" :step="5" aria-label="Glass darkness" />
      </div>

      <OButton variant="ghost" size="sm" class="editor__reset" @click="use({})"> <RotateCcw /> Reset </OButton>
    </OCard>

    <div class="editor__preview">
      <div class="editor__row">
        <OButton variant="primary" hotkey="Enter">Save</OButton>
        <OButton>Cancel</OButton>
        <OButton variant="soft">Soft</OButton>
        <OButton variant="primary" loading>Saving</OButton>
        <OToggle v-model="sound" hotkey="KeyM">Sound</OToggle>
        <OBadge tone="accent">New</OBadge>
        <OBadge tone="danger">Expired</OBadge>
      </div>

      <div class="editor__stats">
        <OStat label="Requests">18 204</OStat>
        <OStat label="Best" tone="accent">96 ms</OStat>
        <OStat label="Errors" tone="danger">12</OStat>
      </div>

      <div class="editor__pair">
        <OCard signal="accent" class="editor__group">
          <span class="label">Your plan</span>
          <span class="number">72%</span>
          <OProgress :value="72" aria-label="Plan usage" />
        </OCard>
        <OCard signal="danger" class="editor__group">
          <span class="label">Quota runs out in</span>
          <span class="number">3 days</span>
          <OProgress :value="12" tone="danger" aria-label="Quota left" />
        </OCard>
      </div>

      <OCard class="editor__group">
        <div class="editor__row">
          <OTabs v-model="period" :items="periods" />
          <OSelect v-model="language" :items="languages" aria-label="Language" />
          <OPips :done="3" :total="5" aria-label="Steps done" />
          <OSparkline :values="[3, 5, 4, 8, 7, 11]" :width="110" :height="30" label="Rising" />
        </div>
        <div class="editor__pair">
          <OField label="Name" hint="Click it to see the focus ring">
            <OInput placeholder="Ada" />
          </OField>
          <div class="editor__group">
            <OCheckbox v-model="agree">I accept the terms</OCheckbox>
            <OSwitch v-model="live">Live updates</OSwitch>
          </div>
        </div>
        <div class="editor__pair">
          <ORadio v-model="plan" :items="plans" label="Plan" />
          <OTable :columns :rows row-key="name" :signal="(row) => (row.name === 'you' ? 'accent' : undefined)" />
        </div>
      </OCard>
    </div>
  </div>

  <div class="editor__css">
    <div class="language-css">
      <pre><code>{{ css }}</code></pre>
    </div>
    <OButton variant="soft" @click="copy">
      <component :is="copied ? Check : Copy" /> {{ copied ? 'Copied' : 'Copy the CSS' }}
    </OButton>
  </div>
</template>
