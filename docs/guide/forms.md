<script setup>
import { toast } from 'oyna-ui'
import { computed, reactive, ref } from 'vue'

const regions = [
  { value: 'fra', label: 'Frankfurt', hint: 'eu-central' },
  { value: 'iad', label: 'Virginia', hint: 'us-east' },
  { value: 'sin', label: 'Singapore', hint: 'ap-southeast' },
]
const branches = ['main', 'release/0.2', 'feat/search', 'fix/toast-focus'].map((b) => ({ value: b, label: b }))

const form = reactive({ name: '', region: undefined, branch: undefined })
const tried = ref(false)

const errors = computed(() => ({
  name: !form.name
    ? 'Give the service a name'
    : !/^[a-z0-9-]{2,32}$/.test(form.name)
      ? 'Lowercase letters, digits and dashes, 2–32 of them'
      : undefined,
  region: form.region ? undefined : 'Pick a region',
  branch: form.branch ? undefined : 'Pick the branch to deploy',
}))
const shown = (key) => (tried.value ? errors.value[key] : undefined)

function submit() {
  tried.value = true
  if (Object.values(errors.value).some(Boolean)) return
  toast(`${form.name} will deploy ${form.branch} to ${form.region}`, { tone: 'accent' })
  Object.assign(form, { name: '', region: undefined, branch: undefined })
  tried.value = false
}
</script>

# Forms

