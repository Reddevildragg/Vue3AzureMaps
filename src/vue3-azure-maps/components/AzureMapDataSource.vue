<template>
  <span v-show="false">
    <template v-if="dataSource">
      <slot :data-source="dataSource" />
    </template>
  </span>
</template>

<script setup lang="ts">
  import getOptionsFromProps from '@/vue3-azure-maps/utils/getOptionsFromProps.ts'
  import {
    computed,
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    provide,
    ref,
    watch,
  } from 'vue'
  import atlas from 'azure-maps-control'
  import { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'

  const app = getCurrentInstance()
  const map = inject('getMap')
  const dataSource = ref<atlas.source.DataSource | null>(null)

  provide('getDataSource', dataSource)
  const props = defineProps({
    /**
     * A unique id that the user assigns to the data source.
     * If this is not specified, then the data source will automatically be assigned an id.
     */
    id: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },

    /**
     * Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels).
     * default `18`
     * @default 18
     */
    maxZoom: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /**
     * A boolean indicating if Point features in the source should be clustered or not.
     * If set to true, points will be clustered together into groups by radius.
     * default `false`
     * @default false
     */
    cluster: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },

    /**
     * The radius of each cluster in pixels.
     * default `50`
     * @default 50
     */
    clusterRadius: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /**
     * The maximum zoom level in which to cluster points.
     * Defaults to one zoom less than `maxZoom` so that last zoom features are not clustered.
     */
    clusterMaxZoom: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /**
     * Defines custom properties that are calculated using expressions against all the points within each cluster and added to the properties of each cluster point.
     */
    clusterProperties: {
      type: Object as PropType<
        Record<string, atlas.AggregateExpression> | undefined
      >,
      default: undefined,
    },

    /**
     * Specifies whether to calculate line distance metrics.
     * This is required for line layers that specify `lineGradient` values.
     * default `false`
     * @default false
     */
    lineMetrics: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },

    /**
     * The Douglas-Peucker simplification tolerance that is applied to the data when rendering (higher means simpler geometries and faster performance).
     * default `0.375`
     * @default 0.375
     */
    tolerance: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },
  })

  onMounted(() => {
    if (!map?.value || !app) {
      return
    }

    dataSource.value =
      new app.appContext.config.globalProperties.$_azureMaps.atlas.source.DataSource(
        props.id || `azure-map-data-source-${azureMapStore.dataSourceId++}`,
        getOptionsFromProps({ props: dataSourceOptionsProps.value })
      )

    map.value.sources.add(dataSource.value)
  })

  const dataSourceOptionsProps = computed(() => {
    const data = {
      maxZoom: props.maxZoom,
      cluster: props.cluster,
      clusterRadius: props.clusterRadius,
      clusterMaxZoom: props.clusterMaxZoom,
      lineMetrics: props.lineMetrics,
      tolerance: props.tolerance,
      clusterProperties: props.clusterProperties,
    }
    return data
  })

  watch(
    () => dataSourceOptionsProps,
    () => {
      dataSource?.value?.setOptions({ props: dataSourceOptionsProps.value })
    },
    {
      deep: true,
    }
  )

  onUnmounted(() => {
    map.value.sources.remove(dataSource.value)
  })
</script>

<style scoped lang="scss"></style>
