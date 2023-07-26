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
      <AzureMapDataSource>
        <AzureMapGeoJson
          geo-json-url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson" />
        />
        <AzureMapSymbolLayer :options="customIconSymbolLayerOptions" />
        <AzureMapLineLayer :options="lineLayerOptions" />
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
    AzureMapPoint,
    AzureMapStyleControl,
    AzureMapSymbolLayer,
    AzureMapZoomControl,
  } from '../vue3-azure-maps'
  import { MapOptions } from '@/vue3-azure-maps/types.ts'
  import atlas from 'azure-maps-control'
  import AzureMapGeoJson from '@/vue3-azure-maps/components/geometries/AzureMapGeoJson.vue'
  import AzureMapLineLayer from '@/vue3-azure-maps/components/Layers/AzureMapLineLayer.vue'
  import AzureMapPolygonLayer from '@/vue3-azure-maps/components/Layers/AzureMapPolygonLayer.vue'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const customIconSymbolLayerOptions = {} as atlas.SymbolLayerOptions

  const lineLayerOptions = {
    strokeColor: '#41B883',
    strokeWidth: 1,
  } as atlas.LineLayerOptions

  const polygonLayerOptions = {
    fillColor: 'green',
    opacity: 0.5,
  } as atlas.PolygonLayerOptions
</script>

<style></style>
