<template>
  <div class="h-full">
    <div class="h-screen flex items-center justify-center text-[6rem] bg-amber-500">
      First Screen
    </div>
    <SecondScreen />
    <div class="h-screen flex items-center justify-center text-[6rem] bg-blue-300">
      Third screen
    </div>
  </div>
</template>

<script setup lang="ts">
import SecondScreen from '@/components/main/SecondScreen.vue'
</script>
