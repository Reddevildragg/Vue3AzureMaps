import * as atlasJs from 'azure-maps-control/dist/atlas.min.js'
import atlas from 'azure-maps-control'

import { App, Plugin } from 'vue'
import { VueAzureMapsPluginOptions } from '@/Vue3AzureMapsPlugin/types/types.ts'

export let VueWithPlugin: App

export const VueAzureMaps: Plugin = {
  install(app: App, options: VueAzureMapsPluginOptions) {
    if (app && app === VueWithPlugin) {
      if (import.meta.env.NODE_ENV !== 'production') {
        console.error(
          '[vue-azure-maps] already installed. Vue.use(VueAzureMaps) should be called only once.'
        )
      }
      return
    }
    VueWithPlugin = app
    app.config.globalProperties.$_azureMaps = new VueAzureMapsData(
      atlasJs,
      options
    )
  },
}

export default VueAzureMaps

export class VueAzureMapsData {
  options: VueAzureMapsPluginOptions

  public readonly key: string
  public readonly atlas: typeof atlas

  constructor(lib: typeof atlas, options?: VueAzureMapsPluginOptions) {
    if (!options) options = { key: '' }
    this.options = options
    this.key = options.key
    this.atlas = lib
    this.setSubscriptionKey(options.key)
  }

  public setSubscriptionKey(key: string) {
    // Set the Azure Maps subscription key to the map SDK.
    this.atlas.setSubscriptionKey(key)
  }

  static version = import.meta.env.VUE_AZURE_MAPS_VERSION
}
