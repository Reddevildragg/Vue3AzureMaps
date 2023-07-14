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
  import { AzureMapImageLayerEvent } from '@/plugin/types/enums.ts'
  import addMapEventListeners from '@/plugin/utils/addMapEventListeners.ts'

  const emit = defineEmits([AzureMapImageLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const state = ref(0)
  const map = ref<atlas.Map | null>(null)
  const dataSource = ref<atlas.source.DataSource | null>(null)
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
    dataSource.value = inject('getDataSource').value
    map.value = inject('getMap').value

    if (!map?.value || !currentInstance) {
      return
    }

    // Create the polygon layer
    imageLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.ImageLayer(
        props.options || undefined,
        props.id || `azure-map-image-layer-${state.value++}`
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
</script>

<style scoped lang="scss"></style>
