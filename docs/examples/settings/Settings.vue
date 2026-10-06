<script setup lang="ts">
import { Copy, Ellipsis, Info, KeyRound, MailCheck, RotateCcw, Trash2, TriangleAlert, UserPlus } from '@lucide/vue'
import type { DropdownMenuItem } from 'oyna-ui'
import { hotkeyLabel, toast } from 'oyna-ui'
import { computed, reactive, ref } from 'vue'

import type { Member, Token } from './options'
import {
  actionNames,
  defaultKeys,
  densities,
  languages,
  memberColumns,
  members as initialMembers,
  roles,
  sections,
  tokenColumns,
  tokens as initialTokens,
  zones,
} from './options'

// --- profile: a form that knows when it differs from what is saved
const saved = ref({
  name: 'Ada Lovelace',
  handle: 'ada',
  bio: '',
  language: 'en',
  zone: 'Asia/Tashkent',
  density: 'comfortable',
})
const form = reactive({ ...saved.value })
const dirty = computed(() => JSON.stringify(form) !== JSON.stringify(saved.value))

const handleError = computed(() =>
  /^[a-z0-9_]{2,16}$/.test(form.handle) ? undefined : '2–16 characters: a–z, 0–9, underscore',
)
const bioError = computed(() => (form.bio.length > 160 ? `${form.bio.length - 160} characters too many` : undefined))

function save() {
  if (handleError.value || bioError.value) {
    toast('Fix the marked fields first', { tone: 'danger' })
    return
  }
  saved.value = { ...form }
  toast('Saved', { tone: 'accent' })
}

// --- team
const members = ref<Member[]>(initialMembers.map((member) => ({ ...member })))

const inviting = ref(false)
const inviteEmail = ref('')
const inviteRole = ref('developer')
const inviteError = computed(() => {
  if (!inviteEmail.value) return undefined
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.value)) return 'This does not look like an email'
  if (members.value.some((member) => member.email === inviteEmail.value)) return 'Already in the team'
  return undefined
})

function invite() {
  if (!inviteEmail.value || inviteError.value) return
  const email = inviteEmail.value
  members.value = [...members.value, { name: email.split('@')[0]!, email, role: inviteRole.value, invited: true }]
  toast(`Invitation sent to ${email}`, { tone: 'accent' })
  inviting.value = false
  inviteEmail.value = ''
}

function memberActions(member: Member): DropdownMenuItem[] {
  return [
    ...(member.invited
      ? [{ label: 'Send the invitation again', icon: MailCheck, onSelect: () => toast(`Sent to ${member.email}`) }]
      : []),
    {
      label: member.invited ? 'Cancel the invitation' : 'Remove from the team',
      icon: Trash2,
      tone: 'danger',
      // you cannot remove yourself: someone has to stay
      disabled: member.you,
      onSelect: () => {
        members.value = members.value.filter((other) => other !== member)
        toast(`${member.name} removed`)
      },
    },
  ]
}

// --- API tokens: a new one is shown in full exactly once
const tokens = ref<Token[]>(initialTokens.map((token) => ({ ...token })))

const creating = ref(false)
const tokenName = ref('')
const canRead = ref(true)
const canDeploy = ref(false)
const tokenError = computed(() =>
  tokens.value.some((token) => token.name === tokenName.value) ? 'A token with this name exists' : undefined,
)
const fresh = ref<{ name: string; value: string }>()

