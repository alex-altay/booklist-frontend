<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="container mx-auto flex flex-1 flex-col px-4 pt-24 pb-4">
      <RouterView :key="$route.fullPath" />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>
