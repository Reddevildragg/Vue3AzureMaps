<template></template>

<script setup lang="ts">
  import { ref } from 'vue'
  import atlas from 'azure-maps-control'
  import {
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    useAttrs,
  } from 'vue'
  import { AzureMapHeatMapLayerEvent } from '@/plugin/types/enums.ts'
  import addMapEventListeners from '@/plugin/utils/addMapEventListeners.ts'

  const emit = defineEmits([AzureMapHeatMapLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const state = ref(0)
  const map = ref<atlas.Map | null>(null)
  const dataSource = ref<atlas.source.DataSource | null>(null)
  const heatMapLayer = ref<atlas.layer.HeatMapLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.HeatMapLayerOptions | null>,
      default: null,
    },
  })

  onMounted(() => {
    dataSource.value = inject('getDataSource').value
    map.value = inject('getMap').value

    if (!map?.value || !currentInstance) {
      return
    }

    // Create the polygon layer
    heatMapLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.HeatMapLayer(
        dataSource,
        props.id || `azure-map-heat-map-layer-${state.value++}`,
        props.options || undefined
      )

    emit(AzureMapHeatMapLayerEvent.Created, heatMapLayer.value)

    map.value?.layers.add(heatMapLayer.value)

    addMapEventListeners({
      map: map.value,
      target: heatMapLayer.value,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapHeatMapLayerEvent),
    })
  })

  onUnmounted(() => {
    map.value?.layers.remove(heatMapLayer.value)
  })
</script>

<style scoped lang="scss"></style>
