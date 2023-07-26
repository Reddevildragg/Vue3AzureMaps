<template></template>

<script setup lang="ts">
  import {
    computed,
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    ref,
  } from 'vue'
  import atlas, {
    ControlPosition,
    ControlStyle,
    Shape,
  } from 'azure-maps-control'
  import { AzureMapPointEvent } from '@/vue3-azure-maps/types/enums.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'

  const currentInstance = getCurrentInstance()
  const map = inject('getMap')
  const dataSource = inject('getDataSource')

  let shape: Shape
  const props = defineProps({
    id: {
      type: String,
      default: '',
    },
    coordinates: {
      type: Array as PropType<atlas.data.Position[] | null>,
      default: null,
    },
    properties: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  })

  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    // Create a shape from the line string geometry
    shape =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.Shape(
        new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.data.LineString(
          props.coordinates || []
        ),
        props.id || `azure-map-line-string-${azureMapStore.lineStringId}`,
        props.properties
      )

    dataSource.value?.add([shape])
  })

  onUnmounted(() => {
    dataSource.value?.remove(shape)
  })
</script>
