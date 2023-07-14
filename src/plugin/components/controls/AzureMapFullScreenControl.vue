<template>
  <AzureMapControl v-if="loaded" :control="control" :options="options" />
</template>

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
  import AzureMapControl from '@/plugin/components/controls/AzureMapControl.vue'

  const app = getCurrentInstance()
  const map = ref<atlas.Map | null>(null)
  const loaded = ref(false)

  let control
  let options

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

    control = new FullscreenControl({
      hideIfUnsupported: props.hideIfUnsupported,
      style: props.controlStyle,
    })
    options = getOptionsFromProps<atlas.ControlOptions>({
      position: props.position,
    } as atlas.ControlOptions)

    loaded.value = true
  })
</script>

<style lang="scss"></style>
