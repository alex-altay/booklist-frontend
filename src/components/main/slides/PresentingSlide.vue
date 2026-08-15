<template>
  <div v-if="isSmallerThanLg || isPreferReducedMotion" class="flex shrink-0 h-full w-full justify-center items-center">
    <img
      class="relative h-[min(100vw,100vh)] object-contain"
      src="@/assets/main-page/illustrations/presenting/mobile.png"
    />
  </div>
  <PresentingParallax v-else />
</template>

<script setup lang="ts">
import PresentingParallax from '@/components/main/slides/parallax/PresentingParallax.vue'
import { useBreakpoints, breakpointsTailwind, usePreferredReducedMotion } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanLg = breakpoints.smaller('lg').value
const isPreferReducedMotion = usePreferredReducedMotion().value == 'reduce'
</script>
