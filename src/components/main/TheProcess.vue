<template>
  <div class="relative">
    <div class="bg-main-additional" :style="{ height: `${SCREEN_DELIMETER_VH}vh` }" />
    <SideScroll v-slot="{ progress }">
      <DescriptionSlides :progress="progress" />
    </SideScroll>
    <div class="bg-main-additional" :style="{ height: `${SCREEN_DELIMETER_VH}vh` }" />
  </div>
</template>

<script setup lang="ts">
import DescriptionSlides from '@/components/main/slides/DescriptionSlides.vue'
import SideScroll from '@/components/main/slides/SideScroll.vue'
import { SCREEN_DELIMETER_VH } from '@/data/constants'
</script>
