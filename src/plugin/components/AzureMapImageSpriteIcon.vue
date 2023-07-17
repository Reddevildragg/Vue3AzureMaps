<template></template>

<script setup lang="ts">
  import {
    getCurrentInstance,
    inject,
    ref,
    onMounted,
    onUnmounted,
    PropType,
  } from 'vue'
  import atlas from 'azure-maps-control'
  import { AzureMapImageSpriteIconEvent } from '@/plugin/types/enums.ts'

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

  const currentInstance = getCurrentInstance()
  const map = inject('getMap')

  onMounted(async () => {
    if (!map?.value || !currentInstance) {
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
