/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';

export default defineConfig({
  plugins: [remix()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src'],
      exclude: ['src/utils'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    watch: false,
  },
});
