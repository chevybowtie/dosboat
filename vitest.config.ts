import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov'],
      exclude: ['**/node_modules/**', 'build/**', 'dist/**', 'src/**/*.spec.{js,ts}']
    }
  },
  server: {
    deps: {
      inline: ['@iconify/vue']
    }
  }
})
