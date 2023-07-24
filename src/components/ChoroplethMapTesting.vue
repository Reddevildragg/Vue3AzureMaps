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

      <azure-map-data-source>
        <azure-map-geo-json
          geo-json-url="https://raw.githubusercontent.com/Azure-Samples/AzureMapsCodeSamples/main/Static/data/geojson/US_States_Population_Density.json" />
        <azure-map-polygon-layer
          :options="polygonOptions"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave" />

        <azure-map-popup :open="isPopupOpen" :position="popupPosition">
          <div style="padding: 10px" v-if="properties">
            <b> {{ properties.name }}</b>
            <br />Population Density: {{ properties.density }} people
          </div>
        </azure-map-popup>
      </azure-map-data-source>
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
  } from '../vue-3-azure-maps'
  import { MapOptions } from '@/vue-3-azure-maps/types.ts'
  import atlas from 'azure-maps-control'
  import AzureMapPolygonLayer from '@/vue-3-azure-maps/components/Layers/AzureMapPolygonLayer.vue'
  import AzureMapGeoJson from '@/vue-3-azure-maps/components/geometries/AzureMapGeoJson.vue'
  import AzureMapPopup from '@/vue-3-azure-maps/components/AzureMapPopup.vue'
  import { ref } from 'vue'

  const s = '<div style="padding: 10px"><b>hello world</b></div>'
  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  const isPopupOpen = ref(false)
  const popupPosition = ref(null)
  const properties = ref(null)

  const defaultColor = '#FFEDA0'
  const colorScale = [
    10,
    '#FED976',
    20,
    '#FEB24C',
    50,
    '#FD8D3C',
    100,
    '#FC4E2A',
    200,
    '#E31A1C',
    500,
    '#BD0026',
    1000,
    '#800026',
  ]

  //Create a stepped expression based on the color scale.
  let steppedExp = ['step', ['get', 'density'], defaultColor]
  steppedExp = steppedExp.concat(colorScale)

  const polygonOptions = {
    fillColor: steppedExp,
  } as atlas.PolygonLayerOptions

  function onMouseMove(e: atlas.MapMouseEvent) {
    if (e.shapes && e.shapes.length > 0) {
      properties.value = e.shapes[0].data.properties
      popupPosition.value = e.position
      isPopupOpen.value = true
    }
  }

  function onMouseLeave(e: atlas.MapMouseEvent) {
    isPopupOpen.value = false
  }
</script>

<style scoped></style>
