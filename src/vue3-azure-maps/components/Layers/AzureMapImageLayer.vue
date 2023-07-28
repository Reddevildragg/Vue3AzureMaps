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
  import { AzureMapImageLayerEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import addMapEventListeners from '@/vue3-azure-maps/utils/addMapEventListeners.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'

  const emit = defineEmits([AzureMapImageLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const map = inject('getMap')
  const dataSource = inject('getDataSource')
  const imageLayer = ref<atlas.layer.ImageLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.ImageLayerOptions | null>,
      default: null,
    },
  })

  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    // Create the polygon layer
    imageLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.ImageLayer(
        props.options || undefined,
        props.id || `azure-map-image-layer-${azureMapStore.imageLayerId++}`
      )

    emit(AzureMapImageLayerEvent.Created, imageLayer.value)
    map.value?.layers.add(imageLayer.value)

    addMapEventListeners({
      map: map.value,
      target: imageLayer.value,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapImageLayerEvent),
    })
  })

  onUnmounted(() => {
    map.value?.layers.remove(imageLayer.value)
  })

  watch(
    () => props.options,
    () => {
      imageLayer.value.setOptions(props.options || {})
    },
    { deep: true }
  )
</script>
