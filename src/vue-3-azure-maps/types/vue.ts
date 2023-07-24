/**
 * Augment the typings of Vue.js
 */

import { VueAzureMaps } from './VueAzureMapsPluginOptions.ts'

declare module 'vue' {
  interface Vue {
    $_azureMaps: VueAzureMaps
  }
}
