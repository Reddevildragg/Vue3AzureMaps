<template>
  <div :id="mapId">
    <template v-if="isMapReady">
      <slot :map="map" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import getOptionsFromProps from '@/Vue3AzureMaps/utils/getOptionsFromProps.ts'
  import addMapEventListeners from '@/Vue3AzureMaps/utils/addMapEventListeners.ts'
  import { onMounted, onUnmounted, PropType, provide, ref, watch } from 'vue'
  import { getCurrentInstance } from 'vue'
  import { useAttrs } from 'vue'
  import atlas from 'azure-maps-control'
  import { AzureMapEvent } from '@/Vue3AzureMaps/utils/enums.ts'

  const attrs = useAttrs()
  const app = getCurrentInstance()
  const emit = defineEmits(['ready'])
  const props = defineProps({
    /**
     * The authentication options used to customize how the map control authenticates with Azure Maps services.
     * If these authentication options are specified then ServiceOptions.subscriptionKey should not be.
     * Recommend using the atlas.setAuthenticationOptions function instead.
     */
    authOptions: {
      type: Object as PropType<atlas.AuthenticationOptions | null>,
      default: null,
    },

    /**
     * The customer subscription key used to authorize requests.
     * This option may only be set when initializing the map.
     * Recommend using the atlas.setSubscriptionKey function instead
     */
    subscriptionKey: {
      type: String as PropType<string | null>,
      default: null,
    },

    /**
     * The session id to pass with requests.
     * Recommend using atlas.setSessionId instead.
     * @default Random UUID generated at runtime
     */
    sessionId: {
      type: String as PropType<string | null>,
      default: null,
    },

    /**
     * Disable telemetry collection
     * This option may only be set when initializing the map.
     * default: false
     * @default false
     */
    disableTelemetry: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Enable accessibility
     * default: false
     * @default false
     */
    enableAccessibility: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * A boolean that specifies if vector and raster tiles should be reloaded when they expire (based on expires header).
     * This is useful for data sets that update frequently. When set to false, each tile will be loaded once, when needed, and not reloaded when they expire.
     * default: true
     * @default true
     */
    refreshExpiredTiles: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * If defined transformRequest will be called to provide custom request parameters for loading a tile.
     * `(url: string, resourceType: string) => RequestParameters`
     */
    transformRequest: {
      type: Function as PropType<Function | null>,
      default: null,
    },

    /**
     * The zoom level of the map view.
     * `default 1`
     * @default 1
     */
    zoom: {
      type: Number as PropType<number | null>,
      default: null,
    },

    /**
     * The position to align the center of the map view with.
     * `default [0, 0]`
     * @default [0, 0]
     */
    center: {
      type: Array as PropType<atlas.data.Position | null>,
      default: null,
    },

    /**
     * A pixel offset to apply to the center of the map.
     * This is useful if you want to programmatically pan the map to another location or if you want to center the map over a shape, then offset the maps view to make room for a popup.
     * Default `[0, 0]`.
     * @default [0, 0]
     */
    centerOffset: {
      type: Array as PropType<atlas.Pixel | null>,
      default: null,
    },

    /**
     * The bearing of the map (rotation) in degrees.
     * When the bearing is 0, 90, 180, or 270 the top of the map container will be north, east, south or west respectively.
     * `default 0`
     * @default 0
     */
    bearing: {
      type: Number as PropType<number | null>,
      default: null,
    },

    /**
     * The pitch (tilt) of the map in degrees between 0 and 60, where 0 is looking straight down on the map.
     * `default 0`
     * @default 0
     */
    pitch: {
      type: Number as PropType<number | null>,
      default: null,
    },

    /**
     * The minimum zoom level that the map can be zoomed out to during the animation. Must be between 0 and 24, and less than or equal to `maxZoom`.
     * `default 1`
     * @default 1
     */
    minZoom: {
      type: Number as PropType<number | null>,
      default: null,
    },

    /**
     * The maximum zoom level that the map can be zoomed into during the animation. Must be between 0 and 24, and greater than or equal to `minZoom`.
     * `default 20`
     * @default 20
     */
    maxZoom: {
      type: Number as PropType<number | null>,
      default: null,
    },

    /**
     * The bounds of the map control's camera.
     * `default [-180, -89, 180, 90]`
     * @default [-180, -89, 180, 90]
     */
    bounds: {
      type: Array as PropType<atlas.data.BoundingBox | null>,
      default: null,
    },

    /**
     * An offset of the center of the given bounds relative to the map's center, measured in pixels.
     * `default [0, 0]`
     * @default [0, 0]
     */
    offset: {
      type: Array as PropType<atlas.Pixel | null>,
      default: null,
    },
    /**
     * The amount of padding in pixels to add to the given bounds.
     * `default {top: 0, bottom: 0, left: 0, right: 0}`
     * @default {top: 0, bottom: 0, left: 0, right: 0}
     */
    padding: {
      type: [Object, Number] as PropType<atlas.Padding | number | null>,
      default: null,
    },

    /**
     * If true the map will automatically resize whenever the window's size changes.
     * Otherwise map.resize() must be called.
     * Default `true`.
     * @default true
     */
    autoResize: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * If true, the map's canvas can be exported to a PNG using map.getCanvas().toDataURL().
     * This option may only be set when initializing the map.
     * Default `false`
     * @default false
     */
    preserveDrawingBuffer: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Specfies if multiple copies of the world should be rendered when zoomed out.
     * Default `true`
     * @default true
     */
    renderWorldCopies: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Specifies if the feedback link should be displayed on the map or not.
     * Default `true`
     * @default true
     */
    showFeedbackLink: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Specifies if the Microsoft logo should be hidden or not.
     * If set to true a Microsoft copyright string will be added to the map.
     * Default `true`
     * @default true
     */
    showLogo: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * The name of the style to use when rendering the map. Available styles can be found in the
     * [supported styles]{@link https://docs.microsoft.com/en-us/azure/azure-maps/supported-map-styles} article. The
     * default style is "road".
     */
    mapStyle: {
      type: String as PropType<string | null>,
      default: null,
    },

    /**
     * The language of the map labels.
     * [Supported language]{@link https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages}.
     * Default `atlas.getLanguage()`.
     * @default atlas.getLanguage()
     */
    language: {
      type: String as PropType<string | null>,
      default: null,
    },

    /**
     * Specifies which set of geopolitically disputed borders and labels are displayed on the map. The View parameter (also referred to as “user region parameter”) is a 2-letter ISO-3166 Country Code that will show the correct maps for that country/region. Country/Regions that are not on the View list or if unspecified will default to the “Unified” View.
     * Please see the supported [Views]{@link https://aka.ms/AzureMapsLocalizationViews}
     * It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that You are authorized to access via Azure Maps is made available.
     * default: `undefined`
     * @default undefined
     */
    view: {
      type: String as PropType<string | null>,
      default: null,
    },

    /**
     * Whether the map is interactive or static. If false, all user interaction is disabled.  If true, only selected
     * user interactions will enabled.
     * default `true`
     * @default true
     */
    interactive: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Whether the map should zoom on scroll input.
     * default `true`
     * @default true
     */
    scrollZoomInteraction: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Whether the Shift + left click and drag will draw a zoom box.
     * default `true`
     * @default true
     */
    boxZoomInteraction: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Whether right click and drag will rotate and pitch the map.
     * default `true`
     * @default true
     */
    dragRotateInteraction: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Whether left click and drag will pan the map.
     * default `true`
     * @default true
     */
    dragPanInteraction: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Whether the keyboard interactions are enabled.
     * <style> .k-key { border: 1px solid grey; border-radius: 6px; background-color: #ccc; line-height: 14px;
     * font-size: 14px; padding: 2px; } </style>
     * <p><span class="k-key">+/=</span>: Increase zoom level by 1.</p>
     * <p><span class="k-key">Shift</span> + <span class="k-key">+/=</span>: Increase the zoom level by 2.</p>
     * <p><span class="k-key">-</span>: Decrease zoom level by 1.</p>
     * <p><span class="k-key">Shift</span> + <span class="k-key">-</span>: Decrease zoom level by 2.</p>
     * <p><span class="k-key">⇢</span>: Pan right 100 pixels.</p>
     * <p><span class="k-key">⇠</span>: Pan left 100 pixels.</p>
     * <p><span class="k-key">⇡</span>: Pan up 100 pixels.</p>
     * <p><span class="k-key">⇣</span>: Pan down 100 pixels.</p>
     * <p><span class="k-key">Shift</span> + <span class="k-key">⇢</span>: Rotate 15 degrees clockwise.</p>
     * <p><span class="k-key">Shift</span> + <span class="k-key">⇠</span>: Rotate 15 degrees counter-clockwise.</p>
     * <p><span class="k-key">Shift</span> + <span class="k-key">⇡</span>: Increase pitch by 10 degrees.</p>
     * <p><span class="k-key">Shift</span> + <span class="k-key">⇣</span>: Decrease pitch by 10 degrees.</p>
     * default `true`
     * @default true
     */
    keyboardInteraction: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Whether double left click will zoom the map inwards.
     * default `true`
     * @default true
     */
    dblClickZoomInteraction: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Whether touch interactions are enabled for touch devices.
     * default `true`
     * @default true
     */
    touchInteraction: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
  })

  const mapId = `azure-map`
  const map = ref<atlas.Map | null>(null)
  const isMapReady = ref<boolean>(false)

  const unmountEvents: Array<() => void> = []

  provide('getMap', map)

  onMounted(() => {
    initializeMap()
  })

  onUnmounted(() => {
    map.value?.dispose()

    for (let i = 0; i < unmountEvents.length; i++) {
      unmountEvents[i]()
    }
  })

  function initializeMap(): void {
    map.value =
      new app.appContext.config.globalProperties.$_azureMaps.atlas.Map(
        mapId,
        getOptionsFromProps({
          props: props,
          reservedAttributes: {
            mapStyle: 'style',
          },
        })
      )

    unmountEvents.push(
      addMapEventListeners({
        map: map.value,
        listeners: {
          ready: mapReadyCallback,
        },
      })
    )
  }

  function mapReadyCallback(mapEvent: atlas.MapEvent): void {
    // Emit the custom ready event
    emit(AzureMapEvent.Ready, mapEvent)

    // Indicate that the map instance is ready,
    // which triggers descendent components creation
    isMapReady.value = true

    // Add the map event listeners
    unmountEvents.push(
      addMapEventListeners({
        map: map.value,
        listeners: attrs,
        reservedEventTypes: Object.values(AzureMapEvent),
      })
    )
  }

  watch(
    () => [
      props.authOptions,
      props.subscriptionKey,
      props.sessionId,
      props.enableAccessibility,
      props.refreshExpiredTiles,
      props.transformRequest,
    ],
    () => {
      map?.value?.setServiceOptions(props)
    }
  )

  watch(
    () => [
      props.zoom,
      props.center,
      props.centerOffset,
      props.bearing,
      props.pitch,
      props.minZoom,
      props.maxZoom,
      props.bounds,
      props.offset,
      props.padding,
    ],
    () => {
      map?.value?.setCamera(props)
    }
  )

  watch(
    () => [
      props.autoResize,
      props.renderWorldCopies,
      props.showFeedbackLink,
      props.showLogo,
      props.mapStyle,
      props.language,
      props.view,
    ],
    () => {
      map?.value?.setStyle(props)
    }
  )

  watch(
    () => [
      props.interactive,
      props.scrollZoomInteraction,
      props.boxZoomInteraction,
      props.dragRotateInteraction,
      props.dragPanInteraction,
      props.keyboardInteraction,
      props.dblClickZoomInteraction,
      props.touchInteraction,
    ],
    () => {
      map?.value?.setUserInteraction(props)
    }
  )
</script>
