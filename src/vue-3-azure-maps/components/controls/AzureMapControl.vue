<template></template>

<script setup lang="ts">
  import { inject, onMounted, PropType, ref } from 'vue'
  import atlas from 'azure-maps-control'

  const props = defineProps({
    control: {
      type: Object as PropType<atlas.Control>,
      default: null,
      required: true,
    },
    options: {
      type: Object as PropType<atlas.ControlOptions>,
      default: null,
    },
  })
  const map = inject('getMap')

  onMounted(() => {
    if (!map?.value) {
      return
    }
    map.value.controls.add(props.control, props.options)
  })
</script>

<style lang="scss">
  .azure-maps-control-container {
    max-width: 40px;
  }
</style>
