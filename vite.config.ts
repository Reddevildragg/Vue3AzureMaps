import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import typescript2 from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ['src/components/**/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          outDir: 'dist',
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ['vite.config.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    cssCodeSplit: true,
    lib: {
      // the entry file that is loaded whenever someone imports
      // your plugin in their app
      entry: path.resolve(__dirname, 'src/vue3-azure-maps/index.ts'),
      // the exposed global variable
      // is required when formats includes 'umd' or 'iife'
      name: 'vue3-azure-maps',
      // the proper extensions will be added, ie:
      // name.js (es module)
      // name.umd.cjs) (common js module)
      // default fileName is the name option of package.json
      /*     fileName: (format) => `vue3-azure-maps.${format}.js`,
      formats: ['es', 'cjs', 'umd'],*/
      fileName: 'vue3-azure-maps',
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: path.resolve(__dirname, 'src/vue3-azure-maps/index.ts'),
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          console.log(assetInfo.name)
          if (assetInfo.name === 'index.css') return 'vue3-azure-maps.css'
          return assetInfo.name
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
