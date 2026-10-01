<script setup lang="ts">
import {
  Archive,
  ArchiveRestore,
  Ellipsis,
  FolderOpen,
  Info,
  ListFilter,
  Plus,
  RefreshCw,
  SearchX,
  Trash2,
} from '@lucide/vue'
import type { MenuItem } from 'oyna'
import { toast } from 'oyna'
import { computed, onBeforeUnmount, ref } from 'vue'

import type { Project } from './data'
import { columns, initial, regions, tabs } from './data'

const projects = ref<Project[]>(initial.map((project) => ({ ...project })))

const tab = ref<'active' | 'archived'>('active')
const query = ref('')
const onlyFailing = ref(false)

const inTab = computed(() => projects.value.filter((project) => project.archived === (tab.value === 'archived')))
const shown = computed(() =>
  inTab.value.filter(
    (project) => project.name.includes(query.value.trim().toLowerCase()) && (!onlyFailing.value || project.failing),
  ),
)
// the plan allows so many active projects; the note about it is information, not a warning
const limit = 6
const active = computed(() => projects.value.filter((project) => !project.archived).length)
const noteShown = ref(true)

const filtered = computed(() => query.value.trim() !== '' || onlyFailing.value)

function clearFilters() {
  query.value = ''
  onlyFailing.value = false
}

/** The actions of one row: an archived project can only come back or be deleted. */
function actionsOf(project: Project): MenuItem[] {
  return [
    project.archived
      ? { label: 'Restore', icon: ArchiveRestore, onSelect: () => setArchived(project, false) }
      : { label: 'Archive', icon: Archive, onSelect: () => setArchived(project, true) },
    { separator: true },
    { label: 'Delete', icon: Trash2, tone: 'danger', onSelect: () => (deleting.value = project) },
  ]
}

function setArchived(project: Project, archived: boolean) {
  project.archived = archived
  toast(archived ? `${project.name} archived` : `${project.name} restored`)
}

// deleting asks first
const deleting = ref<Project>()
function remove() {
  const project = deleting.value!
  projects.value = projects.value.filter((other) => other !== project)
  deleting.value = undefined
  toast(`${project.name} deleted`, { tone: 'danger' })
}

// a refresh "takes" a moment: rows give way to skeletons
const loading = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
function refresh() {
  loading.value = true
  timer = setTimeout(() => (loading.value = false), 900)
}
onBeforeUnmount(() => clearTimeout(timer))

// a new project
const creating = ref(false)
const name = ref('')
const region = ref('Frankfurt')
const nameError = computed(() => {
  if (!name.value) return undefined
  if (!/^[a-z][a-z0-9-]{1,23}$/.test(name.value)) return 'Lowercase letters, digits and dashes; 2–24 characters'
  if (projects.value.some((project) => project.name === name.value)) return 'This name is taken'
  return undefined
})

function create() {
  if (!name.value || nameError.value) return
  projects.value = [
    {
      name: name.value,
      region: region.value,
      deployed: 'never',
      requests: [0, 0, 0, 0, 0, 0, 0],
      failing: false,
      archived: false,
    },
    ...projects.value,
  ]
  toast(`${name.value} created`, { tone: 'accent' })
  creating.value = false
  name.value = ''
  tab.value = 'active'
  clearFilters()
}
</script>

