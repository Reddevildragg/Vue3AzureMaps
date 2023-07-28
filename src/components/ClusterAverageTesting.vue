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
        :cluster-properties="dataSourceOptions.clusterProperties">
        <azure-map-geo-json
          geo-json-url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson" />

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
    MapOptions,
  } from '../vue3-azure-maps'
  import atlas from 'azure-maps-control'
  import AzureMapGeoJson from '@/vue3-azure-maps/components/geometries/AzureMapGeoJson.vue'
  import AzureMapBubbleLayer from '@/vue3-azure-maps/components/Layers/AzureMapBubbleLayer.vue'
  import AzureMapSymbolLayer from '@/vue3-azure-maps/components/Layers/AzureMapSymbolLayer.vue'

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
      magnitudeSum: ['+', ['get', 'mag']],
    },
  } as atlas.DataSourceOptions

  const bubbleMapOptions = {
    radius: 20,
    color: [
      'step',
      ['/', ['get', 'magnitudeSum'], ['get', 'point_count']],
      'limegreen',
      2,
      'green',
      3,
      'yellow',
      4,
      'orange',
      5,
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
      textField: [
        'number-format',
        ['/', ['get', 'magnitudeSum'], ['get', 'point_count']],
        { 'max-fraction-digits': 2 },
      ],
      offset: [0, 0.4],
      color: 'white',
    },
  } as atlas.SymbolLayerOptions

  const symbolLayerIndividual = {
    filter: ['!', ['has', 'point_count']], //Filter out clustered points from this layer.
  } as atlas.SymbolLayerOptions
</script>

<style scoped></style>
