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
      <AzureMapDataSource
        :cluster="true"
        :cluster-radius="45"
        :cluster-max-zoom="15">
        <!-- Add Points to the Data Source -->
        <AzureMapPoint
          v-for="point in points"
          :key="point.properties.name"
          :longitude="point.longitude"
          :latitude="point.latitude" />
        <!-- Add a Bubble Layer to render the clustered Points stored in the Data Source -->
        <AzureMapBubbleLayer :options="bubbleLayerOptions" />
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
    AzureMapBubbleLayer,
    AzureMapDataSource,
    AzureMapPoint,
  } from '../Vue3AzureMaps'
  import { CustomPoint, MapOptions } from '@/Vue3AzureMaps/types.ts'

  import { generateMockPoints } from '@/Vue3AzureMaps/utils/dataGeneration.ts'
  import atlas from 'azure-maps-control'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const points: Array<CustomPoint> = generateMockPoints()
  const bubbleLayerOptions = {
    radius: 5,
    strokeColor: '#4288f7',
    strokeWidth: 6,
    color: 'white',
    blur: 0.5,
  } as atlas.BubbleLayerOptions
</script>

<style scoped></style>
