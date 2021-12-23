import { defineConfig } from 'tsup'

// https://github.com/egoist/tsup/blob/main/src/options.ts
export default defineConfig({
  entry: ['src/*'],
  target: "node14.18.1",
  minify: true,
  bundle: true,
  outDir: 'lib',
  clean: true
})
