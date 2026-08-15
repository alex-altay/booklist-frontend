<template>
  <div
    ref="target"
    class="relative left-[-3vw] pl-[3vw] perspective-near h-screen max-w-screen overflow-hidden no-scrollbar shrink-0 flex justify-between items-center"
  >
    <div
      :style="{ transform: `rotateX(${parallax.roll * 10}deg) rotateY(${parallax.tilt * 10}deg)` }"
      class="relative w-[85vh] h-[85vh] duration-300 ease-out transition-all"
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
</template>

<script setup lang="ts">
import { useSlideParallax } from '@/composables/useSlideParallax'
import { useTemplateRef } from 'vue'

const target = useTemplateRef<HTMLDivElement>('target')
const parallax = useSlideParallax(target)
</script>

<style scoped>
@reference "tailwindcss";

.layer {
  @apply absolute h-full w-full duration-300 ease-out transition-all;
}
</style>