<template>
  <div class="projects">
    <header class="projects__head">
      <h1>Projects</h1>
      <OTabs v-model="tab" :items="tabs" />
      <span class="projects__spacer" />
      <OButton variant="primary" hotkey="KeyN" :disabled="active >= limit" @click="creating = true">
        <Plus /> New project
      </OButton>
    </header>

    <OAlert
      v-if="noteShown"
      :title="`${active} of ${limit} projects on the Pro plan`"
      closable
      @close="noteShown = false"
    >
      <template #icon><Info /></template>
      {{
        active < limit
          ? 'Archived projects do not count. Archive one you no longer deploy to make room.'
          : 'That is the limit. Archive a project to make room for a new one.'
      }}
    </OAlert>

    <div class="projects__tools">
      <OInput v-model="query" class="projects__search" placeholder="Filter by name" aria-label="Filter by name" />
      <OPopover align="end">
        <OButton :variant="onlyFailing ? 'soft' : 'secondary'"><ListFilter /> Filters</OButton>
        <template #content>
          <OSwitch v-model="onlyFailing">Only failing</OSwitch>
        </template>
      </OPopover>
      <OTooltip text="Refresh">
        <OButton icon aria-label="Refresh" :loading @click="refresh"><RefreshCw v-if="!loading" /></OButton>
      </OTooltip>
    </div>

    <div v-if="filtered" class="projects__tools">
      <span class="projects__note">Filtered by</span>
      <OTag v-if="query.trim()" removable remove-label="Remove the name filter" @remove="query = ''">
        name: {{ query.trim() }}
      </OTag>
      <OTag
        v-if="onlyFailing"
        tone="danger"
        removable
        remove-label="Remove the failing filter"
        @remove="onlyFailing = false"
      >
        failing
      </OTag>
    </div>

    <OCard class="projects__list" :aria-busy="loading">
      <div v-if="loading" class="projects__loading">
        <OSkeleton v-for="row in 4" :key="row" class="projects__skeleton" />
      </div>

      <OTable
        v-else-if="shown.length"
        :columns
        :rows="shown"
        row-key="name"
        :signal="(row) => (row.failing ? 'danger' : undefined)"
      >
        <template #name="{ row }">
          <code>{{ row.name }}</code> <OBadge v-if="row.failing" tone="danger">Failing</OBadge>
        </template>
        <template #requests="{ row }">
          <OSparkline
            :values="row.requests"
            :tone="row.failing ? 'danger' : 'accent'"
            :width="110"
            :height="26"
            :label="`Requests of ${row.name} over 7 days`"
          />
        </template>
        <template #actions="{ row }">
          <OMenu :items="actionsOf(row)" align="end">
            <OButton icon size="sm" variant="ghost" :aria-label="`Actions for ${row.name}`"><Ellipsis /></OButton>
          </OMenu>
        </template>
      </OTable>

      <OEmpty v-else-if="filtered" title="Nothing found">
        <template #icon><SearchX /></template>
        No {{ tab }} project matches the filter.
        <template #actions>
          <OButton @click="clearFilters">Clear the filter</OButton>
        </template>
      </OEmpty>

      <OEmpty v-else-if="tab === 'archived'" title="Nothing archived">
        <template #icon><Archive /></template>
        Archive a project from its menu and it will rest here, out of the way.
      </OEmpty>

      <OEmpty v-else title="No projects yet">
        <template #icon><FolderOpen /></template>
        A project is one service with its deploys and its numbers.
        <template #actions>
          <OButton variant="primary" @click="creating = true"><Plus /> New project</OButton>
        </template>
      </OEmpty>
    </OCard>

    <p class="projects__note">
      <OKbd code="KeyN">N</OKbd> new project · try a filter that matches nothing, archive a project, or delete them all
    </p>

    <ODialog v-model:open="creating" title="New project" description="One service with its deploys and its numbers.">
      <OField label="Name" hint="Lowercase letters, digits and dashes" :error="nameError">
        <OInput v-model="name" placeholder="search-api" autocomplete="off" />
      </OField>
      <div class="projects__row">
        <OSelect v-model="region" :items="regions" aria-label="Region" />
        <OButton variant="primary" hotkey="Enter" :disabled="!name || !!nameError" @click="create">Create</OButton>
      </div>
    </ODialog>

    <ODialog
      :open="!!deleting"
      title="Delete project"
      :description="`${deleting?.name} and all its deploys will be gone. This cannot be undone.`"
      @update:open="deleting = undefined"
    >
      <div class="projects__row projects__end">
        <OButton @click="deleting = undefined">Keep it</OButton>
        <OButton variant="primary" hotkey="Enter" @click="remove">Delete</OButton>
      </div>
    </ODialog>
  </div>
</template>

<style scoped>
/* layout only: everything that looks like a component is one */
.projects {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.projects__head,
.projects__tools,
.projects__row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.projects__row {
  justify-content: space-between;
}

.projects__end {
  justify-content: flex-end;
}

.projects__head h1 {
  margin: 0 8px 0 0;
  font: 800 44px/1 var(--o-font-display);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.projects__spacer {
  flex: 1;
}

.projects__search {
  flex: 1;
  min-width: 180px;
  max-width: 360px;
}

.projects__list {
  min-height: 260px;
  overflow-x: auto;
}

.projects__loading {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 34px;
}

/* as tall as a table row, so the list does not jump when the rows come back */
.projects__skeleton {
  height: 46px;
}

.projects__note {
  margin: 0;
  font-size: 12px;
  color: var(--o-text-3);
}

.projects code {
  font:
    400 13px ui-monospace,
    'SF Mono',
    Menlo,
    monospace;
}
</style>
