<template>
  <div style="width: 100%; height: 90%">
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
      <AzureMapDataSource>
        <!-- Add Line Strings to the Data Source -->
        <AzureMapLineString
          v-for="lineString in lines"
          :key="lineString.name"
          :coordinates="lineString.coordinates" />
        <!-- Add a Line Layer to render the Line Strings stored in the Data Source -->
        <AzureMapLineLayer :options="lineLayerOptions" />
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
    AzureMapLineLayer,
    MapOptions,
    CustomLine,
  } from '../vue3-azure-maps'
  import { generateMockLineStrings } from '@/vue3-azure-maps/utils/dataGeneration.ts'
  import atlas from 'azure-maps-control'
  import AzureMapLineString from '@/vue3-azure-maps/components/geometries/AzureMapLineString.vue'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const lineLayerOptions = {
    strokeColor: '#41B883',
    strokeWidth: 1,
  } as atlas.LineLayerOptions

  const lines: Array<CustomLine> = generateMockLineStrings()

  console.log('lines', lines)
</script>

<style scoped></style>
