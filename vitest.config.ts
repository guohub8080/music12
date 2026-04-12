import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.{test,spec}.{ts,mts,cts}']
  },
  resolve: {
    alias: {
      '@music12': path.resolve(__dirname, './src')
    }
  }
});
