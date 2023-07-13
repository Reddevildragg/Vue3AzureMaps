<template></template>

<script setup lang="ts">
  import atlas, { ControlPosition, ControlStyle } from 'azure-maps-control'
  import { inject, onMounted, PropType, getCurrentInstance, Ref } from 'vue'
  import getOptionsFromProps from '@/plugin/utils/get-options-from-props.ts'
  const app = getCurrentInstance()

  const props = defineProps({
    /**
     * The position where the control will be placed on the map.
     */
    position: {
      type: String as PropType<atlas.ControlPosition>,
      default: ControlPosition.BottomRight,
      validator: (value: atlas.ControlPosition) =>
        Object.values(ControlPosition).includes(value),
    },

    /**
     * The extent to which the map will zoom with each click of the control.
     * Default `1`.
     * @default 1
     */
    zoomDelta: {
      type: Number,
      default: 1,
    },

    /**
     * The style of the control.
     * Default `ControlStyle.light`
     * @default ControlStyle.light
     */
    controlStyle: {
      type: String as PropType<atlas.ControlStyle>,
      default: ControlStyle.light,
    },
  })

  onMounted(() => {
    const map: Ref<atlas.Map | null> | undefined = inject('getMap')

    if (!map?.value || !app) {
      return
    }

    map.value.controls.add(
      new app.appContext.config.globalProperties.$_azureMaps.atlas.control.ZoomControl(
        {
          zoomDelta: props.zoomDelta,
          style: props.controlStyle,
        },
        getOptionsFromProps<atlas.ControlOptions>({
          position: props.position,
        } as atlas.ControlOptions)
      )
    )
  })
</script>

<style lang="scss"></style>
