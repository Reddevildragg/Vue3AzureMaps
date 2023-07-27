<template>
  <AzureMapControl v-if="loaded" :control="control" :options="options" />
</template>

<script setup lang="ts">
  import atlas, {
    ControlPosition,
    ControlStyle,
    StyleControlOptions,
  } from 'azure-maps-control'
  import {
    inject,
    onMounted,
    PropType,
    getCurrentInstance,
    Ref,
    ref,
  } from 'vue'
  import getOptionsFromProps from '@/Vue3AzureMaps/utils/getOptionsFromProps.ts'
  import AzureMapControl from '@/Vue3AzureMaps/components/controls/AzureMapControl.vue'
  const app = getCurrentInstance()
  const map = inject('getMap')
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
    if (!map?.value || !app) {
      return
    }

    control =
      new app.appContext.config.globalProperties.$_azureMaps.atlas.control.StyleControl(
        {
          style: props.controlStyle,
          mapStyles: props.mapStyles as string[] | 'all',
        } as StyleControlOptions
      )
    options = getOptionsFromProps<atlas.ControlOptions>({
      position: props.position,
    } as atlas.ControlOptions)

    loaded.value = true
  })
</script>

<style lang="scss"></style>
