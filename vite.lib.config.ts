import {defineConfig} from 'vite'
import {resolve} from 'path'
import react from '@vitejs/plugin-react'

/**
 * 库构建配置（产出可发布到 npm 的 dist）
 *
 * 与 vite.config.ts（服务 web_test playground）分离。
 * 参考 expub-tool/vite.config.ts：使用 preserveModules 保留源码模块结构，
 * 让消费者 bundler 能做细粒度 treeshaking（替代旧的 tsup 单入口全量 bundle）。
 *
 * 入口暂只开 index，子路径 exports 待循环依赖完全解耦后再开放。
 */
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@music12': resolve(__dirname, 'src'),
            '@note': resolve(__dirname, 'src/Note'),
            '@interval': resolve(__dirname, 'src/Interval'),
            '@scale': resolve(__dirname, 'src/Scale'),
            '@chord': resolve(__dirname, 'src/Chord'),
            '@chord-formula': resolve(__dirname, 'src/ChordFormula'),
            '@scale-mode': resolve(__dirname, 'src/ScaleMode'),
            '@circle-of-fifths': resolve(__dirname, 'src/CircleOfFifths'),
            '@find': resolve(__dirname, 'src/Find'),
            '@pianokey': resolve(__dirname, 'src/PianoKey'),
            '@stave': resolve(__dirname, 'src/Stave'),
            '@common': resolve(__dirname, 'src/common'),
            '@factory': resolve(__dirname, 'src/factory'),
            '@static-data': resolve(__dirname, 'static-data'),
            // 与 vite.config.ts 保持一致：path 桥接到 browserify 版本
            path: 'path-browserify',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    esbuild: {
        minifyIdentifiers: false,
    },
    build: {
        lib: {
            entry: {
                'index': resolve(__dirname, 'src/index.ts'),
                'note': resolve(__dirname, 'src/Note/index.ts'),
                'interval': resolve(__dirname, 'src/Interval/index.ts'),
                'scale': resolve(__dirname, 'src/Scale/index.ts'),
                'chord': resolve(__dirname, 'src/Chord/index.ts'),
                'chord-formula': resolve(__dirname, 'src/ChordFormula/index.ts'),
                'find': resolve(__dirname, 'src/Find/index.ts'),
                'stave': resolve(__dirname, 'src/Stave/index.ts'),
                'radix': resolve(__dirname, 'src/common/radix/index.ts'),
                'circle-of-fifths': resolve(__dirname, 'src/CircleOfFifths/index.ts'),
                'factory': resolve(__dirname, 'src/factory/index.ts'),
            },
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // 运行时依赖标为外部，不打进 bundle
            external: ['es-toolkit', 'collect.js', 'chinese-numbering'],
            output: [
                {
                    format: 'es',
                    dir: 'dist/esm',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].mjs',
                },
                {
                    format: 'cjs',
                    dir: 'dist/cjs',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].cjs',
                },
            ],
        },
        sourcemap: true,
        outDir: 'dist',
        emptyOutDir: true,
    },
})
