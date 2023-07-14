<template></template>

<script setup lang="ts">
  import {
    computed,
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    ref,
  } from 'vue'
  import atlas, {
    ControlPosition,
    ControlStyle,
    Shape,
  } from 'azure-maps-control'
  import { AzureMapPointEvent } from '@/plugin/types/enums.ts'

  const currentInstance = getCurrentInstance()
  const state = ref(0)
  const map = ref<atlas.Map | null>(null)
  const dataSource = ref<atlas.source.DataSource | null>(null)

  let shape: Shape
  const props = defineProps({
    id: {
      type: String,
      default: '',
    },

    coordinates: {
      type: Array as PropType<
        atlas.data.Position[] | atlas.data.Position[][] | null
      >,
      default: null,
    },

    properties: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  })

  onMounted(() => {
    dataSource.value = inject('getDataSource').value
    map.value = inject('getMap').value

    if (!map?.value || !currentInstance) {
      return
    }

    // Create a shape from the line string geometry
    shape =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.Shape(
        new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.data.Polygon(
          props.coordinates || []
        ),
        props.id || `azure-map-line-string-${state.value}`,
        props.properties
      )

    dataSource.value?.add([shape])
  })

  onUnmounted(() => {
    dataSource.value?.remove(shape)
  })
</script>

<style scoped lang="scss"></style>
