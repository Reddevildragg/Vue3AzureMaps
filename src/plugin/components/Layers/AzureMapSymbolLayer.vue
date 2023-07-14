<template></template>

<script setup lang="ts">
  import {
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    ref,
  } from 'vue'
  import atlas from 'azure-maps-control'
  import { AzureMapSymbolLayerEvent } from '@/plugin/enums.ts'

  const emit = defineEmits([AzureMapSymbolLayerEvent.Created])

  const state = ref(0)
  const app = getCurrentInstance()

  const map = ref<atlas.Map | null>(null)
  const dataSource = ref<atlas.source.DataSource | null>(null)
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
    dataSource.value = inject('getDataSource').value
    map.value = inject('getMap').value

    // Create the symbol layer
    symbolLayer.value =
      new app.appContext.config.globalProperties.$_azureMaps.atlas.layer.SymbolLayer(
        dataSource,
        props.id || `azure-map-symbol-layer-${state.value}`,
        props.options || undefined
      )

    emit(AzureMapSymbolLayerEvent.Created, symbolLayer.value)

    map.value.layers.add(symbolLayer.value)
  })

  onUnmounted(() => {
    map.value.layers.remove(symbolLayer.value)
  })
</script>

<style scoped lang="scss"></style>
