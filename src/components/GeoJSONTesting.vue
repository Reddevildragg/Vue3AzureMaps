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
        <AzureMapSymbolLayer :options="customIconSymbolLayerOptions" />
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
  } from '@/plugin'
  import { MapOptions } from '@/plugin/types'
  import atlas from 'azure-maps-control'
  import AzureMapGeoJson from '@/plugin/components/geometries/AzureMapGeoJson.vue'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const customIconSymbolLayerOptions = {} as atlas.SymbolLayerOptions
</script>

<style></style>
