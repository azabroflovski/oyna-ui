<script setup lang="ts">
import type { MenuItem } from 'oyna'
import { toast } from 'oyna'
import { computed, ref } from 'vue'
import { densities, languages, sections } from './options'

const name = ref('Ada Lovelace')
const handle = ref('ada')
const bio = ref('')
const language = ref('en')
const density = ref('comfortable')

const handleError = computed(() => /^[a-z0-9_]{2,16}$/.test(handle.value) ? undefined : '2–16 characters: a–z, 0–9, underscore')
const bioError = computed(() => bio.value.length > 160 ? `${bio.value.length - 160} characters too many` : undefined)

const notify = ref({ deploys: true, errors: true, digest: false, marketing: false })

const keys = ref({ search: 'Slash', deploy: 'KeyN', live: 'KeyL' })

const deleteOpen = ref(false)
const understood = ref(false)

const sessionActions: MenuItem[] = [
  { label: 'Sign out everywhere else', onSelect: () => toast('Signed out of 2 other sessions') },
  { label: 'Export my data', hint: 'JSON', onSelect: () => toast('The export will arrive by email') },
  { separator: true },
  { label: 'Delete account', tone: 'danger', onSelect: () => deleteOpen.value = true },
]

function save() {
  if (handleError.value || bioError.value) {
    toast('Fix the marked fields first', { tone: 'danger' })
    return
  }
  toast('Saved', { tone: 'accent' })
}

function remove() {
  deleteOpen.value = false
  understood.value = false
  toast('Nothing was deleted: this is an example', { tone: 'danger' })
}
</script>

<template>
  <div class="settings">
    <header class="settings__head">
      <h1>Settings</h1>
      <OMenu :items="sessionActions" align="end">
        <OButton>Account</OButton>
      </OMenu>
    </header>

    <OTabs :items="sections" variant="underline">
      <template #profile>
        <form class="settings__col" @submit.prevent="save">
          <OCard class="settings__col">
            <div class="settings__pair">
              <OField label="Name">
                <OInput v-model="name" autocomplete="name" />
              </OField>
              <OField label="Handle" hint="Shown in links to your profile" :error="handleError">
                <OInput v-model="handle" autocomplete="username" />
              </OField>
            </div>
            <OField label="About you" hint="Up to 160 characters" :error="bioError">
              <OTextarea v-model="bio" placeholder="A few words" />
            </OField>
          </OCard>

          <OCard class="settings__pair">
            <div class="settings__col">
              <span class="settings__label">Language</span>
              <!-- a wrapper, so the select keeps its own width in the column -->
              <div>
                <OSelect v-model="language" :items="languages" aria-label="Language" />
              </div>
            </div>
            <ORadio v-model="density" :items="densities" label="Density" />
          </OCard>

          <div class="settings__row">
            <OButton variant="primary" type="submit">
              Save changes
            </OButton>
            <span class="settings__note">Enter in a field saves too</span>
          </div>
        </form>
      </template>

      <template #notifications>
        <OCard class="settings__col settings__narrow">
          <OSwitch v-model="notify.deploys">
            Deploys
          </OSwitch>
          <OSwitch v-model="notify.errors">
            Error spikes
          </OSwitch>
          <OSwitch v-model="notify.digest">
            Weekly digest
          </OSwitch>
          <div class="settings__row">
            <OSwitch v-model="notify.marketing" class="settings__grow">
              Product news
            </OSwitch>
            <OPopover side="top" align="end">
              <OButton icon size="sm" shape="pill" aria-label="What is product news?">
                ?
              </OButton>
              <template #content>
                About one email a month: new features and nothing else. The other three are about your own projects.
              </template>
            </OPopover>
          </div>
        </OCard>
      </template>

      <template #keys>
        <OCard class="settings__col">
          <div class="settings__keys">
            <OKeyCapture v-model="keys.search">
              Search
            </OKeyCapture>
            <OKeyCapture v-model="keys.deploy">
              New deploy
            </OKeyCapture>
            <OKeyCapture v-model="keys.live">
              Live updates
            </OKeyCapture>
          </div>
          <span class="settings__note">Click a key, then press the new one. <OKbd>Esc</OKbd> cancels.</span>
        </OCard>
      </template>
    </OTabs>

    <ODialog v-model:open="deleteOpen" title="Delete account" description="Projects, deploys and history go with it. This cannot be undone.">
      <OCheckbox v-model="understood">
        I understand that everything will be deleted
      </OCheckbox>
      <div class="settings__row settings__end">
        <OButton @click="deleteOpen = false">
          Keep it
        </OButton>
        <OButton variant="primary" :disabled="!understood" @click="remove">
          Delete
        </OButton>
      </div>
    </ODialog>
  </div>
</template>

<style scoped>
/* layout only: everything that looks like a component is one */
.settings {
  max-width: 760px;
}

.settings,
.settings__col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.settings__head,
.settings__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.settings__head {
  justify-content: space-between;
}

.settings__end {
  justify-content: flex-end;
}

.settings__head h1 {
  margin: 0;
  font: 800 44px/1 var(--o-font-display);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.settings__pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.settings__narrow {
  max-width: 420px;
}

.settings__grow {
  flex: 1;
}

.settings__keys {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.settings__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--o-text-3);
}

.settings__note {
  font-size: 12px;
  color: var(--o-text-3);
}

@media (max-width: 640px) {
  .settings__pair {
    grid-template-columns: 1fr;
  }
}
</style>
