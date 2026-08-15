<template>
  <div
    id="reading"
    class="relative shrink-0 h-screen max-h-screen overflow-hidden flex flex-row justify-between items-center uppercase bg-main-additional"
  >
    <div
      ref="target"
      class="relative sm:left-[-3vw] sm:pl-[3vw] perspective-near h-screen landscape:max-w-screen overflow-hidden no-scrollbar shrink-0 flex justify-between items-center"
    >
      <div class="w-0 sm:w-20 lg:w-50"></div>
      <div
        :style="{ transform: `rotateX(${parallax.roll * 10}deg) rotateY(${parallax.tilt * 10}deg)` }"
        class="relative w-[min(100vw,100vh)] h-[min(100vw,100vh)] md:w-[85vh] md:h-[85vh] duration-300 ease-out transition-all"
      >
        <img
          :style="{ transform: `translateX(${parallax.tilt * -5}px) translateY(${parallax.roll * -30}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/reading/sun.png"
          alt="sun"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * 15}px) translateY(${parallax.roll * 90}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/reading/clouds.png"
          alt="clouds"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * 120}px) translateY(${parallax.roll * 120}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/reading/background.png"
          alt="background"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * -20}px) translateY(${parallax.roll * -20}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/reading/dog.png"
          alt="dog"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * 80}px) translateY(${parallax.roll * -40}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/reading/cat.png"
          alt="cat"
        />
        <img
          :style="{ transform: `translateX(${parallax.tilt * -50}px) translateY(${parallax.roll * 90}px)` }"
          class="layer"
          src="@/assets/main-page/illustrations/reading/castle.png"
          alt="castle"
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
