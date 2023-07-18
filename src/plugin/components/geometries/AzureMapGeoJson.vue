<template></template>

<script setup lang="ts">
  import { getCurrentInstance, inject, onMounted, onUnmounted } from 'vue'
  import { Shape } from 'azure-maps-control'

  const currentInstance = getCurrentInstance()
  const map = inject('getMap')
  const dataSource = inject('getDataSource')
  let shape: Shape

  const props = defineProps({
    geoJsonUrl: {
      type: String,
      default: '',
    },
  })

  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    dataSource.value?.importDataFromUrl(props.geoJsonUrl)
  })

  onUnmounted(() => {
    dataSource.value?.remove(shape)
  })
</script>
