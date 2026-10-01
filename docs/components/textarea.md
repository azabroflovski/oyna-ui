<script setup>
import { ref } from 'vue'

const bio = ref('')
</script>

# Textarea

Text of several lines. It looks and behaves like an [input](/components/input), and works inside an `OField` the same way.

<Demo>
  <OField label="About you" hint="Up to 160 characters" :error="bio.length > 160 ? `${bio.length - 160} too many` : undefined" style="width: 320px">
    <OTextarea v-model="bio" placeholder="A few words" />
  </OField>
</Demo>

```vue
<OField label="About you" hint="Up to 160 characters" :error="error">
  <OTextarea v-model="bio" placeholder="A few words" />
</OField>
```

It is three rows high and the user can drag it taller. Every attribute goes to the `<textarea>`: `rows`, `maxlength`, `placeholder`.

Hotkeys are ignored while the user types in it, as in any field.

## Props

| Prop      | Type      | Default | Description                                                       |
| --------- | --------- | ------- | ----------------------------------------------------------------- |
| `v-model` | `string`  | —       |                                                                   |
| `invalid` | `boolean` | `false` | A danger ring. Inside an `OField` with an error it is set for you |
