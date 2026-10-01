<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** File name shown under the title. */
  file: string
}>()

const open = ref(false)
</script>

<template>
  <!-- sits in the row of the examples switch, at its right end; the slot is the code block -->
  <div class="example-source">
    <OButton size="sm" shape="pill" variant="soft" @click="open = true">
      View source
    </OButton>
    <ODialog v-model:open="open" title="Source" :description="file" class="content" style="--o-dialog-width: 980px">
      <slot />
    </ODialog>
  </div>
</template>
