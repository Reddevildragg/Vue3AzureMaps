<template>
  <azure-map-point
    v-bind="updatedProps"
    @[circleEventName]="$emit(circleEventName, $event)" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { AzureMapPointEvent } from './../../types/enums.ts'
  import AzureMapPoint from '@/vue-3-azure-maps/components/geometries/AzureMapPoint.vue'

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
        properties: {
          subType: 'Circle',
          radius: props.radius,
        },
      },
    }
  })

  const circleEventName = computed(() => AzureMapPointEvent.CircleCoordinates)
</script>

<style scoped lang="scss"></style>
