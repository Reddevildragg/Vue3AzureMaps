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
        <!-- Add Polygons to the Data Source -->
        <AzureMapPolygon
          v-for="polygon in polygons"
          :key="polygon.name"
          :coordinates="polygon.coordinates" />
        <!-- Add a Polygon Layer to render the Polygons stored in the Data Source -->
        <AzureMapPolygonLayer :options="polygonLayerOptions" />
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
  import { CustomPoint, MapOptions } from '@/vue3-azure-maps/types.ts'
  import { generateMockPolygons } from '@/vue3-azure-maps/utils/dataGeneration.ts'
  import atlas from 'azure-maps-control'
  import AzureMapPolygon from '@/vue3-azure-maps/components/geometries/AzureMapPolygon.vue'
  import AzureMapPolygonLayer from '@/vue3-azure-maps/components/Layers/AzureMapPolygonLayer.vue'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const polygonLayerOptions = {
    fillColor: 'green',
    opacity: 0.5,
  } as atlas.PolygonLayerOptions

  const polygons: Array<CustomPoint> = generateMockPolygons()
</script>

<style scoped></style>
