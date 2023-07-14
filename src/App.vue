<template>
  <div style="width: 100%; height: 100%">
    <AzureMap
      :center="mapOptions.center"
      :language="mapOptions.language"
      :map-style="mapOptions.style"
      :view="mapOptions.view"
      class="AzureMap"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mousedown="onMouseDown">
      <AzureMapZoomControl />
      <AzureMapPitchControl />
      <AzureMapCompassControl />
      <AzureMapFullscreenControl />
      <AzureMapGeolocationControl />
      <AzureMapStyleControl />

      <!-- Create a Data Source -->
      <AzureMapDataSource v-if="points">
        <AzureMapCircle
          v-if="points.length > 0"
          :longitude="points[0].longitude"
          :latitude="points[0].latitude"
          :radius="1000" />

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
  import {
    AzureMap,
    AzureMapCompassControl,
    AzureMapFullscreenControl,
    AzureMapGeolocationControl,
    AzureMapPitchControl,
    AzureMapStyleControl,
    AzureMapZoomControl,
    AzureMapDataSource,
    AzureMapPoint,
    AzureMapSymbolLayer,
    AzureMapCircle,
  } from '@/plugin'
  import atlas from 'azure-maps-control'
  import { onMounted } from 'vue'

  type MapOptions = atlas.ServiceOptions &
    atlas.CameraOptions &
    atlas.StyleOptions &
    atlas.UserInteractionOptions

  type CustomPoint = {
    longitude: number
    latitude: number
    properties: Record<string, unknown>
  }

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const customIconSymbolLayerOptions = {} as atlas.SymbolLayerOptions

  function onMouseDown(e: atlas.MapMouseEvent): void {
    // console.log(e)
  }

  function onMouseMove(e: atlas.MapMouseEvent): void {
    //console.log(e)
  }

  function onMouseUp(e: atlas.MapMouseEvent): void {
    // console.log(e)
  }

  const points: Array<CustomPoint> = []

  onMounted(() => {
    generateMockPoints()
  })

  function generateMockPoints(mockPointSize: number = 5): void {
    // Generate a bunch of points with random coordinates
    for (let i = 0; i < mockPointSize; i++) {
      points.push({
        longitude: generateRandomLongitude(),
        latitude: generateRandomLatitude(),
        properties: {
          name: `Point-${i}`,
          description: `This is a popup for Point-${i}.`,
          isPopupOpen: false,
          subType: 'Circle',
          radius: 100,
        },
      })
    }
  }

  function generateRandomLongitude(): number {
    return Math.random() * 360 - 180
  }

  function generateRandomLatitude(): number {
    return Math.random() * 170 - 85
  }
</script>

<style scoped>
  .AzureMap {
    width: 100%;
    height: 100%;
  }
</style>
