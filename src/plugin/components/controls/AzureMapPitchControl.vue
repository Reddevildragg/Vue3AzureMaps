<template></template>

<script setup lang="ts">
  import atlas, {
    ControlPosition,
    ControlStyle,
    PitchControlOptions,
  } from 'azure-maps-control'
  import {
    inject,
    onMounted,
    PropType,
    getCurrentInstance,
    Ref,
    ref,
  } from 'vue'
  import getOptionsFromProps from '@/plugin/utils/get-options-from-props.ts'
  import { GeolocationControl } from '@/plugin/modules/controls/geolocation.ts'
  const app = getCurrentInstance()
  const map = ref<atlas.Map | null>(null)
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
    map.value = inject('getMap').value
    if (!map?.value || !app) {
      return
    }

    const control =
      new app.appContext.config.globalProperties.$_azureMaps.atlas.control.PitchControl(
        {
          pitchDegreesDelta: props.pitchDegreesDelta,
          style: props.controlStyle,
        } as PitchControlOptions
      )
    const options = getOptionsFromProps<atlas.ControlOptions>({
      position: props.position,
    } as atlas.ControlOptions)

    map.value.controls.add(control, options)
  })
</script>

<style lang="scss"></style>
