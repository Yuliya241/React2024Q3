/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    !process.env.VITEST
      ? remix({
          appDirectory: 'app',
        })
      : react(),
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
