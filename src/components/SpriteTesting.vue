<template>
  <div style="width: 100%; height: 100%">
    <AzureMap
      :center="mapOptions.center"
      :language="mapOptions.language"
      :map-style="mapOptions.style"
      :view="mapOptions.view"
      class="AzureMap">
      <!-- Add a custom icon to the map's image sprite -->
      <AzureMapImageSpriteIcon
        id="vue-azure-maps-logo"
        :icon="image"
        @added="customIconAdded" />

      <AzureMapZoomControl />
      <AzureMapPitchControl />
      <AzureMapCompassControl />
      <AzureMapFullscreenControl />
      <AzureMapGeolocationControl />
      <AzureMapStyleControl />

      <!-- Create a Data Source -->
      <AzureMapDataSource v-if="isCustomIconAdded">
        <!-- Add Points to the Data Source -->
        <AzureMapPoint
          v-for="point in points"
          :key="point.properties.name"
          :longitude="point.longitude"
          :latitude="point.latitude" />
        <!-- Add a Symbol Layer to render the Points stored in the Data Source -->
        <AzureMapSymbolLayer :options="customIconSymbolLayerOptions" />
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
    AzureMapImageSpriteIcon,
    AzureMapSymbolLayer,
    AzureMapDataSource,
    AzureMapPoint,
  } from '../Vue3AzureMapsPlugin'
  import { CustomPoint, MapOptions } from '@/Vue3AzureMapsPlugin/types/types.ts'

  import image from '@/assets/img.png'
  import { generateMockPoints } from '@/Vue3AzureMapsPlugin/utils/dataGeneration.ts'
  import atlas from 'azure-maps-control'
  import { ref } from 'vue'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const points: Array<CustomPoint> = generateMockPoints()
  const isCustomIconAdded = ref(false)
  const customIconSymbolLayerOptions = {
    iconOptions: {
      image: 'vue-azure-maps-logo',
      size: 0.1,
    },
  } as atlas.SymbolLayerOptions

  function customIconAdded() {
    isCustomIconAdded.value = true
  }
</script>

<style scoped></style>
