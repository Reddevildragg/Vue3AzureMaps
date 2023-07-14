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
  import { AzureMapPolygonLayerEvent } from '@/plugin/enums.ts'
  import addMapEventListeners from '@/plugin/utils/add-map-event-listeners.ts'

  const emit = defineEmits([AzureMapPolygonLayerEvent.Created])

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()

  const state = ref(0)
  const map = ref<atlas.Map | null>(null)
  const dataSource = ref<atlas.source.DataSource | null>(null)
  const polygonLayer = ref<atlas.layer.PolygonLayer>(null)

  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    options: {
      type: Object as PropType<atlas.PolygonLayerOptions | null>,
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
    polygonLayer.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.layer.PolygonLayer(
        dataSource,
        props.id || `azure-map-polygon-layer-${state.value++}`,
        props.options || undefined
      )

    emit(AzureMapPolygonLayerEvent.Created, polygonLayer.value)
    map.value.layers.add(polygonLayer.value)

    addMapEventListeners({
      map,
      target: polygonLayer,
      listeners: attrs,
      reservedEventTypes: Object.values(AzureMapPolygonLayerEvent),
    })
  })

  onUnmounted(() => {
    map.value.layers.remove(polygonLayer.value)
  })
</script>

<style scoped lang="scss"></style>
