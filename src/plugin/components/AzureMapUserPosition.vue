<template>
  <AzureMapDataSource v-if="hasPosition">
    <AzureMapCircle
      v-if="showAccuracy && radius"
      :longitude="longitude"
      :latitude="latitude"
      :radius="radius"
      @[circleEventName]="$emit(circleEventName, $event)" />
    <AzureMapPoint :longitude="longitude" :latitude="latitude" />
    <AzureMapPolygonLayer
      v-if="showAccuracy"
      :options="polygonLayerOptions || undefined" />
    <AzureMapSymbolLayer :options="userPositionSymbolLayerOptions" />
  </AzureMapDataSource>
</template>

<script setup lang="ts">
  import {
    getCurrentInstance,
    inject,
    ref,
    computed,
    onMounted,
    PropType,
  } from 'vue'
  import atlas from 'azure-maps-control'
  import { AzureMapUserPositionEvent } from '@/plugin/types/enums.ts'
  import {
    AzureMapPoint,
    AzureMapSymbolLayer,
    AzureMapPolygonLayer,
    AzureMapCircle,
    AzureMapDataSource,
  } from '@/plugin'

  const props = defineProps({
    /**
     * Indicates the application would like to receive the best possible results.
     * If true and if the device is able to provide a more accurate position, it will do so.
     */
    enableHighAccuracy: {
      type: Boolean,
      default: false,
    },

    /**
     * integer (milliseconds]) | infinity - maximum cached position age.
     */
    maximumAge: {
      type: Number,
      default: null,
    },

    /**
     * integer (milliseconds]) - amount of time before the error callback is invoked, if 0 it will never invoke.
     */
    timeout: {
      type: Number,
      default: null,
    },

    /**
     * Flag that controls if an accuracy circle polygon will be shown
     */
    showAccuracy: {
      type: Boolean,
      default: false,
    },

    /**
     * Override the user position accuracy used for the circle polygon radius
     */
    accuracy: {
      type: Number,
      default: null,
    },

    /**
     * Flag that controls if the map will center on the users position
     */
    centerMapToUserPosition: {
      type: Boolean,
      default: false,
    },

    /**
     * If `centerMapToUserPosition` is true, this options are passed to the `map.setCamera` method
     */
    cameraOptions: {
      type: Object as PropType<
        | null
        | (atlas.CameraOptions & atlas.AnimationOptions)
        | (atlas.CameraBoundsOptions & atlas.AnimationOptions)
      >,
      default: null,
    },

    /**
     * The symbol layer options for the user position point
     */
    symbolLayerOptions: {
      type: Object as PropType<null | atlas.SymbolLayerOptions>,
      default: null,
    },

    /**
     * The polygon layer options for the accuracy circle polygon
     */
    polygonLayerOptions: {
      type: Object as PropType<null | atlas.PolygonLayerOptions>,
      default: null,
    },
  })

  const emit = defineEmits([
    AzureMapUserPositionEvent.Error,
    AzureMapUserPositionEvent.UnknownError,
    AzureMapUserPositionEvent.PositionUnavailable,
    AzureMapUserPositionEvent.Ready,
    AzureMapUserPositionEvent.Success,
    AzureMapUserPositionEvent.PermissionDenied,
    AzureMapUserPositionEvent.Timeout,
  ])

  const currentInstance = getCurrentInstance()
  const map = inject('getMap')

  const longitude = ref<number>(0)
  const latitude = ref<number>(0)
  const radius = ref<number>(0)

  const hasPosition = ref<boolean>(false)
  const error = ref<GeolocationPositionError | null>(null)

  const defaultSymbolLayerOptions = {
    filter: [
      'any',
      ['==', ['geometry-type'], 'Point'],
      ['==', ['geometry-type'], 'MultiPoint'],
    ], // Only render Point or MultiPoints in this layer.
  }

  const circleEventName = computed(() =>
    props.showAccuracy ? 'circle-coordinates' : null
  )

  const userPositionSymbolLayerOptions = computed(() => {
    return {
      ...(props.symbolLayerOptions || {}),
      ...defaultSymbolLayerOptions,
    }
  })

  onMounted(async () => {
    if (!map?.value || !currentInstance) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        error.value = null
        emit(AzureMapUserPositionEvent.Success, position)

        longitude.value = position.coords.longitude
        latitude.value = position.coords.latitude

        if (props.showAccuracy) {
          radius.value = props.accuracy || position.coords.accuracy
        }

        hasPosition.value = true

        if (props.centerMapToUserPosition) {
          map.value?.setCamera({
            ...(props.cameraOptions || {}),
            center: [longitude.value, latitude.value],
          })
        }

        emit(AzureMapUserPositionEvent.Ready)
      },
      (e) => {
        hasPosition.value = false
        error.value = e
      }
    )
  })
</script>

<style scoped lang="scss"></style>
