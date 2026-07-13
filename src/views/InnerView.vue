<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="container grow h-full mx-auto pt-24 pb-4 px-4">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>
