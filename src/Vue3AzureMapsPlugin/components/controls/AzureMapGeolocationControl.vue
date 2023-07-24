<template>
  <AzureMapControl v-if="loaded" :control="control" :options="options" />
</template>

<script setup lang="ts">
  import atlas, { ControlPosition, ControlStyle } from 'azure-maps-control'
  import { inject, onMounted, PropType, getCurrentInstance, ref } from 'vue'
  import getOptionsFromProps from '@/Vue3AzureMapsPlugin/utils/getOptionsFromProps.ts'
  import { GeolocationControl } from '@/Vue3AzureMapsPlugin/modules/controls/geolocation.ts'
  import AzureMapControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapControl.vue'
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
     * The style of the control. Can be; light, dark, auto, or any CSS3 color. When set to auto, the style will change based on the map style.
     * Default `ControlStyle.light'.
     * @default ControlStyle.light
     */
    controlStyle: {
      type: String as PropType<atlas.ControlStyle | string>,
      default: ControlStyle.light,
    },

    /**
     * A Geolocation API PositionOptions object.
     * Default: {enableHighAccuracy:false,timeout:6000}
     */
    positionOptions: {
      type: Object as PropType<PositionOptions | null>,
      default: null,
    },

    /**
     * Shows the users location on the map using a marker.
     * Default: true
     * */
    showUserLocation: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * If true the Geolocation Control becomes a toggle button and when active the map will receive updates to the user's location as it changes.
     * Default: false
     * */
    trackUserLocation: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /** The color of the user location marker.
     * Default: DodgerBlue
     * */
    markerColor: {
      type: String as PropType<string | null>,
      default: null,
    },
  })

  onMounted(() => {
    if (!map?.value || !app) {
      return
    }

    control = new GeolocationControl(
      map.value,
      getOptionsFromProps<atlas.ControlOptions>({
        props: props,
        excludedPropKeys: ['position'],
        reservedAttributes: {
          controlStyle: 'style',
        },
      })
    )
    options = getOptionsFromProps<atlas.ControlOptions>({
      position: props.position,
    } as atlas.ControlOptions)

    loaded.value = true
  })
</script>

<style lang="scss"></style>
