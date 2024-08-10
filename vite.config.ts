/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['app'],
      exclude: ['app/utils'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    watch: false,
  },
});
