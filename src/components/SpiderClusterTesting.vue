<template>
  <div style="width: 100%; height: 90%">
    <AzureMap
      :center="mapOptions.center"
      :language="mapOptions.language"
      :map-style="mapOptions.style"
      :view="mapOptions.view"
      class="AzureMap"
      @mousedown="hidePopup">
      <AzureMapZoomControl />
      <AzureMapPitchControl />
      <AzureMapCompassControl />
      <AzureMapFullscreenControl />
      <AzureMapGeolocationControl />
      <AzureMapStyleControl />

      <AzureMapDataSource
        :cluster="cluster"
        :cluster-radius="clusterRadius"
        :cluster-max-zoom="clusterMaxZoom">
        <AzureMapPoint
          v-for="point in points"
          :key="point.properties.name"
          :longitude="point.longitude"
          :latitude="point.latitude"
          :properties="point.properties" />

        <AzureMapPopup
          :open="isPopupOpen"
          :position="popupPosition"
          :pixel-offset="popupPixelOffset"
          :close-button="false"
          class="AzureMapPopup">
          <template v-if="selectedPoint">
            <p>
              <strong>{{ selectedPoint.properties.name }}</strong>
            </p>
            <p>
              {{ selectedPoint.properties.description }}
            </p>
          </template>
        </AzureMapPopup>

        <AzureMapBubbleLayer
          :options="bubbleLayerOptions"
          @created="bubbleLayer = $event" />

        <AzureMapSymbolLayer :options="symbolLayerOptions" />
        <AzureMapSymbolLayer
          :options="shapeLayerOptions"
          @created="symbolLayer = $event" />

        <AzureMapSpiderClusterManager
          v-if="bubbleLayer && symbolLayer"
          :cluster-layer="bubbleLayer"
          :unclusted-layer="symbolLayer"
          @feature-selected="onFeatureSelected"
          @feature-unselected="onFeatureUnselected" />
      </AzureMapDataSource>
    </AzureMap>
  </div>
</template>

<script setup lang="ts">
  import {
    AzureMap,
    AzureMapCompassControl,
    AzureMapDataSource,
    AzureMapFullscreenControl,
    AzureMapGeolocationControl,
    AzureMapPitchControl,
    AzureMapStyleControl,
    AzureMapZoomControl,
  } from '../vue3-azure-maps'
  import { MapOptions, CustomPoint } from '@/vue3-azure-maps/types.ts'
  import { generateMockPoints } from '@/vue3-azure-maps/utils/dataGeneration.ts'
  import atlas from 'azure-maps-control'
  import AzureMapPoint from '@/vue3-azure-maps/components/geometries/AzureMapPoint.vue'
  import AzureMapPopup from '@/vue3-azure-maps/components/AzureMapPopup.vue'
  import { ref } from 'vue'
  import AzureMapBubbleLayer from '@/vue3-azure-maps/components/Layers/AzureMapBubbleLayer.vue'
  import AzureMapSymbolLayer from '@/vue3-azure-maps/components/Layers/AzureMapSymbolLayer.vue'
  import AzureMapSpiderClusterManager from '@/vue3-azure-maps/components/AzureMapSpiderClusterManager.vue'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const bubbleLayerOptions = {
    // Scale the size of the clustered bubble based on the number of points inthe cluster.
    radius: [
      'step',
      ['get', 'point_count'],
      20, // Default of 20 pixel radius.
      100,
      30, // If point_count >= 100, radius is 30 pixels.
      750,
      40, // If point_count >= 750, radius is 40 pixels.
    ],

    // Change the color of the cluster based on the value on the point_cluster property of the cluster.
    color: [
      'step',
      ['get', 'point_count'],
      'rgba(0,255,0,0.8)', // Default to green.
      100,
      'rgba(255,255,0,0.8)', // If the point_count >= 100, color is yellow.
      750,
      'rgba(255,0,0,0.8)', // If the point_count >= 100, color is red.
    ],
    strokeWidth: 0,
    blur: 0.5,
    filter: ['has', 'point_count'], // Only rendered data points which have a point_count property, which clusters do.
  } as atlas.BubbleLayerOptions

  const symbolLayerOptions = {
    iconOptions: {
      image: 'none', //Hide the icon image.
    },
    textOptions: {
      textField: '{point_count_abbreviated}',
      offset: [0, 0.4],
    },
  } as atlas.SymbolLayerOptions

  const shapeLayerOptions = {
    filter: ['!', ['has', 'point_count']], // Filter out clustered points from this layer.
  } as atlas.SymbolLayerOptions

  const points: Array<CustomPoint> = generateMockPoints(100)

  // Tell the data source to cluster point data.
  const cluster = true
  // The radius in pixels to cluster points together.
  const clusterRadius = 45
  // The maximium zoom level in which clustering occurs.
  // If you zoom in more than this, all points are rendered as symbols.
  const clusterMaxZoom = 15

  const selectedPoint = ref<CustomPoint | null>()
  const bubbleLayer = ref()
  const symbolLayer = ref()

  const isPopupOpen = ref(false)
  const popupPosition = ref(null)
  const popupPixelOffset = ref(null)

  function showPopup(
    position: atlas.data.Position,
    pixelOffset: atlas.Pixel
  ): void {
    isPopupOpen.value = true
    popupPosition.value = position
    popupPixelOffset.value = pixelOffset
    console.log('show')
  }

  function hidePopup(): void {
    isPopupOpen.value = false
    popupPosition.value = null
    popupPixelOffset.value = null
  }

  function onFeatureSelected(
    shape: atlas.Shape,
    cluster: atlas.data.Feature<atlas.data.Point, unknown> | null
  ): void {
    // Look for the point based on a unique key
    const currentPoint = points.find(
      (point) => point.properties.name === shape.getProperties().name
    )

    if (currentPoint) {
      selectedPoint.value = currentPoint

      if (cluster) {
        showPopup(cluster.geometry.coordinates, [0, 0])
      } else {
        showPopup(shape.getCoordinates() as atlas.data.Position, [0, -20])
      }
    }
  }

  function onFeatureUnselected(): void {
    selectedPoint.value = null
    hidePopup()
  }
</script>

<style scoped></style>
