<template>
  <div v-if="shouldUseStaticImage" class="flex shrink-0 h-full w-full justify-center items-center">
    <img
      class="relative h-[min(100vw,100vh)] object-contain"
      src="@/assets/main-page/illustrations/presenting/mobile.png"
      alt=""
    />
  </div>
  <SlideParallax
    v-else
    class="relative left-[-6vw] pl-[3vw]"
    :layers="parallaxLayers"
    :container-classes="['top-[3vh]', 'h-[72vh]', 'w-[94vh]']"
  />
</template>

<script setup lang="ts">
import SlideParallax from '@/components/main/slides/SlideParallax.vue'
import { useStaticLandingImage } from '@/composables/useStaticLandingImage'

const parallaxLayers = [
  { source: 'presenting/shelf.png', tilt: 120, roll: 120 },
  { source: 'presenting/chart.png', tilt: -50, roll: 60 },
  { source: 'presenting/cat.png', tilt: 80, roll: -80 },
  { source: 'presenting/dog.png', tilt: -140, roll: 140 },
]
const { shouldUseStaticImage } = useStaticLandingImage()
</script>
