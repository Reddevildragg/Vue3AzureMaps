<template>
  <div class="navigation">
    <div v-for="route in routes" :key="route.name" class="nav-button">
      <button @click="router.push(route.path)">{{ route.name }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { computed } from 'vue'

  const router = useRouter()

  const routes = computed(() => router.getRoutes())
</script>

<style scoped lang="scss">
  .navigation {
    display: flex;
  }
  .nav-button {
    padding-right: 10px;
    padding-left: 10px;
  }
</style>
