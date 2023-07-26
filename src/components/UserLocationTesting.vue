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

      <!-- Show user position with an optional accuracy circle -->
      <AzureMapUserPosition
        :center-map-to-user-position="false"
        :show-accuracy="true"
        :enable-high-accuracy="true"
        :symbol-layer-options="userPosition.symbolLayerOptions"
        :camera-options="userPosition.cameraOptions"
        :polygon-layer-options="userPosition.polygonLayerOptions" />
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
    AzureMapUserPosition,
  } from '../vue3-azure-maps'
  import { MapOptions } from '@/vue3-azure-maps/types.ts'
  import atlas from 'azure-maps-control'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const userPosition = {
    symbolLayerOptions: {
      iconOptions: {
        image: 'pin-blue',
      },
    } as atlas.SymbolLayerOptions,
    cameraOptions: {
      zoom: 15,
    } as atlas.CameraOptions,
    polygonLayerOptions: {
      fillColor: 'green',
      opacity: 0.5,
    } as atlas.PolygonLayerOptions,
  }
</script>

<style scoped></style>
