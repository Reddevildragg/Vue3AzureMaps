<template></template>

<script setup lang="ts">
  import { inject, onMounted, onUnmounted, PropType, ref } from 'vue'
  import atlas, {
    ControlPosition,
    ControlStyle,
    Shape,
  } from 'azure-maps-control'
  import { AzureMapPointEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'
  import { VueAzureMap } from '@/vue3-azure-maps/vue3-azure-maps.ts'

  const vueAzureMaps = inject<VueAzureMap>('azureMaps')
  const map = inject('getMap')
  const dataSource = inject('getDataSource')

  let shape: Shape
  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    coordinates: {
      type: Array as PropType<
        atlas.data.Position[] | atlas.data.Position[][] | null
      >,
      default: null,
    },

    properties: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  })

  onMounted(() => {
    if (!map?.value || !vueAzureMaps) {
      return
    }

    // Create a shape from the line string geometry
    shape = new vueAzureMaps.atlas.Shape(
      new vueAzureMaps.atlas.data.Polygon(props.coordinates || []),
      props.id || `azure-map-polygon-${azureMapStore.mapPolygonId}`,
      props.properties
    )

    dataSource.value?.add([shape])
  })

  onUnmounted(() => {
    dataSource.value?.remove(shape)
  })
</script>
