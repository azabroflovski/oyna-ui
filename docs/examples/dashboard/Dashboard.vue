<script setup lang="ts">
import { ArrowRight, Command, FolderOpen, Radio, Rocket, Settings, Siren, TriangleAlert } from '@lucide/vue'
import type { CommandItem } from 'oyna-ui'
import { toast } from 'oyna-ui'
import { useRouter, withBase } from 'vitepress'
import { computed, onBeforeUnmount, ref, watch } from 'vue'

import type { Period } from './data'
import { activity, columns, data, endpoints, environments, periods, projects } from './data'

const period = ref<Period>('week')
const project = ref('api')
const live = ref(true)
const alertShown = ref(true)

// a new period takes a moment to "load": the numbers give way to skeletons of their own size
const loading = ref(false)
let loadTimer: ReturnType<typeof setTimeout> | undefined
watch(period, () => {
  loading.value = true
  clearTimeout(loadTimer)
  loadTimer = setTimeout(() => (loading.value = false), 600)
})
onBeforeUnmount(() => clearTimeout(loadTimer))

const current = computed(() => data[period.value])
const bars = computed(() =>
  current.value.bars.map(([label, value]) => ({
    label,
    value,
    display: value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value),
    tone: label === current.value.worst ? ('danger' as const) : undefined,
  })),
)

const deployOpen = ref(false)
const version = ref('')
const environment = ref('staging')
const versionError = computed(() =>
  version.value && !/^\d+\.\d+\.\d+$/.test(version.value) ? 'Use three numbers: 1.4.0' : undefined,
)

function deploy() {
  if (!version.value || versionError.value) return
  deployOpen.value = false
  toast(`Deploying ${version.value} to ${environment.value}`, { tone: 'accent' })
  version.value = ''
}

// everything this screen can do, one key away
const router = useRouter()
const commandsOpen = ref(false)
const commands = computed<CommandItem[]>(() => [
  { value: 'deploy', label: 'New deploy', group: 'Actions', icon: Rocket, hint: 'N' },
  {
    value: 'live',
    label: live.value ? 'Pause live updates' : 'Resume live updates',
    group: 'Actions',
    icon: Radio,
    hint: 'L',
    keywords: 'live updates',
  },
  ...periods.map((item) => ({
    value: `period:${item.value}`,
    label: `Show ${item.label.toLowerCase()}`,
    group: 'Period',
    disabled: item.value === period.value,
    hint: item.value === period.value ? 'shown' : undefined,
  })),
  { value: '/examples/incident', label: 'Incident 482', group: 'Go to', icon: Siren, keywords: 'search degraded' },
  { value: '/examples/projects', label: 'Projects', group: 'Go to', icon: FolderOpen },
  { value: '/examples/settings', label: 'Settings', group: 'Go to', icon: Settings, keywords: 'profile team tokens' },
])

function run({ value }: CommandItem) {
  if (value === 'deploy') deployOpen.value = true
  else if (value === 'live') live.value = !live.value
  else if (value.startsWith('period:')) period.value = value.slice(7) as Period
  else router.go(withBase(value))
}
</script>

