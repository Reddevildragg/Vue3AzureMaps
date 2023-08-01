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
        :cluster="dataSourceOptions.cluster"
        :cluster-radius="dataSourceOptions.clusterRadius"
        :cluster-properties="dataSourceOptions.clusterProperties"
        v-if="points.length > 0">
        <AzureMapPoint
          v-for="point in points"
          :key="point.properties.name"
          :latitude="point.latitude"
          :longitude="point.longitude"
          :properties="point.properties" />

        <azure-map-bubble-layer :options="bubbleMapOptions" />
        <azure-map-symbol-layer :options="symbolLayerOptions" />
        <azure-map-symbol-layer :options="symbolLayerIndividual" />
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
    CustomPoint,
    generateRandomLatitude,
    generateRandomLongitude,
    MapOptions,
    AzureMapPoint,
  } from '../vue3-azure-maps'
  import atlas from 'azure-maps-control'
  import AzureMapGeoJson from '@/vue3-azure-maps/components/geometries/AzureMapGeoJson.vue'
  import AzureMapBubbleLayer from '@/vue3-azure-maps/components/Layers/AzureMapBubbleLayer.vue'
  import AzureMapSymbolLayer from '@/vue3-azure-maps/components/Layers/AzureMapSymbolLayer.vue'
  import { onMounted } from 'vue'

  const mapOptions = {
    center: [-97, 39],
    zoom: 3,
    view: 'Auto',
    style: 'road',
    language: 'en-US',
  } as MapOptions

  const dataSourceOptions = {
    cluster: true,
    clusterRadius: 50,
    clusterProperties: {
      countSum: ['+', ['get', 'count']],
    },
  } as atlas.DataSourceOptions

  const points: Array<CustomPoint> = []
  onMounted(() => {
    for (let i = 0; i < 100; i++) {
      points.push({
        latitude: generateRandomLatitude(),
        longitude: generateRandomLongitude(),
        properties: {
          name: i,
          count: 10,
        },
      })
    }
  })

  const bubbleMapOptions = {
    radius: 20,
    color: [
      'step',
      ['get', 'countSum'],
      'limegreen',
      20,
      'green',
      30,
      'yellow',
      40,
      'orange',
      50,
      'red',
    ],
    strokeWidth: 0,
    filter: ['has', 'point_count'], //Only rendered data points which have a point_count property, which clusters do.
  } as atlas.BubbleLayerOptions

  const symbolLayerOptions = {
    iconOptions: {
      image: 'none',
    },
    textOptions: {
      //Calculate the average and display it.
      textField: ['get', 'countSum'],
      offset: [0, 0.4],
      color: 'white',
    },
  } as atlas.SymbolLayerOptions

  const symbolLayerIndividual = {
    filter: ['!', ['has', 'point_count']], //Filter out clustered points from this layer.
    textOptions: {
      //Calculate the average and display it.
      textField: ['get', 'countSum'],
      offset: [0, 0.4],
      color: 'white',
    },
  } as atlas.SymbolLayerOptions
</script>

<style scoped></style>
