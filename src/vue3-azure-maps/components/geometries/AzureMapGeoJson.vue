<template></template>

<script lang="ts" setup>
  import {
    computed,
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted,
    watch,
  } from 'vue'

  const currentInstance = getCurrentInstance()
  const map = inject('getMap')
  const dataSource = inject('getDataSource')

  const props = defineProps({
    geoJsonUrl: {
      type: String,
      default: '',
    },
    geoJsonData: {
      type: Object,
      default: undefined,
    },
  })

  const jsonUrl = computed(() => props.geoJsonUrl)

  onMounted(() => {
    if (!map?.value || !currentInstance) {
      return
    }

    if (jsonUrl.value) {
      dataSource.value?.importDataFromUrl(jsonUrl.value)
    }

    if (props.geoJsonData) {
      dataSource.value?.add(props.geoJsonData)
    }
  })

  onUnmounted(() => {
    if (props.geoJsonData) {
      dataSource.value?.remove(props.geoJsonData)
    }
  })

  watch(
    () => props.geoJsonData,
    (value, oldValue) => {
      dataSource.value?.remove(oldValue)
      dataSource.value?.add(value)
    }
  )
</script>