The library has no form component and no validation of its own: the state of a form is yours, kept
in a `ref` or a `reactive`, or in a form library. What the library gives is
[`OField`](/components/input#field): a label, the control, and a line under it for a hint or an
error.

`OInput`, `OTextarea`, `OPinInput`, `OSelect` and `OCombobox` read the field they are in. The label
points at the control, the message is tied to it for screen readers, and an `error` gives the
control a danger ring. You set no ids and pass no `invalid` by hand.

## With plain Vue

A `computed` holds the errors; the form shows them only after the first try to submit, so nobody
gets a red field before typing a letter. After that they follow every change. Press Create with
the form empty:

<Demo>
  <form style="display: flex; flex-direction: column; gap: 4px; width: 100%; max-width: 320px" novalidate @submit.prevent="submit">
    <OField label="Service" hint="Used in its address" :error="shown('name')">
      <OInput v-model="form.name" placeholder="billing-api" autocomplete="off" />
    </OField>
    <OField label="Region" :error="shown('region')">
      <OSelect v-model="form.region" :items="regions" placeholder="Choose" />
    </OField>
    <OField label="Branch" :error="shown('branch')">
      <OCombobox v-model="form.branch" :items="branches" placeholder="Type to find" />
    </OField>
    <div>
      <OButton variant="primary" type="submit">Create</OButton>
    </div>
  </form>
</Demo>

```vue
<script setup lang="ts">
import { toast } from 'oyna-ui'
import { computed, reactive, ref } from 'vue'

const regions = [
  { value: 'fra', label: 'Frankfurt', hint: 'eu-central' },
  { value: 'iad', label: 'Virginia', hint: 'us-east' },
]
const branches = [
  { value: 'main', label: 'main' },
  { value: 'release/0.2', label: 'release/0.2' },
]

const form = reactive<{ name: string; region?: string; branch?: string }>({ name: '' })
// errors stay hidden until the first try to submit
const tried = ref(false)

const errors = computed(() => ({
  name: !form.name
    ? 'Give the service a name'
    : !/^[a-z0-9-]{2,32}$/.test(form.name)
      ? 'Lowercase letters, digits and dashes, 2–32 of them'
      : undefined,
  region: form.region ? undefined : 'Pick a region',
  branch: form.branch ? undefined : 'Pick the branch to deploy',
}))
const shown = (key: keyof typeof errors.value) => (tried.value ? errors.value[key] : undefined)

function submit() {
  tried.value = true
  if (Object.values(errors.value).some(Boolean)) return
  toast(`${form.name} will deploy ${form.branch}`, { tone: 'accent' })
}
</script>

<template>
  <form novalidate @submit.prevent="submit">
    <OField label="Service" hint="Used in its address" :error="shown('name')">
      <OInput v-model="form.name" placeholder="billing-api" />
    </OField>
    <OField label="Region" :error="shown('region')">
      <OSelect v-model="form.region" :items="regions" placeholder="Choose" />
    </OField>
    <OField label="Branch" :error="shown('branch')">
      <OCombobox v-model="form.branch" :items="branches" placeholder="Type to find" />
    </OField>
    <OButton variant="primary" type="submit">Create</OButton>
  </form>
</template>
```

A few things that help:

- **A real `<form>` with a `type="submit"` button.** Enter in a text field then submits it, with no
  hotkey to set up. Inside an open Select or Combobox list, Enter picks the option instead.
- **`novalidate`** on the form, if the inputs carry `required` or `type="email"`: otherwise the
  browser shows its own bubbles on top of yours. Keep those attributes anyway: they tell screen
  readers and phone keyboards what the field expects.
- **The message line is always there.** An error appears in the place of the hint, so the form does
  not jump. It is read out when it appears.
- **Without an `OField`**, a control still takes `invalid` for the ring, and needs an `aria-label`.

## With VeeValidate

A form library keeps the values, the errors and which fields were touched; the components only show
them. With [VeeValidate](https://vee-validate.logaretm.com) and a [Zod](https://zod.dev) schema:

::: code-group

```sh [npm]
npm install vee-validate @vee-validate/zod zod@3
```

```sh [pnpm]
pnpm add vee-validate @vee-validate/zod zod@3
```

```sh [yarn]
yarn add vee-validate @vee-validate/zod zod@3
```

```sh [bun]
bun add vee-validate @vee-validate/zod zod@3
```

:::

`@vee-validate/zod` works with Zod 3, hence `zod@3`.

```vue
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { defineField, errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().regex(/^[a-z0-9-]{2,32}$/, 'Lowercase letters, digits and dashes, 2–32 of them'),
      region: z.string({ message: 'Pick a region' }),
      branch: z.string({ message: 'Pick the branch to deploy' }),
    }),
  ),
})

const [name] = defineField('name')
const [region] = defineField('region')
const [branch] = defineField('branch')

const submit = handleSubmit(async (values) => {
  await createService(values)
})
</script>

<template>
  <form novalidate @submit="submit">
    <OField label="Service" hint="Used in its address" :error="errors.name">
      <OInput v-model="name" />
    </OField>
    <OField label="Region" :error="errors.region">
      <OSelect v-model="region" :items="regions" placeholder="Choose" />
    </OField>
    <OField label="Branch" :error="errors.branch">
      <OCombobox v-model="branch" :items="branches" placeholder="Type to find" />
    </OField>
    <OButton variant="primary" type="submit" :loading="isSubmitting">Create</OButton>
  </form>
</template>
```

`errors` is empty until VeeValidate decides a field should show its error: on submit, and for a
field that was already checked, on each change. `handleSubmit` prevents the page reload itself.
Other schema libraries plug in the same way (`@vee-validate/valibot`, `@vee-validate/yup`), and so
does [FormKit](https://formkit.com) or any library that hands you a value and an error per field.

## Errors from the server

Some errors only the server knows: the name is taken, the token has expired. Put them in the same
place. With plain Vue, keep them next to the computed ones and clear one when its field changes:

```ts
const serverErrors = reactive<{ name?: string }>({})

const errors = computed(() => ({
  name: serverErrors.name ?? checkName(form.name),
  // …
}))

watch(
  () => form.name,
  () => (serverErrors.name = undefined),
)

async function submit() {
  const response = await createService(form)
  if (response.status === 409) serverErrors.name = 'This name is taken'
}
```

With VeeValidate, `setFieldError('name', 'This name is taken')` from `useForm` does the same; the
error goes away on the next check of that field.

An error that belongs to no field (the network is down, the server failed) goes in a
[toast](/components/toast) with `tone: 'danger'`, or in an [alert](/components/alert) above the
button when the user has to read it before trying again.
