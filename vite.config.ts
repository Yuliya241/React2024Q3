/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      // include: ['src'],
      exclude: ['src'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    watch: false,
  },
});
