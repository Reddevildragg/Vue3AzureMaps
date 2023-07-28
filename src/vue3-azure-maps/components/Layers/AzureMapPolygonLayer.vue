<template></template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import atlas from 'azure-maps-control'
  import {
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    useAttrs,
  } from 'vue'
  import { AzureMapPolygonLayerEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import addMapEventListeners from '@/vue3-azure-maps/utils/addMapEventListeners.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'

  const emit = defineEmits([AzureMapPolygonLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const map = inject('getMap')
  const dataSource = inject('getDataSource')
  const polygonLayer = ref<atlas.layer.PolygonLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.PolygonLayerOptions | null>,
      default: null,
    },
  })
  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    // Create the polygon layer
    polygonLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.PolygonLayer(
        dataSource,
        props.id || `azure-map-polygon-layer-${azureMapStore.polygonLayerId++}`,
        props.options || undefined
      )

    emit(AzureMapPolygonLayerEvent.Created, polygonLayer.value)
    map.value?.layers.add(polygonLayer.value)

    addMapEventListeners({
      map: map.value,
      target: polygonLayer.value,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapPolygonLayerEvent),
    })
  })

  onUnmounted(() => {
    map.value?.layers.remove(polygonLayer.value)
  })

  watch(
    () => props.options,
    () => {
      polygonLayer.value.setOptions(props.options || {})
    },
    { deep: true }
  )
</script>
