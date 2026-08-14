<template>
  <div
    id="presenting"
    ref="target"
    class="relative sm:left-[-6vw] sm:pl-[3vw] perspective-near h-screen landscape:max-w-screen overflow-hidden no-scrollbar shrink-0 flex justify-between items-center"
  >
    <div
      :style="{ transform: `rotateX(${parallax.roll * 10}deg) rotateY(${parallax.tilt * 10}deg)` }"
      class="relative top-[3vh] h-[72vh] w-[94vh] duration-300 ease-out transition-all"
    >
      <img
        :style="{ transform: `translateX(${parallax.tilt * 120}px) translateY(${parallax.roll * 120}px)` }"
        class="layer"
        src="@/assets/main-page/illustrations/presenting/shelf.png"
        alt="shelf"
      />
      <img
        :style="{ transform: `translateX(${parallax.tilt * -50}px) translateY(${parallax.roll * 60}px)` }"
        class="layer"
        src="@/assets/main-page/illustrations/presenting/chart.png"
        alt="chart"
      />
      <img
        :style="{ transform: `translateX(${parallax.tilt * 80}px) translateY(${parallax.roll * -80}px)` }"
        class="layer"
        src="@/assets/main-page/illustrations/presenting/cat.png"
        alt="cat"
      />
      <img
        :style="{ transform: `translateX(${parallax.tilt * -140}px) translateY(${parallax.roll * 140}px)` }"
        class="layer"
        src="@/assets/main-page/illustrations/presenting/dog.png"
        alt="dog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParallax } from '@vueuse/core'
import { reactive, useTemplateRef } from 'vue'

const target = useTemplateRef('target')
const parallax = reactive(useParallax(target))
</script>

<style scoped>
@reference "tailwindcss";

.layer {
  @apply absolute h-full w-full duration-300 ease-out transition-all;
}
</style>
