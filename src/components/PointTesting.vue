<template>
  <div style="width: 100%; height: 100%">
    <AzureMap
      :center="mapOptions.center"
      :language="mapOptions.language"
      :map-style="mapOptions.style"
      :view="mapOptions.view"
      class="AzureMap">
      <AzureMapZoomControl />
      <AzureMapPitchControl />
      <AzureMapCompassControl />
      <AzureMapFullscreenControl />
      <AzureMapGeolocationControl />
      <AzureMapStyleControl />

      <!-- Create a Data Source -->
      <AzureMapDataSource v-if="points">
        <!-- Add Points to the Data Source -->
        <AzureMapPoint
          v-for="point in points"
          :key="point.properties.name"
          :longitude="point.longitude"
          :latitude="point.latitude" />

        <AzureMapSymbolLayer :options="customIconSymbolLayerOptions" />
      </AzureMapDataSource>
    </AzureMap>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    AzureMap,
    AzureMapCompassControl,
    AzureMapDataSource,
    AzureMapFullscreenControl,
    AzureMapGeolocationControl,
    AzureMapPitchControl,
    AzureMapPoint,
    AzureMapStyleControl,
    AzureMapSymbolLayer,
    AzureMapZoomControl,
  } from '@/plugin'
  import { CustomPoint, MapOptions } from '@/plugin/types'
  import atlas from 'azure-maps-control'
  import { generateMockPoints } from '@/plugin/utils/dataGeneration.ts'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const customIconSymbolLayerOptions = {} as atlas.SymbolLayerOptions

  const points: Array<CustomPoint> = generateMockPoints()
</script>

<style scoped></style>
