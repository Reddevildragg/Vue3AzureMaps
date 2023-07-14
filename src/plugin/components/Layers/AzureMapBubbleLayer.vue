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
  import { AzureMapBubbleLayerEvent } from '@/plugin/types/enums.ts'
  import addMapEventListeners from '@/plugin/utils/addMapEventListeners.ts'

  const emit = defineEmits([AzureMapBubbleLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const state = ref(0)
  const map = ref<atlas.Map | null>(null)
  const dataSource = ref<atlas.source.DataSource | null>(null)
  const bubbleLayer = ref<atlas.layer.BubbleLayer>(null)

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
    bubbleLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.BubbleLayer(
        dataSource,
        props.id || `azure-map-bubble-layer-${state.value++}`,
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

  onUnmounted(() => {
    map.value?.layers.remove(bubbleLayer.value)
  })
</script>

<style scoped lang="scss"></style>
