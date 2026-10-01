<script setup lang="ts">
import { ArrowUpRight, Code } from '@lucide/vue'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'

import type { ThemeConfig } from '../config'

const props = defineProps<{
  /** Folder of the example, from the repository root. */
  dir: string
  /** Its files, the main one first. The code of file number `n` goes in the slot `f<n>`. */
  files: readonly string[]
}>()

const { theme } = useData<ThemeConfig>()
const open = ref(false)
const current = ref(0)
// a link ending in #source opens the page with the source already shown
onMounted(() => (open.value = location.hash === '#source'))

const folderUrl = computed(() => `${theme.value.repo}/tree/${theme.value.branch}/${props.dir}`)
const fileUrl = computed(
  () => `${theme.value.repo}/blob/${theme.value.branch}/${props.dir}/${props.files[current.value]}`,
)
</script>

<template>
  <!-- sits in the row of the examples switch, at its right end -->
  <div class="example-source">
    <OButton size="sm" shape="pill" variant="soft" @click="open = true"> <Code /> View source </OButton>
    <OButton size="sm" shape="pill" :href="folderUrl" target="_blank" rel="noopener"> GitHub <ArrowUpRight /> </OButton>

    <ODialog v-model:open="open" title="Source" class="content" style="--o-dialog-width: 1080px">
      <div class="source">
        <nav class="source__files" aria-label="Files">
          <span class="label">{{ dir }}</span>
          <button
            v-for="(file, index) in files"
            :key="file"
            type="button"
            class="source__file"
            :aria-current="index === current ? 'true' : undefined"
            @click="current = index"
          >
            {{ file }}
          </button>
          <OButton class="source__github" size="sm" :href="fileUrl" target="_blank" rel="noopener">
            Open on GitHub <ArrowUpRight />
          </OButton>
        </nav>
        <div v-for="(file, index) in files" v-show="index === current" :key="file" class="source__code">
          <slot :name="`f${index}`" />
        </div>
      </div>
    </ODialog>
  </div>
</template>
