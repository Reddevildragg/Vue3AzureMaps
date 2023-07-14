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
  } from 'vue'
  import atlas from 'azure-maps-control'
  import { AzureMapSymbolLayerEvent } from '@/plugin/types/enums.ts'
  import addMapEventListeners from '@/plugin/utils/addMapEventListeners.ts'

  const emit = defineEmits([AzureMapSymbolLayerEvent.Created])

  const state = ref(0)
  const app = getCurrentInstance()

  const attrs = useAttrs()
  const map = inject('getMap') // ref<atlas.Map | null>(null)
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
        props.id || `azure-map-symbol-layer-${state.value}`,
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
</script>

<style scoped lang="scss"></style>
