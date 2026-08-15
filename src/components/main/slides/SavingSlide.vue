<template>
  <div
    id="saving"
    class="relative shrink-0 flex flex-row h-screen items-center overflow-hidden no-scrollbar bg-main-additional"
  >
    <img class="relative -left-px h-screen" src="@/assets/main-page/forms/slide-two.svg" />
    <img
      v-if="isSmallerThanLg || isPreferReducedMotion"
      class="w-[min(100vw,100vh)] h-[min(100vw,100vh)]"
      src="@/assets/main-page/illustrations/saving/mobile.png"
    />
    <SavingParallax v-else />
    <img class="relative left-px h-screen" src="@/assets/main-page/forms/slide-one.svg" />
  </div>
</template>

<script setup lang="ts">
import SavingParallax from '@/components/main/slides/parallax/SavingParallax.vue'
import { useBreakpoints, breakpointsTailwind, usePreferredReducedMotion } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanLg = breakpoints.smaller('lg').value
const isPreferReducedMotion = usePreferredReducedMotion().value == 'reduce'
</script>
