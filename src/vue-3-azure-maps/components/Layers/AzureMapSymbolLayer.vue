<template></template>

<script setup lang="ts">
  import {
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    ref,
    useAttrs,
    watch,
  } from 'vue'
  import atlas from 'azure-maps-control'
  import { AzureMapSymbolLayerEvent } from '@/vue-3-azure-maps/types/enums.ts'
  import addMapEventListeners from '@/vue-3-azure-maps/utils/addMapEventListeners.ts'
  import { azureMapStore } from '@/vue-3-azure-maps/store/azureMapStore.ts'

  const emit = defineEmits([AzureMapSymbolLayerEvent.Created])

  const app = getCurrentInstance()

  const attrs = useAttrs()
  const map = inject('getMap')
  const dataSource = inject('getDataSource') // ref<atlas.source.DataSource | null>(null)
  const symbolLayer = ref<atlas.layer.SymbolLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.SymbolLayerOptions | null>,
      default: null,
    },
  })

  onMounted(() => {
    // Create the symbol layer
    symbolLayer.value =
      new app.appContext.config.globalProperties.$_azureMaps.atlas.layer.SymbolLayer(
        dataSource,
        props.id || `azure-map-symbol-layer-${azureMapStore.symbolLayerId++}`,
        props.options || undefined
      )

    emit(AzureMapSymbolLayerEvent.Created, symbolLayer.value)

    map.value?.layers.add(symbolLayer.value)

    addMapEventListeners({
      map: map.value,
      target: symbolLayer.value,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapSymbolLayerEvent),
    })
  })

  onUnmounted(() => {
    map.value?.layers.remove(symbolLayer.value)
  })

  watch(
    () => props.options,
    () => {
      symbolLayer.value.setOptions(props.options || {})
    },
    { deep: true }
  )
</script>
