<script setup lang="ts">
import { CircleCheck, Copy, Ellipsis, PhoneCall, TriangleAlert, Undo2 } from '@lucide/vue'
import type { DropdownMenuItem } from 'oyna-ui'
import { toast } from 'oyna-ui'
import { computed, onBeforeUnmount, ref } from 'vue'

import { columns, endpoints, errorRate, events, runbook, versions } from './data'

const acknowledged = ref(false)
const resolved = ref(false)
// the step of the runbook that is open; it moves on once the rollback is done
const step = ref<(typeof runbook)[number]['value'] | undefined>('rollback')

const timeline = ref<{ title: string; time: string; text?: string; tone?: 'accent' | 'danger' }[]>([...events])

const bars = computed(() =>
  errorRate.map((value, index) => ({
    label: `−${(errorRate.length - index) * 5}m`,
    value,
    display: `${value}%`,
    tone: value > 2 ? ('danger' as const) : undefined,
  })),
)

// after the rollback the failing endpoint is back to its usual numbers
const rows = computed(() =>
  endpoints.map((row) =>
    row.failing && resolved.value
      ? { ...row, trend: [710, 560, 420, 310, 260, 230, 210], p95: '230 ms', errors: '0.4%', failing: false }
      : row,
  ),
)

const actions: DropdownMenuItem[] = [
  { label: 'Copy the link', icon: Copy, onSelect: () => toast('Link copied') },
  { label: 'Page the on-call again', icon: PhoneCall, onSelect: () => toast('Paged ada') },
]

// the rollback: a question first, then a few seconds of work, then a different page
const rollbackOpen = ref(false)
const target = ref('v1.3.9')
const rolling = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function rollBack() {
  rolling.value = true
  timer = setTimeout(() => {
    rolling.value = false
    rollbackOpen.value = false
    resolved.value = true
    step.value = 'tell'
    acknowledged.value = true
    timeline.value = [
      {
        title: `Rolled back to ${target.value}`,
        time: '14:32',
        text: 'Error rate is back under 0.5%.',
        tone: 'accent',
      },
      ...timeline.value,
    ]
    toast(`${target.value} is live again`, { tone: 'accent' })
  }, 1800)
}
onBeforeUnmount(() => clearTimeout(timer))

function reopen() {
  resolved.value = false
  step.value = 'rollback'
  acknowledged.value = false
  timeline.value = [...events]
}
</script>

