import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: './',
  build: mode === 'portable'
    ? { assetsInlineLimit: Number.MAX_SAFE_INTEGER, outDir: 'node_modules/.cache/vero-portable', emptyOutDir: true }
    : {},
}))
