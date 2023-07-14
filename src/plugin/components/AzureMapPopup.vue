<template>
  <component :is="tag" ref="el">
    <slot />
  </component>
</template>

<script setup lang="ts">
  import { AzureMapPopupEvent } from '@/plugin/types/enums.ts'
  import {
    getCurrentInstance,
    inject,
    ref,
    onMounted,
    onUnmounted,
    PropType,
    watch,
    computed,
  } from 'vue'
  import atlas, { PopupOptions } from 'azure-maps-control'
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
  })

  const emit = defineEmits([
    AzureMapPopupEvent.Open,
    AzureMapPopupEvent.Close,
    AzureMapPopupEvent.Created,
    AzureMapPopupEvent.Update,
    'update:open',
  ])

  const currentInstance = getCurrentInstance()
  const map = ref<atlas.Map | null>(null)
  const popup = ref<atlas.Popup>(null)
  const el = ref(null)
  const unmountEvents: Array<() => void> = []

  onMounted(async () => {
    map.value = inject('getMap').value

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

    watch(props.open, (newValue, oldValue) => {
      console.log(open, newValue, oldValue)
    })

    popup.value?.setOptions(el.value as HTMLElement)
  })

  onUnmounted(() => {
    popup.value?.remove()
    for (let i = 0; i < unmountEvents.length; i++) {
      unmountEvents[i]()
    }
  })
</script>

<style scoped lang="scss"></style>
