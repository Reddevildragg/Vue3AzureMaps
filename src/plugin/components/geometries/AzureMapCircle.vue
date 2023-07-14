<template>
  <azure-map-point
    :v-bind:="updatedProps"
    @[circleEventName]="$emit(circleEventName, $event)" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { AzureMapPointEvent } from '@/plugin/enums.ts'

  const props = defineProps({
    /**
     * The circle radius
     */
    radius: {
      type: Number,
      default: 0,
    },
  })

  const updatedProps = computed(() => {
    return {
      ...props,
      ...{
        subType: 'Circle',
        radius: props.radius,
      },
    }
  })

  const circleEventName = AzureMapPointEvent.CircleCoordinates
</script>

<style scoped lang="scss"></style>
