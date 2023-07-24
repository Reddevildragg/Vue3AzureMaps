<template>
  <component :is="tag" ref="el" v-if="slots.default">
    <slot />
  </component>
</template>

<script setup lang="ts">
  import { AzureMapPopupEvent } from '@/vue-3-azure-maps/types/enums.ts'
  import {
    getCurrentInstance,
    inject,
    ref,
    onMounted,
    onUnmounted,
    PropType,
    watch,
    useSlots,
  } from 'vue'
  import atlas, { PopupOptions } from 'azure-maps-control'
  import getOptionsFromProps from '@/vue-3-azure-maps/utils/getOptionsFromProps.ts'
  import addMapEventListeners from '@/vue-3-azure-maps/utils/addMapEventListeners.ts'

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
     * Opens or closes the popup,
     * compatible with `v-model` directive
     */
    open: {
      type: Boolean,
      default: false,
    },

    /**
     * Specifies if the close button should be displayed in the popup or not.
     * default `true`
     * @default true
     */
    closeButton: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },

    /**
     * Specifies the fill color of the popup.
     * default `"#FFFFFF"`
     * @default "#FFFFFF"
     */
    fillColor: {
      type: String as PropType<string | null>,
      default: null,
    },

    /**
     * An array of [pixelsRight, pixelsDown] for how many pixels to the right and down the anchor of the popup should be
     * offset. Negative numbers can be used to offset the popup left and up.
     * default `[0, 0]`
     * @default [0, 0]
     */
    pixelOffset: {
      type: Array as PropType<atlas.Pixel | null>,
      default: null,
    },

    /**
     * The position on the map where the popup should be anchored.
     * default `[0, 0]`
     * @default [0, 0]
     */
    position: {
      type: Array as PropType<atlas.data.Position | null>,
      default: null,
    },

    /**
     * Specifies if the pointer should be displayed in the popup or not.
     * default `true`
     * @default true
     */
    showPointer: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
    content: {
      type: String as PropType<string | HTMLElement | null>,
      default: null,
    },
  })

  const emit = defineEmits([
    AzureMapPopupEvent.Open,
    AzureMapPopupEvent.Close,
    AzureMapPopupEvent.Created,
    AzureMapPopupEvent.Update,
  ])

  const slots = useSlots()
  const currentInstance = getCurrentInstance()
  const map = inject('getMap')
  const popup = ref<atlas.Popup>(null)
  const el = ref(null)
  const unmountEvents: Array<() => void> = []

  onMounted(async () => {
    if (!map?.value || !currentInstance) {
      return
    }

    popup.value =
      new currentInstance.appContext.config.globalProperties.$_azureMaps.atlas.Popup(
        getOptionsFromProps({
          props: props,
          excludedPropKeys: ['tag', 'open'],
        }) as PopupOptions
      )

    emit(AzureMapPopupEvent.Created, popup.value)

    unmountEvents.push(
      addMapEventListeners({
        map: map.value,
        listeners: {
          // Emit update event when popup opens
          [AzureMapPopupEvent.Open]: (targetedEvent: atlas.TargetedEvent) => {
            emit(AzureMapPopupEvent.Update, true)
            emit(AzureMapPopupEvent.Open, targetedEvent)
          },
          // Emit update event when popup closes
          [AzureMapPopupEvent.Close]: (targetedEvent: atlas.TargetedEvent) => {
            emit(AzureMapPopupEvent.Update, false)
            emit(AzureMapPopupEvent.Close, targetedEvent)
          },
        },
        target: popup.value,
      })
    )

    popup.value?.setOptions({
      content: slots.default ? (el.value as HTMLElement) : props.content,
    })
  })

  watch(
    () => [slots, props.content],
    () => {
      popup.value?.setOptions({
        content: slots.default ? (el.value as HTMLElement) : props.content,
      })
    }
  )
  watch(
    () => props.open,
    (newValue, oldValue) => {
      if (newValue) {
        popup.value?.open(map.value)
      } else {
        popup.value?.close()
      }
    }
  )

  watch(
    () => [
      props.pixelOffset,
      props.position,
      props.closeButton,
      props.showPointer,
      props.fillColor,
    ],
    (newOptions) => {
      popup.value.setOptions({
        position: props.position,
        pixelOffset: props.pixelOffset,
        closeButton: props.closeButton,
        showPointer: props.showPointer,
        fillColor: props.fillColor,
      })
    }
  )

  onUnmounted(() => {
    popup.value?.remove()
    for (let i = 0; i < unmountEvents.length; i++) {
      unmountEvents[i]()
    }
  })
</script>

<style scoped lang="scss"></style>
