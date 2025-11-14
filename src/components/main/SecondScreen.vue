<template>
  <div class="relative">
    <SideScroll v-slot="{ progress }">
      <DescriptionSlides :progress="progress" />
    </SideScroll>
  </div>
</template>

<script setup lang="ts">
import DescriptionSlides from '@/components/DescriptionSlides.vue'
import SideScroll from '@/components/SideScroll.vue'
</script>