<template>
  <div class="incident">
    <header class="incident__head">
      <h1>Incident 482</h1>
      <OBadge :tone="resolved ? 'accent' : 'danger'">{{ resolved ? 'Resolved' : 'Ongoing · 12 min' }}</OBadge>
      <span class="incident__spacer" />
      <OToggle v-model="acknowledged" hotkey="KeyA" :disabled="resolved">Acknowledged</OToggle>
      <ODropdownMenu :items="actions" align="end">
        <OButton icon shape="pill" aria-label="More actions"><Ellipsis /></OButton>
      </ODropdownMenu>
      <OButton v-if="resolved" @click="reopen">Start over</OButton>
      <OButton v-else variant="primary" hotkey="KeyR" @click="rollbackOpen = true"><Undo2 /> Roll back</OButton>
    </header>

    <OAlert v-if="resolved" tone="accent" :title="`Rolled back to ${target}`">
      <template #icon><CircleCheck /></template>
      Error rate is back under 0.5%. v1.4.0 is kept for a post-mortem.
    </OAlert>
    <OAlert v-else tone="danger" title="Error rate is 4.8% on GET /v1/search">
      <template #icon><TriangleAlert /></template>
      It started 12 minutes ago, after v1.4.0 went live. About one request in twenty fails.
    </OAlert>

    <section class="incident__stats">
      <OStat label="Error rate" :tone="resolved ? 'accent' : 'danger'">{{ resolved ? '0.3%' : '4.8%' }}</OStat>
      <OStat label="p95" :tone="resolved ? undefined : 'danger'">{{ resolved ? '212 ms' : '1.9 s' }}</OStat>
      <OStat label="Failed requests">2 104</OStat>
      <OStat label="Live version">{{ resolved ? target : 'v1.4.0' }}</OStat>
    </section>

    <section class="incident__main">
      <div class="incident__col">
        <OCard class="incident__col">
          <div class="incident__row">
            <span class="incident__label">Error rate, last hour</span>
            <span class="incident__note"><span class="incident__swatch" /> over 2%</span>
          </div>
          <OBarChart :items="bars" />
        </OCard>
        <OCard class="incident__col">
          <span class="incident__label">Endpoints</span>
          <div class="incident__scroll">
            <OTable :columns :rows row-key="endpoint" :signal="(row) => (row.failing ? 'danger' : undefined)">
              <template #endpoint="{ row }">
                <code>{{ row.endpoint }}</code>
                <OBadge v-if="row.failing" tone="danger">Failing</OBadge>
              </template>
              <template #trend="{ row }">
                <OSparkline
                  :values="row.trend"
                  lower-is-better
                  :tone="row.failing ? 'danger' : 'accent'"
                  :width="120"
                  :height="28"
                  :label="`Latency of ${row.endpoint} over the last hour`"
                />
              </template>
            </OTable>
          </div>
        </OCard>
      </div>

      <div class="incident__col">
        <OCard class="incident__col">
          <span class="incident__label">What happened</span>
          <OTimeline :items="timeline" />
        </OCard>
        <OCard class="incident__col">
          <span class="incident__label">Runbook</span>
          <OAccordion v-model="step" :items="runbook">
            <template #check>
              Most incidents start with a deploy. If one went live less than an hour before the errors, it is the first
              suspect: here it is v1.4.0, at 14:05.
            </template>
            <template #rollback>
              Do not debug in production. Go back to the last healthy version first (<OKbd code="KeyR">R</OKbd>), then
              find the cause in peace.
            </template>
            <template #tell
              >Post on the status page within fifteen minutes, even if all there is to say is "we are
              looking".</template
            >
            <template #after>
              Within two days: what broke, how it was noticed, what will catch it next time. No names, no blame.
            </template>
          </OAccordion>
        </OCard>
      </div>
    </section>

    <p class="incident__note"><OKbd code="KeyR">R</OKbd> roll back · <OKbd code="KeyA">A</OKbd> acknowledge</p>

    <ODialog
      v-model:open="rollbackOpen"
      title="Roll back"
      description="Production goes back to an earlier version. It takes about a minute."
    >
      <ORadio v-model="target" :items="versions" label="To version" :disabled="rolling" />
      <div class="incident__row incident__end">
        <OButton :disabled="rolling" @click="rollbackOpen = false">Keep v1.4.0</OButton>
        <OButton variant="primary" hotkey="Enter" :loading="rolling" @click="rollBack">
          {{ rolling ? 'Rolling back' : `Roll back to ${target}` }}
        </OButton>
      </div>
    </ODialog>
  </div>
</template>

<style scoped>
/* layout only: everything that looks like a component is one */
.incident,
.incident__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.incident__head,
.incident__row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.incident__row {
  justify-content: space-between;
}

.incident__end {
  justify-content: flex-end;
}

.incident__head h1 {
  margin: 0 4px 0 0;
  font: 800 44px/1 var(--o-font-display);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.incident__spacer {
  flex: 1;
}

.incident__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.incident__main {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.incident__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.incident__note {
  margin: 0;
  font-size: 12px;
  color: var(--o-text-3);
}

.incident__swatch {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--o-danger);
}

.incident__scroll {
  overflow-x: auto;
}

.incident code {
  font:
    400 13px ui-monospace,
    'SF Mono',
    Menlo,
    monospace;
}

@media (max-width: 900px) {
  .incident__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .incident__main {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
