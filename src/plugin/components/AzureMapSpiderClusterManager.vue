<template></template>

<script setup lang="ts">
  import { AzureMapSpiderClusterManagerEvent } from '@/plugin/types/enums.ts'
  import {
    getCurrentInstance,
    inject,
    ref,
    onMounted,
    onUnmounted,
    PropType,
    watch,
  } from 'vue'
  import atlas from 'azure-maps-control'
  import getOptionsFromProps from '@/plugin/utils/getOptionsFromProps.ts'

  import {
    ISpiderClusterOptions,
    SpiderClusterManager,
  } from '@/plugin/modules/other/spiderClusterManager.ts'

  const props = defineProps({
    /**
     * The cluster layer instace
     */
    clusterLayer: {
      type: Object as PropType<
        atlas.layer.BubbleLayer | atlas.layer.SymbolLayer | null
      >,
      default: null,
      required: true,
    },

    /**
     * The unclusted layer instance
     */
    unclustedLayer: {
      type: Object as PropType<
        atlas.layer.BubbleLayer | atlas.layer.SymbolLayer | null
      >,
      default: null,
      required: true,
    },

    /** Minimium number of point features in cluster before switching from circle to spiral spider layout. Default: 6 */
    circleSpiralSwitchover: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /** The minium pixel distance between point features and the cluster, when rendering spider layout as a circle. Default: 30 */
    minCircleLength: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /** The minium angle between point features in the spiral. Default: 25 */
    minSpiralAngleSeperation: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /** The maximum number of features that can be rendered in the spider layout. When the cluster is bigger than this value, it will zoom until the cluster starts to break apart. Default: 100 */
    maxFeaturesInWeb: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /** A factor that is used to grow the pixel distance of each point feature from the center in the spiral. Default: 5 */
    spiralDistanceFactor: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },

    /** Layer options used to style the stick connecting the individual point feature to the cluster. */
    stickLayerOptions: {
      type: Object as PropType<atlas.LineLayerOptions | undefined>,
      default: undefined,
    },

    /** A boolean indicating if the cluster layer is visible or not. */
    visible: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
  })

  const emit = defineEmits([
    AzureMapSpiderClusterManagerEvent.FeatureSelected,
    AzureMapSpiderClusterManagerEvent.FeatureUnselected,
  ])

  const currentInstance = getCurrentInstance()
  const map = inject('getMap')
  const spiderManager = ref<SpiderClusterManager>(null)

  onMounted(async () => {
    if (!map?.value || !currentInstance) {
      return
    }

    // The cluster and unclusted layer instances are required.
    if (!props.clusterLayer || !props.unclustedLayer) return

    const options = getOptionsFromProps<ISpiderClusterOptions>({ props: props })

    spiderManager.value = new SpiderClusterManager(
      currentInstance.appContext.config.globalProperties.$_azureMaps.atlas,
      map.value,
      props.clusterLayer,
      props.unclustedLayer,
      {
        ...options,
        featureSelected: (shape, cluster) => {
          emit(
            AzureMapSpiderClusterManagerEvent.FeatureSelected,
            shape,
            cluster
          )
        },
        // Emit an event instead of using this function as a prop,
        // cannot be overwritten if props update
        featureUnselected: () => {
          emit(AzureMapSpiderClusterManagerEvent.FeatureUnselected)
        },
      }
    )
  })

  onUnmounted(() => {
    spiderManager.value?.dispose()
  })

  watch(
    () => props,
    () => {
      spiderManager.value.setOptions(getOptionsFromProps({ props: props }))
    }
  )
</script>

<style scoped lang="scss"></style>
