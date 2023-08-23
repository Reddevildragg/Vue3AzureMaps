<template></template>

<script setup lang="ts">
  import {
    inject,
    onMounted,
    onUnmounted,
    PropType,
    ref,
    useAttrs,
    watch,
  } from 'vue'
  import atlas from 'azure-maps-control'
  import { AzureMapSymbolLayerEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import addMapEventListeners from '@/vue3-azure-maps/utils/addMapEventListeners.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'
  import { VueAzureMap } from '@/vue3-azure-maps/vue3-azure-maps.ts'

  const emit = defineEmits([AzureMapSymbolLayerEvent.Created])

  const vueAzureMaps = inject<VueAzureMap>('azureMaps')
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
    symbolLayer.value = new vueAzureMaps.atlas.layer.SymbolLayer(
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
