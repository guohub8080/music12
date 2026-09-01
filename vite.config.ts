import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path"
import * as path from "node:path";
const isProduction = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  esbuild:{
    minifyIdentifiers:false,
    // keepNames:true
  },
  root:resolve(__dirname, "test/playground"),
  resolve: {
    alias: {
      "@": resolve(__dirname),
      "@web": resolve(__dirname,"test/playground"),
      "@music12": resolve(__dirname,"src"),
      "@note": resolve(__dirname,"src/Note"),
      "@interval": resolve(__dirname,"src/Interval"),
      "@scale": resolve(__dirname,"src/Scale"),
      "@chord": resolve(__dirname,"src/Chord"),
      "@chord-formula": resolve(__dirname,"src/ChordFormula"),
      "@scale-mode": resolve(__dirname,"src/ScaleMode"),
      "@circle-of-fifths": resolve(__dirname,"src/CircleOfFifths"),
      "@find": resolve(__dirname,"src/Find"),
      "@pianokey": resolve(__dirname,"src/PianoKey"),
      "@stave": resolve(__dirname,"src/Stave"),
      "@common": resolve(__dirname,"src/common"),
      "@factory": resolve(__dirname,"src/factory"),
      "@static-data": resolve(__dirname,"static-data"),
      path: "path-browserify",
    },
    extensions: [".ts", ".tsx", ".js", "jsx"]
  },

  build: {
    outDir: "docs",
    minify: isProduction,
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',

        // 将第三方依赖库单独打包成一个文件
        manualChunks: {
          react: ['react', 'react-dom', 'react-use'],
          baseTool: ['lodash', 'ramda', 'ahooks'],
        }
      }
    },
    commonjsOptions: {
      exclude: ['ckeditor/*'],
    },
  }
})
