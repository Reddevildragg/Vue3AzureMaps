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
  import { AzureMapLineLayerEvent } from '@/Vue3AzureMapsPlugin/types/enums.ts'
  import addMapEventListeners from '@/Vue3AzureMapsPlugin/utils/addMapEventListeners.ts'
  import { azureMapStore } from '@/Vue3AzureMapsPlugin/store/azureMapStore.ts'

  const emit = defineEmits([AzureMapLineLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const map = inject('getMap')
  const dataSource = inject('getDataSource')
  const lineLayer = ref<atlas.layer.LineLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.LineLayerOptions | null>,
      default: null,
    },
  })
  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    // Create the polygon layer
    lineLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.LineLayer(
        dataSource,
        props.id || `azure-map-line-layer-${azureMapStore.lineLayerId++}`,
        props.options || undefined
      )

    emit(AzureMapLineLayerEvent.Created, lineLayer.value)
    map.value?.layers.add(lineLayer.value)

    addMapEventListeners({
      map: map.value,
      target: lineLayer.value,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapLineLayerEvent),
    })
  })

  onUnmounted(() => {
    map.value?.layers.remove(lineLayer.value)
  })

  watch(
    () => props.options,
    () => {
      lineLayer.value.setOptions(props.options || {})
    },
    { deep: true }
  )
</script>
