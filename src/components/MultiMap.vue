<template>
  <point-testing style="height: 40%"></point-testing>
  <bubble-map-testing style="height: 40%"></bubble-map-testing>
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
    CustomPoint,
    MapOptions,
  } from '../vue3-azure-maps'
  import atlas from 'azure-maps-control'
  import { generateMockPoints } from '@/vue3-azure-maps/utils/dataGeneration.ts'
  import PointTesting from '@/components/PointTesting.vue'
  import BubbleMapTesting from '@/components/bubbleMapTesting.vue'

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
