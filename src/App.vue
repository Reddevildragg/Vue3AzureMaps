<template>
  <div style="width: 550px; height: 100%">
    <AzureMap
      :center="mapOptions.center"
      :language="mapOptions.language"
      :map-style="mapOptions.style"
      :view="mapOptions.view"
      class="AzureMap"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mousedown="onMouseDown">
      <azure-map-zoom-control />
    </AzureMap>
  </div>
</template>

<script setup lang="ts">
  import { AzureMap } from '@/plugin'
  import AzureMapZoomControl from '@/plugin/components/controls/AzureMapZoomControl.vue'
  import atlas from 'azure-maps-control'

  type MapOptions = atlas.ServiceOptions &
    atlas.CameraOptions &
    atlas.StyleOptions &
    atlas.UserInteractionOptions

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions

  function onMouseDown(e: atlas.MapMouseEvent): void {
    console.log(e)
  }

  function onMouseMove(e: atlas.MapMouseEvent): void {
    console.log(e)
  }

  function onMouseUp(e: atlas.MapMouseEvent): void {
    console.log(e)
  }
</script>

<style scoped>
  .AzureMap {
    width: 100%;
    height: 100%;
  }
</style>
