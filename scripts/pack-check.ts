// Packs the library as npm would publish it, installs the tarball in a fresh Vite project with npm,
// and typechecks and builds that project. Inside the repo `oyna-ui` resolves to `src/`, so this is
// the only check that sees `dist`, `exports` and `files` the way a user does.
//
//   bun scripts/pack-check.ts [--keep]    (--keep leaves the project in place and prints where)
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import pkg from '../package.json'

const root = new URL('..', import.meta.url).pathname
const dir = mkdtempSync(join(tmpdir(), 'oyna-pack-'))
const keep = process.argv.includes('--keep')

function run(cmd: string[], cwd: string) {
  console.log(`$ ${cmd.join(' ')}`)
  const result = Bun.spawnSync(cmd, { cwd, stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode !== 0) {
    console.error(result.stdout.toString(), result.stderr.toString())
    throw new Error(`Failed: ${cmd.join(' ')}`)
  }
  return result.stdout.toString()
}

try {
  // a real publish builds through `prepack`; here the build runs on its own, so its output does not
  // mix with the JSON that `npm pack` prints
  run(['bun', 'run', 'build'], root)
  const [packed] = JSON.parse(run(['npm', 'pack', '--json', '--ignore-scripts', '--pack-destination', dir], root))
  console.log(`  ${packed.filename}: ${packed.entryCount} files, ${Math.round(packed.size / 1024)} kB`)

  const app = join(dir, 'app')
  const dev = pkg.devDependencies
  await Bun.write(
    join(app, 'package.json'),
    JSON.stringify({
      name: 'oyna-pack-check',
      private: true,
      type: 'module',
      dependencies: { 'oyna-ui': `file:../${packed.filename}`, vue: pkg.peerDependencies.vue },
      devDependencies: {
        '@vitejs/plugin-vue': dev['@vitejs/plugin-vue'],
        typescript: dev.typescript,
        vite: dev.vite,
        'vue-tsc': dev['vue-tsc'],
      },
    }),
  )
  await Bun.write(
    join(app, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'bundler',
        strict: true,
        noEmit: true,
        jsx: 'preserve',
        types: ['vite/client'],
      },
      include: ['src'],
    }),
  )
  await Bun.write(
    join(app, 'vite.config.ts'),
    `import vue from '@vitejs/plugin-vue'\nexport default { plugins: [vue()] }\n`,
  )
  await Bun.write(join(app, 'index.html'), `<div id="app"></div><script type="module" src="/src/main.ts"></script>\n`)
  // every entry in `exports` is imported, so a missing file fails the build
  await Bun.write(
    join(app, 'src/main.ts'),
    `import oyna, { toast, useHotkey, type DropdownMenuItem } from 'oyna-ui'
import 'oyna-ui/style.css'
import 'oyna-ui/fonts.css'
import presetOyna from 'oyna-ui/unocss'
import { createApp } from 'vue'

import App from './App.vue'

const items: DropdownMenuItem[] = [{ label: 'Copy', onSelect: () => toast('Copied') }]
console.log(items, useHotkey, presetOyna().name)
createApp(App).use(oyna).mount('#app')
`,
  )
  // the plugin's global components are typed: a wrong prop must be an error, not \`any\`
  await Bun.write(
    join(app, 'src/App.vue'),
    `<script setup lang="ts">
import { OSelect } from 'oyna-ui'
import { ref } from 'vue'

const region = ref<string>()
</script>

<template>
  <OBackground />
  <OField label="Region">
    <OSelect v-model="region" :items="[{ value: 'fra', label: 'Frankfurt' }]" />
  </OField>
  <OButton variant="primary" hotkey="KeyD">Deploy</OButton>
  <!-- @vue-expect-error -->
  <OButton variant="nope">Wrong</OButton>
</template>
`,
  )

  run(['npm', 'install', '--no-audit', '--no-fund', '--loglevel=error'], app)
  // tailwind.css is a Tailwind file, not plain CSS: only check that it resolves
  run(['node', '--input-type=module', '-e', `import.meta.resolve('oyna-ui/tailwind.css')`], app)
  run(['npx', 'vue-tsc', '--noEmit'], app)
  run(['npx', 'vite', 'build', '--logLevel', 'warn'], app)
  console.log('The packed library installs, typechecks and builds.')
} finally {
  if (keep) console.log(`Left in ${dir}`)
  else rmSync(dir, { recursive: true, force: true })
}
