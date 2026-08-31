import path from 'path'
import { defineConfig } from 'vitest/config'

// Pinned so date formatting/parsing assertions do not depend on the machine's zone.
process.env.TZ = 'UTC'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './api'),
    },
  },
  test: {
    environment: 'node',
    env: { TZ: 'UTC' },
    include: ['tests/**/*.test.ts'],
  },
})
