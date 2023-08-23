<template></template>

<script lang="ts" setup>
  import { computed, inject, onMounted, onUnmounted, watch } from 'vue'
  import atlas, { Shape } from 'azure-maps-control'
  import { AzureMapPointEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'
  import { VueAzureMap } from '@/vue3-azure-maps/vue3-azure-maps.ts'

  const emit = defineEmits([
    AzureMapPointEvent.GeometryCreated,
    AzureMapPointEvent.ShapeCreated,
    AzureMapPointEvent.ShapeAdded,
    AzureMapPointEvent.CircleCoordinates,
  ])

  const vueAzureMaps = inject<VueAzureMap>('azureMaps')
  const map = inject('getMap')
  const dataSource = inject('getDataSource')
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

  const pointProperties = computed(() => {
    return { ...(props.properties || {}) }
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

  onMounted(() => {
    if (!map?.value || !vueAzureMaps) {
      return
    }

    // Create a point geometry
    const point = new vueAzureMaps.atlas.data.Point(
      pointCoordinates.value || []
    )

    emit(AzureMapPointEvent.GeometryCreated, point)

    // Create a shape from the point geometry
    shape = new vueAzureMaps.atlas.Shape(
      point,
      props.id || `azure-map-point-${azureMapStore.mapPointId++}`,
      props?.properties
    )

    emit(AzureMapPointEvent.ShapeCreated, shape)

    if (shape.isCircle()) {
      emitCircleCoordinates(shape)
    }

    dataSource.value?.add(shape)
  })

  onUnmounted(() => {
    dataSource.value?.remove(shape)
  })

  watch(
    () => pointCoordinates,
    () => {
      shape.setCoordinates(pointCoordinates)
    }
  )

  watch(
    () => pointProperties,
    (newValue, oldValue) => {
      shape.setProperties(pointProperties)

      if (
        shape.isCircle() &&
        (newValue.radius !== oldValue.radius ||
          newValue.subType !== oldValue.subType)
      ) {
        this.emitCircleCoordinates(shape)
      }
    }
  )

  function emitCircleCoordinates(shape: atlas.Shape): void {
    // If the point has a circle polygon,
    // emit the coordinates of the circle
    emit(AzureMapPointEvent.CircleCoordinates, shape.getCircleCoordinates())
  }
</script>
