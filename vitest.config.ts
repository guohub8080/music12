import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/unit/**/*.{test,spec}.{ts,mts,cts}', 'src/**/*.{test,spec}.{ts,mts,cts}']
  },
  resolve: {
    alias: {
      '@music12': path.resolve(__dirname, './src'),
      '@note': path.resolve(__dirname, './src/Note'),
      '@interval': path.resolve(__dirname, './src/Interval'),
      '@scale': path.resolve(__dirname, './src/Scale'),
      '@chord': path.resolve(__dirname, './src/Chord'),
      '@chord-formula': path.resolve(__dirname, './src/ChordFormula'),
      '@scale-mode': path.resolve(__dirname, './src/ScaleMode'),
      '@circle-of-fifths': path.resolve(__dirname, './src/CircleOfFifths'),
      '@find': path.resolve(__dirname, './src/Find'),
      '@pianokey': path.resolve(__dirname, './src/PianoKey'),
      '@stave': path.resolve(__dirname, './src/Stave'),
      '@common': path.resolve(__dirname, './src/common'),
      '@factory': path.resolve(__dirname, './src/factory'),
      '@static-data': path.resolve(__dirname, './static-data')
    }
  }
});
