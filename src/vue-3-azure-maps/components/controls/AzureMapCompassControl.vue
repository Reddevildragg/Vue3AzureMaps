<template>
  <AzureMapControl v-if="loaded" :control="control" :options="options" />
</template>

<script setup lang="ts">
  import atlas, {
    CompassControlOptions,
    ControlPosition,
    ControlStyle,
  } from 'azure-maps-control'
  import { inject, onMounted, PropType, getCurrentInstance, ref } from 'vue'
  import getOptionsFromProps from '@/vue-3-azure-maps/utils/getOptionsFromProps.ts'
  import AzureMapControl from '@/vue-3-azure-maps/components/controls/AzureMapControl.vue'
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
     * The angle that the map will rotate with each click of the control.
     * Default `15`.
     * @default 15
     */
    rotationDegreesDelta: {
      type: Number,
      default: 15,
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
  const map = inject('getMap')
  const loaded = ref(false)

  let control
  let options

  onMounted(() => {
    if (!map?.value || !app) {
      return
    }

    control =
      new app.appContext.config.globalProperties.$_azureMaps.atlas.control.CompassControl(
        {
          rotationDegreesDelta: props.rotationDegreesDelta,
          style: props.controlStyle,
        } as CompassControlOptions
      )

    options = getOptionsFromProps<atlas.ControlOptions>({
      position: props.position,
    } as atlas.ControlOptions)

    loaded.value = true
  })
</script>

<style lang="scss"></style>
