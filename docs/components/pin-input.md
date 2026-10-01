<script setup>
import { toast } from 'oyna'
import { ref } from 'vue'

const code = ref('')
const checked = ref('')
const wrong = ref(false)
const invite = ref('')
const pin = ref('')

function check(value) {
  wrong.value = value !== '123456'
  if (!wrong.value) toast('Confirmed', { tone: 'accent' })
}
</script>

# PinInput

A short code typed one character per cell: a confirmation code from an email or a text message, a PIN.

<Demo>
  <OPinInput v-model="code" aria-label="Confirmation code" />
  <span style="min-width: 90px; font-size: 13px; color: var(--o-text-3)">{{ code || 'nothing yet' }}</span>
</Demo>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const code = ref('')
</script>

<template>
  <OPinInput v-model="code" aria-label="Confirmation code" />
</template>
```

The value is one string. Typing moves to the next cell, Backspace goes back, the arrow keys move between cells, and a code pasted into any cell fills them all. On a phone the number pad comes up and the code from a text message is offered above the keyboard.

Hotkeys are ignored while the user types in it, as in any field.

## In a field, with a check

`complete` fires when the last cell is filled: check the code there, without a button. Inside an [`OField`](/components/input) the label and the error are tied to the cells. `group` splits them the way the code is written.

Try `123456`, then any other code:

<Demo>
  <OField label="Code from the email" hint="Six digits" :error="wrong ? 'Not the code we sent. Try again.' : undefined">
    <OPinInput v-model="checked" :group="3" @complete="check" @update:model-value="wrong = false" />
  </OField>
</Demo>

```vue
<script setup lang="ts">
const code = ref('')
const wrong = ref(false)

async function check(value: string) {
  wrong.value = !(await verify(value))
}
</script>

<template>
  <OField label="Code from the email" hint="Six digits" :error="wrong ? 'Not the code we sent. Try again.' : undefined">
    <OPinInput v-model="code" :group="3" @complete="check" @update:model-value="wrong = false" />
  </OField>
</template>
```

## Letters, length, hidden

`type="text"` takes any character. `length` sets the number of cells. `mask` hides what is typed.

<Demo>
  <OPinInput v-model="invite" type="text" :length="5" aria-label="Invite code" />
  <OPinInput v-model="pin" :length="4" mask aria-label="PIN" />
</Demo>

```vue
<OPinInput v-model="invite" type="text" :length="5" aria-label="Invite code" />
<OPinInput v-model="pin" :length="4" mask aria-label="PIN" />
```

Without an `OField`, give it an `aria-label`.

## Props and events

| Prop       | Type                  | Default     | Description                                                       |
| ---------- | --------------------- | ----------- | ----------------------------------------------------------------- |
| `v-model`  | `string`              | `''`        | The code; shorter than `length` while it is being typed           |
| `length`   | `number`              | `6`         | How many characters the code has                                  |
| `type`     | `'numeric' \| 'text'` | `'numeric'` | Digits only, or any character                                     |
| `group`    | `number`              | —           | Splits the cells into groups of this many                         |
| `mask`     | `boolean`             | `false`     | Hides what is typed                                               |
| `invalid`  | `boolean`             | `false`     | A danger ring. Inside an `OField` with an error it is set for you |
| `disabled` | `boolean`             | `false`     |                                                                   |

| Event      | Payload  | Description          |
| ---------- | -------- | -------------------- |
| `complete` | `string` | Every cell is filled |

Built on [Reka UI](https://reka-ui.com) PinInput.
