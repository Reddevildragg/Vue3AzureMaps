<template></template>

<script setup lang="ts">
  import atlas, { ControlPosition, ControlStyle } from 'azure-maps-control'
  import {
    inject,
    onMounted,
    PropType,
    getCurrentInstance,
    Ref,
    ref,
  } from 'vue'
  import getOptionsFromProps from '@/plugin/utils/get-options-from-props.ts'
  import { FullscreenControl } from '@/plugin/modules/controls/fullscreen.ts'
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
     * The style of the control. Can be; light, dark, auto, or any CSS3 color. When set to auto, the style will change based on the map style.
     * Default `ControlStyle.light'.
     * @default ControlStyle.light
     */
    controlStyle: {
      type: String as PropType<atlas.ControlStyle | string>,
      default: ControlStyle.light,
    },

    /**
     * Specifies if the control should be hidden if fullscreen is not supported by the browser.
     * @default true
     */
    hideIfUnsupported: {
      type: Boolean,
      default: true,
    },
  })

  onMounted(() => {
    map.value = inject('getMap').value

    if (!map?.value || !app) {
      return
    }

    const control = new FullscreenControl({
      hideIfUnsupported: props.hideIfUnsupported,
      style: props.controlStyle,
    })
    const options = getOptionsFromProps<atlas.ControlOptions>({
      position: props.position,
    } as atlas.ControlOptions)

    map.value.controls.add(control, options)
  })
</script>

<style lang="scss"></style>
