// vite.config.ts
import { defineConfig } from "file:///D:/GG/Web/VueAzureMaps/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/GG/Web/VueAzureMaps/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import typescript2 from "file:///D:/GG/Web/VueAzureMaps/node_modules/rollup-plugin-typescript2/dist/rollup-plugin-typescript2.cjs.js";
import dts from "file:///D:/GG/Web/VueAzureMaps/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\GG\\Web\\VueAzureMaps";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true
        }
      },
      exclude: ["vite.config.ts"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  },
  build: {
    cssCodeSplit: true,
    lib: {
      // the entry file that is loaded whenever someone imports
      // your plugin in their app
      entry: path.resolve(__vite_injected_original_dirname, "src/vue3AzureMaps/vue3-azure-maps.ts"),
      // the exposed global variable
      // is required when formats includes 'umd' or 'iife'
      name: "vue3-azure-maps",
      // the proper extensions will be added, ie:
      // name.js (es module)
      // name.umd.cjs) (common js module)
      // default fileName is the name option of package.json
      fileName: "vue3-azure-maps",
      formats: ["es", "cjs", "umd"]
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: path.resolve(__vite_injected_original_dirname, "src/vue3AzureMaps/vue3-azure-maps.ts")
      },
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "main.css")
            return "vue3-azure-maps.css";
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHR1xcXFxXZWJcXFxcVnVlQXp1cmVNYXBzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxHR1xcXFxXZWJcXFxcVnVlQXp1cmVNYXBzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9HRy9XZWIvVnVlQXp1cmVNYXBzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB0eXBlc2NyaXB0MiBmcm9tICdyb2xsdXAtcGx1Z2luLXR5cGVzY3JpcHQyJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5cbi8vaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBkdHMoe1xuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICB9KSxcbiAgICB0eXBlc2NyaXB0Mih7XG4gICAgICBjaGVjazogZmFsc2UsXG4gICAgICBpbmNsdWRlOiBbJ3NyYy9jb21wb25lbnRzLyoqLyoudnVlJ10sXG4gICAgICB0c2NvbmZpZ092ZXJyaWRlOiB7XG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgICAgIHNvdXJjZU1hcDogdHJ1ZSxcbiAgICAgICAgICBkZWNsYXJhdGlvbjogdHJ1ZSxcbiAgICAgICAgICBkZWNsYXJhdGlvbk1hcDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBleGNsdWRlOiBbJ3ZpdGUuY29uZmlnLnRzJ10sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbiddLFxuICB9LFxuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBsaWI6IHtcbiAgICAgIC8vIHRoZSBlbnRyeSBmaWxlIHRoYXQgaXMgbG9hZGVkIHdoZW5ldmVyIHNvbWVvbmUgaW1wb3J0c1xuICAgICAgLy8geW91ciBwbHVnaW4gaW4gdGhlaXIgYXBwXG4gICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy92dWUzQXp1cmVNYXBzL3Z1ZTMtYXp1cmUtbWFwcy50cycpLFxuXG4gICAgICAvLyB0aGUgZXhwb3NlZCBnbG9iYWwgdmFyaWFibGVcbiAgICAgIC8vIGlzIHJlcXVpcmVkIHdoZW4gZm9ybWF0cyBpbmNsdWRlcyAndW1kJyBvciAnaWlmZSdcbiAgICAgIG5hbWU6ICd2dWUzLWF6dXJlLW1hcHMnLFxuXG4gICAgICAvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZCwgaWU6XG4gICAgICAvLyBuYW1lLmpzIChlcyBtb2R1bGUpXG4gICAgICAvLyBuYW1lLnVtZC5janMpIChjb21tb24ganMgbW9kdWxlKVxuICAgICAgLy8gZGVmYXVsdCBmaWxlTmFtZSBpcyB0aGUgbmFtZSBvcHRpb24gb2YgcGFja2FnZS5qc29uXG4gICAgICBmaWxlTmFtZTogJ3Z1ZTMtYXp1cmUtbWFwcycsXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcycsICd1bWQnXSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBleHRlcm5hbGl6ZSBkZXBzIHRoYXQgc2hvdWxkIG5vdCBiZSBidW5kbGVkXG4gICAgICAvLyBpbnRvIHlvdXIgbGlicmFyeVxuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy92dWUzQXp1cmVNYXBzL3Z1ZTMtYXp1cmUtbWFwcy50cycpLFxuICAgICAgfSxcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSAnbWFpbi5jc3MnKSByZXR1cm4gJ3Z1ZTMtYXp1cmUtbWFwcy5jc3MnXG4gICAgICAgICAgcmV0dXJuIGFzc2V0SW5mby5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFAsU0FBUyxvQkFBb0I7QUFDelIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFNBQVM7QUFKaEIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsU0FBUyxDQUFDLHlCQUF5QjtBQUFBLE1BQ25DLGtCQUFrQjtBQUFBLFFBQ2hCLGlCQUFpQjtBQUFBLFVBQ2YsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsYUFBYTtBQUFBLFVBQ2IsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTLENBQUMsZ0JBQWdCO0FBQUEsSUFDNUIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLElBQ0EsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxPQUFPO0FBQUEsRUFDNUQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQTtBQUFBO0FBQUEsTUFHSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxzQ0FBc0M7QUFBQTtBQUFBO0FBQUEsTUFJckUsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNTixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsTUFBTSxPQUFPLEtBQUs7QUFBQSxJQUM5QjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdiLE9BQU87QUFBQSxRQUNMLE1BQU0sS0FBSyxRQUFRLGtDQUFXLHNDQUFzQztBQUFBLE1BQ3RFO0FBQUEsTUFDQSxVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVM7QUFBWSxtQkFBTztBQUMxQyxpQkFBTyxVQUFVO0FBQUEsUUFDbkI7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
