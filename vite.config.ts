import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: './tsconfig.json', include: ['src'], exclude: ['src/**/*.test.ts'] })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      cssFileName: 'style',
    },
    rolldownOptions: {
      external: ['vue', /^reka-ui/],
      // one file per module, so importing one component doesn't pull in the rest
      output: { preserveModules: true, preserveModulesRoot: 'src', entryFileNames: '[name].js' },
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
})
