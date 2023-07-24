/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue'
import { VueAzureMaps } from './vue-azure-maps.ts'

declare module 'vue' {
  interface Vue {
    $_azureMaps: VueAzureMaps
  }
}
