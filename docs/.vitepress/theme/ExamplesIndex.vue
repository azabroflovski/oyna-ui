<script setup lang="ts">
import { ArrowUpRight, Plus } from '@lucide/vue'
import { useData } from 'vitepress'
import { onMounted, ref, watch } from 'vue'

import type { ThemeConfig } from '../config'

/** The examples page: the library's own example screens, and real sites made with this look. */
const { theme } = useData<ThemeConfig>()

const tabs = [
  { value: 'examples', label: 'Examples' },
  { value: 'sites', label: 'Sites' },
] as const
const tab = ref<(typeof tabs)[number]['value']>('examples')

// `/examples/#sites` opens the second tab, so it can be linked to
onMounted(() => {
  if (location.hash === '#sites') tab.value = 'sites'
})
watch(tab, (value) => history.replaceState(null, '', value === 'sites' ? '#sites' : location.pathname))

/** Real sites. A new one comes in through the "Add your site" issue form and is added here by hand. */
const sites = [
  {
    name: 'invoke.wtf',
    url: 'https://invoke.wtf',
    note: 'Where the look comes from',
    text: 'A trainer for Invoker from Dota 2. This look was first drawn here, by hand, before there was a library.',
  },
]
</script>

<template>
  <OTabs v-model="tab" :items="tabs" variant="underline" class="examples-tabs">
    <template #examples>
      <p class="section-lead">
        Whole screens built only from the library's components: the examples add layout and nothing else. Each one works
        — press the keys, break things — and shows its source.
      </p>
      <ExamplesGallery :level="2" />
    </template>

    <template #sites>
      <p class="section-lead">Real sites with this look. Yours can be here.</p>
      <div class="sites">
        <a v-for="site in sites" :key="site.url" class="sites__item" :href="site.url" target="_blank" rel="noopener">
          <OSurface class="sites__card">
            <span class="sites__head">
              <h2 class="sites__name">{{ site.name }}</h2>
              <ArrowUpRight class="sites__arrow" aria-hidden="true" />
            </span>
            <OBadge v-if="site.note">{{ site.note }}</OBadge>
            <p>{{ site.text }}</p>
          </OSurface>
        </a>
        <OSurface class="sites__card sites__add">
          <h2 class="sites__name">Your site</h2>
          <p>Built something with Oyna UI? Send its address and a line about it; it is added by hand.</p>
          <OButton variant="primary" :href="`${theme.repo}/issues/new?template=showcase.yml`" target="_blank">
            <Plus /> Add your site
          </OButton>
        </OSurface>
      </div>
    </template>
  </OTabs>
</template>
