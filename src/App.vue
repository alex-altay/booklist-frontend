<template>
  <div class="relative top-0 left-0 min-h-dvh min-w-full">
    <GlobalSpinner />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import GlobalSpinner from '@/components/GlobalSpinner.vue'
</script>
