<template>
  <div
    id="reading"
    class="relative shrink-0 h-screen max-h-screen overflow-hidden flex flex-row justify-between items-center uppercase bg-main-additional"
  >
    <div class="w-0 sm:w-20 lg:w-50" />
    <img
      v-if="shouldUseStaticImage"
      class="relative lg:top-[2vw] w-[min(100vw,100vh)] h-[min(100vw,100vh)]"
      src="@/assets/main-page/illustrations/reading/mobile.png"
      alt=""
    />
    <SlideParallax
      v-else
      class="relative left-[-3vw] pl-[3vw]"
      :layers="parallaxLayers"
      :container-classes="['w-[85vh]', 'h-[85vh]']"
    />
    <img class="relative left-px h-screen" src="@/assets/main-page/forms/slide-one.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
import SlideParallax from '@/components/main/slides/SlideParallax.vue'
import { useStaticLandingImage } from '@/composables/useStaticLandingImage'

const parallaxLayers = [
  { source: 'reading/sun.png', tilt: -5, roll: -30 },
  { source: 'reading/clouds.png', tilt: 15, roll: 90 },
  { source: 'reading/background.png', tilt: 120, roll: 120 },
  { source: 'reading/dog.png', tilt: -20, roll: -20 },
  { source: 'reading/cat.png', tilt: 80, roll: -40 },
  { source: 'reading/castle.png', tilt: -50, roll: 90 },
]
const { shouldUseStaticImage } = useStaticLandingImage()
</script>