<template>
  <div class="dash">
    <header class="dash__head">
      <h1>Overview</h1>
      <OSelect v-model="project" :items="projects" aria-label="Project" />
      <OTabs v-model="period" :items="periods" />
      <span class="dash__spacer" />
      <OButton hotkey="KeyK" @click="commandsOpen = true"><Command /> Commands</OButton>
      <OToggle v-model="live" hotkey="KeyL"> Live </OToggle>
      <OButton variant="primary" hotkey="KeyN" @click="deployOpen = true"> New deploy </OButton>
    </header>

    <OAlert v-if="alertShown" tone="danger" title="GET /v1/search is degraded" closable @close="alertShown = false">
      <template #icon><TriangleAlert /></template>
      p95 is 1.9 s, nine times the usual. It started after v1.4.0 went live.
      <template #actions>
        <OButton size="sm" :href="withBase('/examples/incident')">Open the incident</OButton>
      </template>
    </OAlert>

    <section class="dash__stats" :aria-busy="loading">
      <OStat label="Requests">
        <OSkeleton v-if="loading" class="dash__loading" />
        <template v-else>{{ current.stats.requests }}</template>
      </OStat>
      <OStat label="Median">
        <OSkeleton v-if="loading" class="dash__loading" />
        <template v-else>{{ current.stats.median }}</template>
      </OStat>
      <OStat label="Errors" tone="danger">
        <OSkeleton v-if="loading" class="dash__loading" />
        <template v-else>{{ current.stats.errors }}</template>
      </OStat>
      <OStat label="Uptime" tone="accent">
        <OSkeleton v-if="loading" class="dash__loading" />
        <template v-else>{{ current.stats.uptime }}</template>
      </OStat>
    </section>

    <section class="dash__main">
      <OCard label="Requests" class="dash__col">
        <template #actions>
          <span class="dash__note"><span class="dash__swatch" /> busiest</span>
        </template>
        <OBarChart :items="bars" />
      </OCard>

      <div class="dash__col">
        <OCard signal="accent" label="Your plan" class="dash__col">
          <template #actions>
            <OBadge>Pro</OBadge>
          </template>
          <div class="dash__row">
            <span class="dash__number">72%</span>
            <OButton variant="soft" @click="toast('Nothing to upgrade to in an example')"> Upgrade </OButton>
          </div>
          <OProgress :value="72" aria-label="Plan usage" />
        </OCard>
        <OCard signal="danger" label="Quota runs out in" class="dash__col">
          <span class="dash__number dash__number--small">3 days</span>
          <OProgress :value="12" tone="danger" aria-label="Quota left" />
        </OCard>
        <OCard label="Activity">
          <OTimeline :items="activity" />
          <template #footer>
            <OButton variant="link" :href="withBase('/examples/incident')">Open the incident <ArrowRight /></OButton>
          </template>
        </OCard>
      </div>
    </section>

    <OCard label="Endpoints">
      <div class="dash__scroll">
        <OTable :columns :rows="endpoints" row-key="endpoint" :signal="(row) => (row.failing ? 'danger' : undefined)">
          <template #endpoint="{ row }">
            <code>{{ row.endpoint }}</code> <OBadge v-if="row.failing" tone="danger"> Degraded </OBadge>
          </template>
          <template #trend="{ row }">
            <OSparkline
              :values="row.trend"
              lower-is-better
              :tone="row.failing ? 'danger' : 'accent'"
              :width="120"
              :height="28"
              :label="`Latency of ${row.endpoint} over 24 hours`"
            />
          </template>
        </OTable>
      </div>
    </OCard>

    <p class="dash__note">
      <OKbd code="KeyK">K</OKbd> commands · <OKbd code="KeyN">N</OKbd> new deploy · <OKbd code="KeyL">L</OKbd> live
      updates · <OKbd code="Escape">Esc</OKbd> closes the dialog
    </p>

    <OCommand v-model:open="commandsOpen" :items="commands" @select="run" />

    <ODialog v-model:open="deployOpen" title="New deploy" description="Ships a version to one environment.">
      <OField label="Version" hint="For example 1.4.0" :error="versionError">
        <OInput v-model="version" placeholder="1.4.0" />
      </OField>
      <div class="dash__row">
        <OSelect v-model="environment" :items="environments" aria-label="Environment" />
        <OButton variant="primary" hotkey="Enter" :disabled="!version || !!versionError" @click="deploy">
          Deploy
        </OButton>
      </div>
    </ODialog>
  </div>
</template>

<style scoped>
/* layout only: everything that looks like a component is one */
.dash,
.dash__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dash__head,
.dash__row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.dash__row {
  justify-content: space-between;
}

.dash__head h1 {
  margin: 0 8px 0 0;
  font: 800 44px/1 var(--o-font-display);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.dash__spacer {
  flex: 1;
}

.dash__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.dash__main {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 12px;
}

.dash__note {
  margin: 0;
  font-size: 12px;
  color: var(--o-text-3);
}

.dash__swatch {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--o-danger);
}

.dash__number {
  font: 700 56px/1 var(--o-font-display);
}

.dash__number--small {
  font-size: 34px;
}

/* as tall as the number it stands for, so the tile does not jump */
.dash__loading {
  width: 70%;
  height: 28px;
}

.dash__scroll {
  overflow-x: auto;
}

.dash code {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 13px;
}

/* the chart takes what is left of its card, next to a taller column */
.dash :deep(.o-bar-chart) {
  flex: 1;
  height: auto;
  min-height: 260px;
}

@media (max-width: 900px) {
  .dash__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dash__main {
    grid-template-columns: 1fr;
  }
}
</style>
