<script setup lang="ts">
import { Rocket } from '@lucide/vue'
import { toast } from 'oyna'
import { computed, onBeforeUnmount, ref } from 'vue'

/** The panel on the home page: one small product screen instead of a pile of unrelated components. */
const environments = [
  { value: 'production', label: 'Production' },
  { value: 'staging', label: 'Staging' },
] as const
const projects = [
  { value: 'api', label: 'Public API', hint: 'api' },
  { value: 'web', label: 'Web app', hint: 'web' },
]
const steps = ['Build', 'Test', 'Ship'] as const

const stats = {
  production: { requests: '131.6k', p95: '212 ms', errors: '0.3%' },
  staging: { requests: '4.2k', p95: '388 ms', errors: '2.1%' },
}

const environment = ref<'production' | 'staging'>('production')
const project = ref('api')
const live = ref(true)

const patch = ref(1)
const next = computed(() => `v1.4.${patch.value}`)
const deploys = ref([
  { version: 'v1.4.0', when: '2 h ago', status: 'Live' },
  { version: 'v1.3.9', when: 'yesterday', status: 'Replaced' },
  { version: 'v1.3.8', when: '3 days ago', status: 'Failed' },
])
const columns = [
  { key: 'version', label: 'Version' },
  { key: 'when', label: 'When' },
  { key: 'status', label: 'Status' },
] as const

/** How far the running deploy is, in percent; `undefined` when nothing runs. */
const progress = ref<number>()
const step = computed(() => (progress.value === undefined ? 0 : Math.min(3, Math.floor(progress.value / 34) + 1)))
let timer: ReturnType<typeof setInterval> | undefined

function deploy() {
  if (progress.value !== undefined) return
  progress.value = 0
  timer = setInterval(() => {
    progress.value = Math.min(100, progress.value! + 4)
    if (progress.value < 100) return
    clearInterval(timer)
    progress.value = undefined
    for (const row of deploys.value) if (row.status === 'Live') row.status = 'Replaced'
    deploys.value = [{ version: next.value, when: 'just now', status: 'Live' }, ...deploys.value.slice(0, 2)]
    toast(`${next.value} is live on ${environment.value}`, { tone: 'accent' })
    patch.value++
  }, 100)
}
onBeforeUnmount(() => clearInterval(timer))

const tone = (status: unknown) => (status === 'Live' ? 'accent' : status === 'Failed' ? 'danger' : undefined)
</script>

<template>
  <OSurface class="demo-panel">
    <div class="row between">
      <div class="row">
        <OSelect v-model="project" :items="projects" aria-label="Project" />
        <OTabs v-model="environment" :items="environments" />
      </div>
      <OToggle v-model="live" hotkey="KeyL">Live</OToggle>
    </div>

    <OCard signal="accent" class="col">
      <div class="row between">
        <span class="label">Next release</span>
        <OBadge>3 commits · main</OBadge>
      </div>
      <div class="row between">
        <span class="number">{{ next }}</span>
        <OButton variant="primary" hotkey="KeyD" :loading="progress !== undefined" @click="deploy">
          <Rocket v-if="progress === undefined" /> {{ progress === undefined ? 'Deploy' : steps[step - 1] }}
        </OButton>
      </div>
      <OProgress :value="progress ?? 0" aria-label="Deploy progress" />
      <div class="row between">
        <OPips :done="step" :total="3" aria-label="Deploy steps done" />
        <span class="hint">{{ progress === undefined ? 'Build · Test · Ship' : `${steps[step - 1]}…` }}</span>
      </div>
    </OCard>

    <div class="demo-panel__stats">
      <OStat label="Requests">{{ stats[environment].requests }}</OStat>
      <OStat label="p95">{{ stats[environment].p95 }}</OStat>
      <OStat label="Errors" :tone="environment === 'staging' ? 'danger' : undefined">
        {{ stats[environment].errors }}
      </OStat>
    </div>

    <OTable :columns :rows="deploys" row-key="version">
      <template #version="{ value }">
        <code>{{ value }}</code>
      </template>
      <template #status="{ value }">
        <OBadge :tone="tone(value)">{{ value }}</OBadge>
      </template>
    </OTable>

    <span class="hint">
      <OKbd>D</OKbd> deploys · <OKbd>L</OKbd> live updates · <OKbd>/</OKbd> search · <OKbd>Enter</OKbd> get started.
      Keys work on any keyboard layout.
    </span>
  </OSurface>
</template>
