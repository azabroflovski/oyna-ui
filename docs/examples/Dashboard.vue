<script setup lang="ts">
import { toast } from 'oyna'
import { computed, ref } from 'vue'

type Period = 'today' | 'week' | 'month'

const periods = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
] as const
const projects = [
  { value: 'api', label: 'Public API', hint: 'prod' },
  { value: 'web', label: 'Web app', hint: 'prod' },
  { value: 'jobs', label: 'Workers', hint: 'staging' },
]
const environments = [
  { value: 'production', label: 'Production' },
  { value: 'staging', label: 'Staging' },
]

const period = ref<Period>('week')
const project = ref('api')
const live = ref(true)

const data = {
  today: {
    stats: { requests: '18 204', median: '142 ms', errors: '12', uptime: '100%' },
    bars: [['00', 310], ['04', 180], ['08', 920], ['12', 1480], ['16', 1310], ['20', 760]],
    worst: '12',
  },
  week: {
    stats: { requests: '131 590', median: '151 ms', errors: '96', uptime: '99.98%' },
    bars: [['Mon', 17200], ['Tue', 18900], ['Wed', 24100], ['Thu', 19400], ['Fri', 20800], ['Sat', 15300], ['Sun', 15890]],
    worst: 'Wed',
  },
  month: {
    stats: { requests: '548 310', median: '149 ms', errors: '402', uptime: '99.95%' },
    bars: [['W1', 121000], ['W2', 139500], ['W3', 156210], ['W4', 131600]],
    worst: 'W3',
  },
} as const

const current = computed(() => data[period.value])
const bars = computed(() => current.value.bars.map(([label, value]) => ({
  label,
  value,
  display: value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value),
  tone: label === current.value.worst ? 'danger' as const : undefined,
})))

const columns = [
  { key: 'endpoint', label: 'Endpoint' },
  { key: 'trend', label: 'Latency, 24 h' },
  { key: 'p95', label: 'p95', numeric: true },
  { key: 'errors', label: 'Errors', numeric: true },
] as const
const endpoints = [
  { endpoint: 'GET /v1/items', trend: [120, 124, 118, 131, 127, 122, 119], p95: '212 ms', errors: '0.1%', failing: false },
  { endpoint: 'POST /v1/items', trend: [180, 176, 190, 185, 181, 179, 174], p95: '340 ms', errors: '0.3%', failing: false },
  { endpoint: 'GET /v1/search', trend: [210, 230, 260, 310, 420, 560, 710], p95: '1.9 s', errors: '4.8%', failing: true },
  { endpoint: 'GET /v1/health', trend: [12, 11, 12, 13, 11, 12, 11], p95: '19 ms', errors: '0%', failing: false },
]

const deployOpen = ref(false)
const version = ref('')
const environment = ref('staging')
const versionError = computed(() => version.value && !/^\d+\.\d+\.\d+$/.test(version.value) ? 'Use three numbers: 1.4.0' : undefined)

function deploy() {
  if (!version.value || versionError.value)
    return
  deployOpen.value = false
  toast(`Deploying ${version.value} to ${environment.value}`, { tone: 'accent' })
  version.value = ''
}
</script>

<template>
  <div class="dash">
    <header class="dash__head">
      <h1>Overview</h1>
      <OSelect v-model="project" :items="projects" aria-label="Project" />
      <OTabs v-model="period" :items="periods" />
      <span class="dash__spacer" />
      <OToggle v-model="live" hotkey="KeyL">
        Live
      </OToggle>
      <OButton variant="primary" hotkey="KeyN" @click="deployOpen = true">
        New deploy
      </OButton>
    </header>

    <section class="dash__stats">
      <OStat label="Requests">
        {{ current.stats.requests }}
      </OStat>
      <OStat label="Median">
        {{ current.stats.median }}
      </OStat>
      <OStat label="Errors" tone="danger">
        {{ current.stats.errors }}
      </OStat>
      <OStat label="Uptime" tone="accent">
        {{ current.stats.uptime }}
      </OStat>
    </section>

    <section class="dash__main">
      <OCard class="dash__col">
        <div class="dash__row">
          <span class="dash__label">Requests</span>
          <span class="dash__note"><span class="dash__swatch" /> busiest</span>
        </div>
        <OBarChart :items="bars" />
      </OCard>

      <div class="dash__col">
        <OCard signal="accent" class="dash__col">
          <div class="dash__row">
            <span class="dash__label">Your plan</span>
            <OBadge>Pro</OBadge>
          </div>
          <div class="dash__row">
            <span class="dash__number">72%</span>
            <OButton variant="soft" @click="toast('Nothing to upgrade to in an example')">
              Upgrade
            </OButton>
          </div>
          <OProgress :value="72" aria-label="Plan usage" />
        </OCard>
        <OCard signal="danger" class="dash__col">
          <span class="dash__label">Quota runs out in</span>
          <span class="dash__number dash__number--small">3 days</span>
          <OProgress :value="12" tone="danger" aria-label="Quota left" />
        </OCard>
        <OCard class="dash__col">
          <span class="dash__label">Setup</span>
          <OPips :done="3" :total="5" aria-label="Setup steps done" />
          <span class="dash__note">3 of 5 · next: add a webhook</span>
        </OCard>
      </div>
    </section>

    <OCard class="dash__col">
      <span class="dash__label">Endpoints</span>
      <div class="dash__scroll">
        <OTable :columns :rows="endpoints" row-key="endpoint" :signal="row => row.failing ? 'danger' : undefined">
          <template #endpoint="{ row }">
            <code>{{ row.endpoint }}</code> <OBadge v-if="row.failing" tone="danger">
              Degraded
            </OBadge>
          </template>
          <template #trend="{ row }">
            <OSparkline :values="row.trend" lower-is-better :tone="row.failing ? 'danger' : 'accent'" :width="120" :height="28" :label="`Latency of ${row.endpoint} over 24 hours`" />
          </template>
        </OTable>
      </div>
    </OCard>

    <p class="dash__note">
      <OKbd>N</OKbd> new deploy · <OKbd>L</OKbd> live updates · <OKbd>Esc</OKbd> closes the dialog
    </p>

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

.dash__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
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
