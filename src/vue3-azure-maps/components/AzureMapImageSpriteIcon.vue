<template></template>

<script setup lang="ts">
  import { inject, ref, onMounted, onUnmounted, PropType } from 'vue'
  import { AzureMapImageSpriteIconEvent } from '@/vue3-azure-maps/utils/enums.ts'
  import { VueAzureMap } from '@/vue3-azure-maps/vue3-azure-maps.ts'

  const props = defineProps({
    /**
     * The image's id.
     */
    id: {
      type: String,
      default: null,
      required: true,
    },

    /**
     * The image to add to the map's sprite. Can be a data URI, inline SVG, or image URL.
     */
    icon: {
      type: [String, Object] as PropType<string | HTMLImageElement | ImageData>,
      default: null,
      required: true,
    },
  })

  const emit = defineEmits([
    AzureMapImageSpriteIconEvent.Added,
    AzureMapImageSpriteIconEvent.Removed,
    AzureMapImageSpriteIconEvent.Error,
  ])

  const vueAzureMaps = inject<VueAzureMap>('azureMaps')
  const map = inject('getMap')

  onMounted(async () => {
    if (!map?.value || !vueAzureMaps) {
      return
    }

    await map.value?.imageSprite.add(props.id, props.icon)
    emit(AzureMapImageSpriteIconEvent.Added, props.id)
  })

  onUnmounted(() => {
    map.value?.imageSprite.remove(props.id)
    emit(AzureMapImageSpriteIconEvent.Removed, props.id)
  })
</script>

<style scoped lang="scss"></style>
