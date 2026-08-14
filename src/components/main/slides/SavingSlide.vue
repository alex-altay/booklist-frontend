<template>
  <div id="saving" class="relative shrink-0 flex flex-row h-screen overflow-hidden no-scrollbar bg-main-additional">
    <img class="relative -left-px h-screen" src="@/assets/main-page/forms/slide-two.svg" />
    <div
      ref="target"
      class="relative sm:left-[-3vw] sm:pl-[3vw] perspective-near h-screen landscape:max-w-screen overflow-hidden no-scrollbar shrink-0 flex justify-between items-center"
    >
      <div
        :style="{ transform: `rotateX(${parallax.roll * 10}deg) rotateY(${parallax.tilt * 10}deg)` }"
        class="relative left-[-10vw] sm:left-0 w-[min(100vw,100vh)] h-[min(100vw,100vh)] md:w-[85vh] md:h-[85vh] duration-300 ease-out transition-all"
      >
        <img
          :style="{ transform: `translateX(${parallax.tilt * 120}px) translateY(${parallax.roll * 120}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/saving/bottom.png"
          alt="shelf"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * -50}px) translateY(${parallax.roll * 60}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/saving/top.png"
          alt="chart"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * 80}px) translateY(${parallax.roll * -80}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/saving/cat.png"
          alt="cat"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * -140}px) translateY(${parallax.roll * 140}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/saving/dog.png"
          alt="dog"
        />
      </div>
    </div>

    <img class="relative left-px h-screen" src="@/assets/main-page/forms/slide-one.svg" />
  </div>
</template>

<script setup lang="ts">
import { useParallax } from '@vueuse/core'
import { reactive, useTemplateRef } from 'vue'
import { useBreakpoints, breakpointsTailwind, usePreferredReducedMotion } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanMd = breakpoints.smaller('md').value
const isPreferReducedMotion = usePreferredReducedMotion().value == 'reduce'
const target = useTemplateRef('target')
const parallax = isPreferReducedMotion || isSmallerThanMd ? { tilt: 0, roll: 0 } : reactive(useParallax(target))
</script>

<style scoped>
@reference "tailwindcss";

.layer {
  @apply absolute h-full w-full duration-300 ease-out transition-all;
}
</style>
