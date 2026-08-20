<template>
  <div
    id="saving"
    class="relative shrink-0 flex flex-row h-screen items-center overflow-hidden no-scrollbar bg-main-additional"
  >
    <img class="relative -left-px h-screen" src="@/assets/main-page/forms/slide-two.svg" alt="" />
    <img
      v-if="shouldUseStaticImage"
      class="w-[min(100vw,100vh)] h-[min(100vw,100vh)]"
      src="@/assets/main-page/illustrations/saving/mobile.png"
      alt=""
    />
    <SlideParallax
      v-else
      class="relative top-[-3vh] left-[-3vw] pl-[3vw]"
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
  { source: 'saving/bottom.png', tilt: 120, roll: 120 },
  { source: 'saving/top.png', tilt: -50, roll: 60 },
  { source: 'saving/cat.png', tilt: 80, roll: -80 },
  { source: 'saving/dog.png', tilt: -140, roll: 140 },
]
const { shouldUseStaticImage } = useStaticLandingImage()
</script>
