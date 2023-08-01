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
  import { AzureMapBubbleLayerEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import addMapEventListeners from '@/vue3-azure-maps/utils/addMapEventListeners.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'

  const emit = defineEmits([AzureMapBubbleLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const map = inject('getMap')
  const dataSource = inject('getDataSource')
  const bubbleLayer = ref<atlas.layer.BubbleLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.BubbleLayerOptions | null>,
      default: null,
    },
  })

  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    // Create the polygon layer
    bubbleLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.BubbleLayer(
        dataSource,
        props.id || `azure-map-bubble-layer-${azureMapStore.bubbleLayerId++}`,
        props.options || undefined
      )

    emit(AzureMapBubbleLayerEvent.Created, bubbleLayer.value)

    map.value?.layers.add(bubbleLayer.value)

    addMapEventListeners({
      map: map.value,
      target: bubbleLayer.value,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapBubbleLayerEvent),
    })
  })

  watch(
    () => props.options,
    () => {
      bubbleLayer.value.setOptions(props.options || {})
    },
    { deep: true }
  )

  onUnmounted(() => {
    map.value?.layers.remove(bubbleLayer.value)
  })
</script>
