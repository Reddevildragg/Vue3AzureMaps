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
  import atlas, { Shape } from 'azure-maps-control'
  import { AzureMapPointEvent } from '@/plugin/types/enums.ts'

  const emit = defineEmits([
    AzureMapPointEvent.GeometryCreated,
    AzureMapPointEvent.ShapeCreated,
    AzureMapPointEvent.ShapeAdded,
    AzureMapPointEvent.CircleCoordinates,
  ])

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
      type: Array as PropType<atlas.data.Position | null>,
      default: null,
    },
    longitude: {
      type: Number as PropType<number | null>,
      default: null,
    },
    latitude: {
      type: Number as PropType<number | null>,
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

    // Create a point geometry
    const point =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.data.Point(
        pointCoordinates.value || []
      )

    emit(AzureMapPointEvent.GeometryCreated, point)

    // Create a shape from the point geometry
    shape =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.Shape(
        point,
        props.id || `azure-map-point-${state.value}`,
        props?.properties
      )

    emit(AzureMapPointEvent.ShapeCreated, shape)

    if (shape.isCircle()) {
      emitCircleCoordinates(shape)
    }

    dataSource.value?.add(shape)
    console.log('Added')
  })

  onUnmounted(() => {
    dataSource.value?.remove(shape)
  })

  const pointCoordinates: atlas.data.Position | null = computed(() => {
    // If coordinates are not provided,
    // look for individual props
    if (!props.coordinates) {
      // If individual props are not provided,
      // return null
      if (!props.longitude || !props.latitude) {
        return null
      }
      // return individual props
      return [props.longitude, props.latitude]
    }
    // return position
    return props.coordinates
  })

  function emitCircleCoordinates(shape: atlas.Shape): void {
    // If the point has a circle polygon,
    // emit the coordinates of the circle
    emit(AzureMapPointEvent.CircleCoordinates, shape.getCircleCoordinates())
  }
</script>

<style scoped lang="scss"></style>
