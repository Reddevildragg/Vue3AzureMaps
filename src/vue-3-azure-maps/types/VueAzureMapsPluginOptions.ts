export interface VueAzureMapsPluginOptions {
  key: string
}

export class VueAzureMaps {
  constructor(lib: typeof atlas, options?: VueAzureMapsPluginOptions)

  public readonly key: string
  public readonly atlas: typeof atlas

  public setSubscriptionKey: (key: string) => void

  static install: PluginFunction<VueAzureMapsPluginOptions>
  static version: string
}
