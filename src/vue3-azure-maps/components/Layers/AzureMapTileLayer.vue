<template></template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import atlas from 'azure-maps-control'
  import { inject, onMounted, onUnmounted, PropType, useAttrs } from 'vue'
  import { AzureMapTileLayerEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import addMapEventListeners from '@/vue3-azure-maps/utils/addMapEventListeners.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'
  import { VueAzureMap } from '@/vue3-azure-maps/vue3-azure-maps.ts'

  const emit = defineEmits([AzureMapTileLayerEvent.Created])

  const attrs = useAttrs()
  const vueAzureMaps = inject<VueAzureMap>('azureMaps')
  const map = inject('getMap')
  const dataSource = inject('getDataSource')
  const tileLayer = ref<atlas.layer.TileLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.TileLayerOptions | null>,
      default: null,
    },
  })

  onMounted(() => {
    if (!map?.value || !vueAzureMaps) {
      return
    }

    // Create the polygon layer
    tileLayer.value = new vueAzureMaps.atlas.layer.TileLayer(
      props.options || undefined,
      props.id || `azure-map-tile-layer-${azureMapStore.tileLayerId++}`
    )

    emit(AzureMapTileLayerEvent.Created, tileLayer.value)
    map.value?.layers.add(tileLayer.value)

    addMapEventListeners({
      map: map.value,
      target: tileLayer.value,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapTileLayerEvent),
    })
  })

  onUnmounted(() => {
    map.value?.layers.remove(tileLayer.value)
  })

  watch(
    () => props.options,
    () => {
      tileLayer.value.setOptions(props.options || {})
    },
    { deep: true }
  )
</script>
