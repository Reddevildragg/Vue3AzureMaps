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

      <AzureMapHtmlMarker :position="[-122.33, 47.6]" :draggable="true">
        <div class="pulseIcon"></div>
      </AzureMapHtmlMarker>

      <AzureMapHtmlMarker :position="[-122.33, 52.6]" :draggable="true" />
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
    MapOptions,
    AzureMapHtmlMarker,
  } from '../vue3-azure-maps'

  const mapOptions = {
    center: [-122.33, 47.6],
    style: 'road',
    view: 'Auto',
    language: 'en-US',
  } as MapOptions
</script>

<style>
  .pulseIcon {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: orange;
    border: 2px solid white;
    cursor: pointer;
    box-shadow: 0 0 0 rgba(0, 204, 255, 0.4);
    animation: pulse 3s infinite;
  }

  .pulseIcon:hover {
    animation: none;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 204, 255, 0.4);
    }

    70% {
      box-shadow: 0 0 0 50px rgba(0, 204, 255, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(0, 204, 255, 0);
    }
  }
</style>