function createToken() {
  if (!tokenName.value || tokenError.value) return
  const secret = Array.from(crypto.getRandomValues(new Uint8Array(12)), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
  const value = `oy_live_${secret}`
  tokens.value = [
    {
      name: tokenName.value,
      prefix: value.slice(0, 12),
      scopes: ['read', ...(canDeploy.value ? ['deploy'] : [])],
      used: 'never',
    },
    ...tokens.value,
  ]
  fresh.value = { name: tokenName.value, value }
  creating.value = false
  tokenName.value = ''
  canDeploy.value = false
}

async function copyToken() {
  await navigator.clipboard.writeText(fresh.value!.value)
  toast('Token copied', { tone: 'accent' })
}

const revoking = ref<Token>()
function revoke() {
  const token = revoking.value!
  tokens.value = tokens.value.filter((other) => other !== token)
  if (fresh.value?.name === token.name) fresh.value = undefined
  revoking.value = undefined
  toast(`${token.name} revoked`, { tone: 'danger' })
}

// --- notifications
const notify = ref({ deploys: true, errors: true, digest: false, marketing: false })
// an error spike is a rate over this many percent
const threshold = ref(5)
const emailConfirmed = ref(false)

// confirming the email: a code that checks itself when the last digit is in
const confirming = ref(false)
const code = ref('')
const codeWrong = ref(false)
function checkCode(value: string) {
  codeWrong.value = value !== '123456'
  if (codeWrong.value) return
  confirming.value = false
  emailConfirmed.value = true
  code.value = ''
  toast('ada@example.com is confirmed', { tone: 'accent' })
}

// --- keys: two actions on one key is a mistake worth saying out loud
const keys = ref({ ...defaultKeys })
const clash = computed(() => {
  const names = Object.keys(keys.value) as (keyof typeof defaultKeys)[]
  for (const first of names)
    for (const second of names)
      if (first < second && keys.value[first] === keys.value[second])
        return { key: hotkeyLabel(keys.value[first]), actions: [actionNames[first], actionNames[second]] }
  return undefined
})
const keysChanged = computed(() => JSON.stringify(keys.value) !== JSON.stringify(defaultKeys))

// --- the account menu
const deleteOpen = ref(false)
const understood = ref(false)

const accountActions: DropdownMenuItem[] = [
  { label: 'Sign out everywhere else', onSelect: () => toast('Signed out of 2 other sessions') },
  { label: 'Export my data', hint: 'JSON', onSelect: () => toast('The export will arrive by email') },
  { separator: true },
  { label: 'Delete account', tone: 'danger', onSelect: () => (deleteOpen.value = true) },
]

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
      <ODropdownMenu :items="accountActions" align="end">
        <OButton>Account</OButton>
      </ODropdownMenu>
    </header>

    <OTabs :items="sections" variant="underline">
      <template #profile>
        <form class="settings__col" @submit.prevent="save">
          <OAlert v-if="dirty" title="You have unsaved changes">
            <template #icon><Info /></template>
            They are kept while this page is open.
            <template #actions>
              <OButton size="sm" variant="primary" type="submit">Save changes</OButton>
              <OButton size="sm" variant="ghost" @click="Object.assign(form, saved)">Discard</OButton>
            </template>
          </OAlert>

          <OCard class="settings__col">
            <div class="settings__pair">
              <OField label="Name">
                <OInput v-model="form.name" autocomplete="name" />
              </OField>
              <OField label="Handle" hint="Shown in links to your profile" :error="handleError">
                <OInput v-model="form.handle" autocomplete="username" />
              </OField>
            </div>
            <OField label="About you" hint="Up to 160 characters" :error="bioError">
              <OTextarea v-model="form.bio" placeholder="A few words" />
            </OField>
          </OCard>

          <OCard class="settings__pair">
            <div class="settings__col">
              <OField label="Language">
                <OSelect v-model="form.language" :items="languages" />
              </OField>
              <OField label="Time zone" hint="Type a city to find it">
                <OCombobox v-model="form.zone" :items="zones" />
              </OField>
            </div>
            <ORadio v-model="form.density" :items="densities" label="Density" />
          </OCard>

          <div class="settings__row">
            <OButton variant="primary" type="submit" :disabled="!dirty">Save changes</OButton>
            <span class="settings__note">{{ dirty ? 'Enter in a field saves too' : 'Nothing to save' }}</span>
          </div>
        </form>
      </template>

      <template #team>
        <div class="settings__col">
          <div class="settings__row settings__between">
            <span class="settings__note">{{ members.length }} of 10 seats on the Pro plan</span>
            <OButton variant="primary" hotkey="KeyI" @click="inviting = true"><UserPlus /> Invite</OButton>
          </div>
          <OCard class="settings__scroll">
            <OTable
              :columns="memberColumns"
              :rows="members"
              row-key="email"
              :signal="(row) => (row.you ? 'accent' : undefined)"
              :row-menu="memberActions"
              hoverable
            >
              <template #name="{ row }">
                <div class="settings__member">
                  <OAvatar :name="row.name" />
                  <div class="settings__person">
                    <span>
                      <b>{{ row.name }}</b>
                      <OBadge v-if="row.you" tone="accent">You</OBadge>
                      <OBadge v-else-if="row.invited">Invited</OBadge>
                    </span>
                    <span class="settings__note">{{ row.email }}</span>
                  </div>
                </div>
              </template>
              <template #role="{ row }">
                <OSelect v-model="row.role" :items="roles" :disabled="row.you" :aria-label="`Role of ${row.name}`" />
              </template>
              <template #actions="{ row }">
                <ODropdownMenu :items="memberActions(row)" align="end">
                  <OButton icon size="sm" variant="ghost" :aria-label="`Actions for ${row.name}`"><Ellipsis /></OButton>
                </ODropdownMenu>
              </template>
            </OTable>
          </OCard>
        </div>
      </template>

      <template #tokens>
        <div class="settings__col">
          <OAlert
            v-if="fresh"
            tone="accent"
            :title="`Token “${fresh.name}” is ready`"
            closable
            @close="fresh = undefined"
          >
            <template #icon><KeyRound /></template>
            Copy it now: it is shown this one time.
            <code class="settings__secret">{{ fresh.value }}</code>
            <template #actions>
              <OButton size="sm" @click="copyToken"><Copy /> Copy</OButton>
            </template>
          </OAlert>

          <div class="settings__row settings__between">
            <span class="settings__note">A token acts as you, within what it is allowed to do.</span>
            <OButton variant="primary" hotkey="KeyT" @click="creating = true"><KeyRound /> New token</OButton>
          </div>

          <OCard class="settings__scroll">
            <OTable v-if="tokens.length" :columns="tokenColumns" :rows="tokens" row-key="name">
              <template #name="{ value }">
                <b>{{ value }}</b>
              </template>
              <template #prefix="{ value }">
                <code>{{ value }}…</code>
              </template>
              <template #scopes="{ row }">
                <span class="settings__row">
                  <OBadge v-for="scope in row.scopes" :key="scope">{{ scope }}</OBadge>
                </span>
              </template>
              <template #actions="{ row }">
                <OButton size="sm" variant="ghost" @click="revoking = row">Revoke</OButton>
              </template>
            </OTable>
            <OEmpty v-else title="No tokens">
              <template #icon><KeyRound /></template>
              Scripts and CI use a token instead of your password.
            </OEmpty>
          </OCard>
        </div>
      </template>

      <template #notifications>
        <div class="settings__col settings__narrow">
          <OAlert v-if="!emailConfirmed" title="Confirm ada@example.com">
            <template #icon><Info /></template>
            We sent a six-digit code. Until it is entered, notifications show up here only and no email is sent.
            <template #actions>
              <OButton size="sm" @click="confirming = true">Enter the code</OButton>
              <OButton size="sm" variant="ghost" @click="toast('A new code is on its way')">Send it again</OButton>
            </template>
          </OAlert>

          <OCard class="settings__col">
            <OSwitch v-model="notify.deploys">Deploys</OSwitch>
            <OSwitch v-model="notify.errors">Error spikes</OSwitch>
            <div class="settings__col settings__threshold">
              <span class="settings__note">A spike is an error rate over {{ threshold }}%</span>
              <OSlider
                v-model="threshold"
                :min="1"
                :max="20"
                :disabled="!notify.errors"
                aria-label="Error rate that counts as a spike, in percent"
              />
            </div>
            <OSwitch v-model="notify.digest">Weekly digest</OSwitch>
            <div class="settings__row">
              <OSwitch v-model="notify.marketing" class="settings__grow">Product news</OSwitch>
              <OPopover side="top" align="end">
                <OButton icon size="sm" shape="pill" aria-label="What is product news?">?</OButton>
                <template #content>
                  About one email a month: new features and nothing else. The other three are about your own projects.
                </template>
              </OPopover>
            </div>
          </OCard>
        </div>
      </template>

      <template #keys>
        <div class="settings__col settings__narrow">
          <OAlert v-if="clash" tone="danger" :title="`${clash.actions.join(' and ')} share ${clash.key}`">
            <template #icon><TriangleAlert /></template>
            One key cannot do both. Change one of them.
          </OAlert>
          <OAlert v-else>
            <template #icon><Info /></template>
            Keys are kept in this browser. They do not follow you to another device.
          </OAlert>

          <OCard class="settings__col">
            <div class="settings__keys">
              <OKeyCapture v-model="keys.search">Search</OKeyCapture>
              <OKeyCapture v-model="keys.deploy">New deploy</OKeyCapture>
              <OKeyCapture v-model="keys.live">Live updates</OKeyCapture>
            </div>
            <div class="settings__row settings__between">
              <span class="settings__note">Click a key, then press the new one. <OKbd>Esc</OKbd> cancels.</span>
              <OButton size="sm" variant="ghost" :disabled="!keysChanged" @click="keys = { ...defaultKeys }">
                <RotateCcw /> Defaults
              </OButton>
            </div>
          </OCard>
        </div>
      </template>
    </OTabs>

    <ODialog v-model:open="inviting" title="Invite" description="They get an email with a link to join.">
      <OField label="Email" :error="inviteError">
        <OInput v-model="inviteEmail" type="email" placeholder="name@example.com" autocomplete="off" />
      </OField>
      <div class="settings__row settings__between">
        <OSelect v-model="inviteRole" :items="roles" aria-label="Role" />
        <OButton variant="primary" hotkey="Enter" :disabled="!inviteEmail || !!inviteError" @click="invite">
          Send the invitation
        </OButton>
      </div>
    </ODialog>

    <ODialog
      v-model:open="confirming"
      title="Confirm the email"
      description="Enter the six digits we sent to ada@example.com."
    >
      <OField
        label="Code"
        hint="In this example the code is 123456"
        :error="codeWrong ? 'Not the code we sent. Try again.' : undefined"
      >
        <OPinInput v-model="code" :group="3" @complete="checkCode" @update:model-value="codeWrong = false" />
      </OField>
    </ODialog>

    <ODialog v-model:open="creating" title="New token" description="For a script or a CI job.">
      <OField label="Name" hint="What will use it: ci, grafana, a laptop" :error="tokenError">
        <OInput v-model="tokenName" placeholder="ci" autocomplete="off" />
      </OField>
      <div class="settings__col">
        <span class="settings__label">It can</span>
        <OCheckbox v-model="canRead" disabled>Read projects and numbers</OCheckbox>
        <OCheckbox v-model="canDeploy">Deploy and roll back</OCheckbox>
      </div>
      <div class="settings__row settings__end">
        <OButton variant="primary" hotkey="Enter" :disabled="!tokenName || !!tokenError" @click="createToken">
          Create the token
        </OButton>
      </div>
    </ODialog>

    <ODialog
      :open="!!revoking"
      title="Revoke token"
      :description="`Whatever uses “${revoking?.name}” stops working at once. This cannot be undone.`"
      @update:open="revoking = undefined"
    >
      <div class="settings__row settings__end">
        <OButton @click="revoking = undefined">Keep it</OButton>
        <OButton variant="primary" hotkey="Enter" @click="revoke">Revoke</OButton>
      </div>
    </ODialog>

    <ODialog
      v-model:open="deleteOpen"
      title="Delete account"
      description="Projects, deploys and history go with it. This cannot be undone."
    >
      <OCheckbox v-model="understood">I understand that everything will be deleted</OCheckbox>
      <div class="settings__row settings__end">
        <OButton @click="deleteOpen = false">Keep it</OButton>
        <OButton variant="primary" :disabled="!understood" @click="remove">Delete</OButton>
      </div>
    </ODialog>
  </div>
</template>

<style scoped>
/* layout only: everything that looks like a component is one */
.settings {
  max-width: 860px;
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
  gap: 10px;
  flex-wrap: wrap;
}

.settings__head,
.settings__between {
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
  max-width: 480px;
}

.settings__grow {
  flex: 1;
}

.settings__scroll {
  overflow-x: auto;
}

.settings__threshold {
  gap: 8px;
}

.settings__member {
  display: flex;
  align-items: center;
  gap: 12px;
}

.settings__person {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.settings__person > span:first-child {
  display: flex;
  align-items: center;
  gap: 8px;
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

.settings__secret {
  display: block;
  margin-top: 8px;
  color: var(--o-text);
  overflow-wrap: anywhere;
}

.settings code {
  font:
    400 13px ui-monospace,
    'SF Mono',
    Menlo,
    monospace;
}

@media (max-width: 640px) {
  .settings__pair {
    grid-template-columns: 1fr;
  }
}
</style>
