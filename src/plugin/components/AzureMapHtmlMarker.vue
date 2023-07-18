<template>
  <component :is="tag" ref="el">
    <slot />
  </component>
</template>

<script setup lang="ts">
  import atlas from 'azure-maps-control'
  import {
    getCurrentInstance,
    inject,
    ref,
    useAttrs,
    onMounted,
    onUnmounted,
    PropType,
    watch,
  } from 'vue'
  import getOptionsFromProps from '@/plugin/utils/getOptionsFromProps.ts'
  import addMapEventListeners from '@/plugin/utils/addMapEventListeners.ts'

  const props = defineProps({
    /**
     * Specifies the tag used for the popup content
     * default `div`
     * @default "div"
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * Indicates the marker's location relative to its position on the map.
     * Optional values: `"center"`, `"top"`, `"bottom"`, `"left"`, `"right"`,
     * `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`.
     * Default `"center"`
     * @default "center"
     */
    anchor: {
      type: String as PropType<string | null>,
      default: null,
    },
    /**
     * A color value that replaces any {color} placeholder property that has been included in a string htmlContent.
     * default `"#1A73AA"`
     * @default "#1A73AA"
     */
    color: {
      type: String as PropType<string | null>,
      default: null,
    },
    /**
     * Indicates if the user can drag the position of the marker using the mouse or touch controls.
     * default `false`
     * @default false
     */
    draggable: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
    /**
     * The HTML content of the marker. Can be an HTMLElement or HTML string.
     * Add {text} and {color} to HTML strings as placeholders to make it easy to update
     * these values in your marker by using the setOptions function of the HtmlMarker class.
     * This allows you to create a single HTML marker string that can be used as a template for multiple markers.
     */
    htmlContent: {
      type: String as PropType<string | HTMLElement | null>,
      default: null,
    },
    /**
     * An offset in pixels to move the popup relative to the markers center.
     * Negatives indicate left and up.
     * default `[0, -18]`
     * @default [0, -18]
     */
    pixelOffset: {
      type: Array as PropType<atlas.Pixel | null>,
      default: null,
    },
    /**
     * The position of the marker.
     * default `[0, 0]`
     * @default [0, 0]
     */
    position: {
      type: Array as PropType<atlas.data.Position | null>,
      default: null,
    },
    /**
     * A popup that is attached to the marker.
     */
    popup: {
      type: Object as PropType<atlas.Popup | null>,
      default: null,
    },
    /**
     * A string of text that replaces any {text} placeholder property that has been included in a string htmlContent.
     */
    text: {
      type: String as PropType<string | null>,
      default: null,
    },
    /**
     * Specifies if the marker is visible or not.
     * default `true`
     * @default true
     */
    visible: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
  })

  const attrs = useAttrs()
  const currentInstance = getCurrentInstance()
  const map = inject('getMap')
  const el = ref(null)

  let marker: atlas.HtmlMarker

  import { useSlots } from 'vue'
  const slots = useSlots()
  console.log('slots', slots.default)

  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    marker =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.HtmlMarker(
        getOptionsFromProps({
          props: {
            ...props,
            htmlContent: slots.default
              ? (el.value as HTMLElement)
              : props.htmlContent,
          },
        })
      )

    map.value?.markers.add(marker)

    // Add the html marker events to the map
    addMapEventListeners({
      map: map.value,
      target: marker,
      listeners: attrs,
    })
  })

  onUnmounted(() => {
    map.value?.markers.remove(marker)
  })

  watch(
    () => props,
    () => {
      marker.setOptions(getOptionsFromProps({ props: props }))
    }
  )
</script>

<style scoped lang="scss"></style>
