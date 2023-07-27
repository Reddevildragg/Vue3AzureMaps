import * as atlasJs from 'azure-maps-control/dist/atlas.min.js'
import { App } from 'vue'
import atlas from 'azure-maps-control'
import * as AzureMaps from './index.ts'

export interface VueAzureMapsPluginOptions {
  key: string
}

export class CreateVueAzureMap {
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

export default {
  install(app: App, options: VueAzureMapsPluginOptions) {
    app.config.globalProperties.$_azureMaps = new CreateVueAzureMap(
      atlasJs,
      options
    )
  },
}

export { AzureMaps, atlas }
