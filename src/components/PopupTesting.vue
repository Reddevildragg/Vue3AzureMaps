<template>
  <div style="width: 100%; height: 100%">
    <AzureMap
      :center="mapOptions.center"
      :language="mapOptions.language"
      :map-style="mapOptions.style"
      :view="mapOptions.view"
      class="AzureMap"
      @mouseup="onMouseUp">
      <AzureMapZoomControl />
      <AzureMapPitchControl />
      <AzureMapCompassControl />
      <AzureMapFullscreenControl />
      <AzureMapGeolocationControl />
      <AzureMapStyleControl />

      <!-- Create a Data Source -->
      <AzureMapDataSource>
        <!-- Add a Symbol Layer to render the Points stored in the Data Source -->
        <AzureMapSymbolLayer
          :options="symbolLayerOptions"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          @mousedown="onMouseDown" />

        <AzureMapPoint
          v-for="point in points"
          :key="point.properties.name"
          :longitude="point.longitude"
          :latitude="point.latitude"
          :properties="point.properties" />

        <AzureMapPopup
          v-for="point in points"
          :key="`Popup-${point.properties.name}`"
          :open="point.properties.isPopupOpen"
          :position="[point.longitude, point.latitude]"
          :pixel-offset="[0, -18]"
          :close-button="false"
          class="AzureMapPopup">
          <p>
            <strong>{{ point.properties.name }}</strong>
          </p>
          <p>
            {{ point.properties.description }}
          </p>
        </AzureMapPopup>
      </AzureMapDataSource>
    </AzureMap>
  </div>
</template>

<script setup lang="ts">
  import {
    AzureMap,
    AzureMapCompassControl,
    AzureMapFullscreenControl,
    AzureMapGeolocationControl,
    AzureMapPitchControl,
    AzureMapStyleControl,
    AzureMapZoomControl,
    AzureMapSymbolLayer,
    AzureMapDataSource,
    AzureMapPoint,
    AzureMapPopup,
  } from '@/plugin'
  import { CustomPoint, MapOptions } from '@/plugin/types'

  import { generateMockPoints } from '@/plugin/utils/dataGeneration.ts'
  import atlas from 'azure-maps-control'
  import { ref } from 'vue'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const points: Array<CustomPoint> = generateMockPoints(1)

  const symbolLayerOptions = {
    iconOptions: {
      ignorePlacement: true,
      allowOverlap: true,
      image: 'pin-red',
    },
  } as atlas.SymbolLayerOptions

  const selectedPoint = ref()
  const selectedShape = ref()

  function onMouseEnter(e: atlas.MapMouseEvent) {
    if (e.shapes && e.shapes.length > 0) {
      // Capture the selected shape.
      selectedShape.value = e.shapes[0] as atlas.Shape
      // Check if the point is in our data
      const point = getCustomPointByName(
        selectedShape.value.getProperties().name
      )

      if (point) {
        // Capture the selected point.
        selectedPoint.value = point

        // Show the popup
        point.properties.isPopupOpen = true
      }
    }
  }

  function onMouseLeave() {
    // Hide the popup
    if (selectedPoint.value) {
      selectedPoint.value.properties.isPopupOpen = false

      // Stop tracking the selected point.
      selectedPoint.value = null
    }
  }

  function onMouseDown(e: atlas.MapMouseEvent) {
    console.log(selectedPoint.value)
    if (e.shapes && e.shapes.length > 0) {
      // Capture the selected shape.
      selectedShape.value = e.shapes[0] as atlas.Shape
      // Lock the maps ability to pan so that we can drag the symbol.
      e.map.setUserInteraction({
        dragPanInteraction: false,
      })
    }
  }

  function onMouseUp(e: atlas.MapMouseEvent): void {
    // Stop tracking the selected shape.
    selectedShape.value = null
    // Make map panable again.
    e.map?.setUserInteraction({
      dragPanInteraction: true,
    })
  }

  function getCustomPointByName(name: string): CustomPoint | undefined {
    return points.find((p) => p.properties.name === name)
  }
</script>

<style scoped></style>
