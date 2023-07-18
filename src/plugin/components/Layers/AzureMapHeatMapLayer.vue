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
  import { azureMapStore } from '@/plugin/store/azureMapStore.ts'
  import { watch } from 'vue/dist/vue'

  const emit = defineEmits([AzureMapHeatMapLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const map = inject('getMap')
  const dataSource = inject('getDataSource')
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
    if (!map?.value || !currentInstance) {
      return
    }

    // Create the polygon layer
    heatMapLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.HeatMapLayer(
        dataSource,
        props.id ||
          `azure-map-heat-map-layer-${azureMapStore.heatMapLayerId++}`,
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

  watch(
    () => props.options,
    () => {
      heatMapLayer.value.setOptions(props.options || {})
    },
    { deep: true }
  )
</script>

<style scoped lang="scss"></style>
