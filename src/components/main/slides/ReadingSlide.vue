<template>
  <div
    id="reading"
    class="relative shrink-0 h-screen max-h-screen overflow-hidden flex flex-row justify-between items-center uppercase bg-main-additional"
  >
    <div class="w-0 sm:w-20 lg:w-50" />
    <img
      v-if="isSmallerThanLg || isPreferReducedMotion"
      class="relative lg:top-[2vw] w-[min(100vw,100vh)] h-[min(100vw,100vh)]"
      src="@/assets/main-page/illustrations/reading/mobile.png"
      alt=""
    />
    <ReadingParallax v-else />
    <img class="relative left-px h-screen" src="@/assets/main-page/forms/slide-one.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
import ReadingParallax from '@/components/main/slides/parallax/ReadingParallax.vue'
import { useBreakpoints, breakpointsTailwind, usePreferredReducedMotion } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanLg = breakpoints.smaller('lg').value
const isPreferReducedMotion = usePreferredReducedMotion().value == 'reduce'
</script>
