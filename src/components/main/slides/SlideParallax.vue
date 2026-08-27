<template>
  <div
    ref="target"
    class="perspective-near h-screen landscape:max-w-screen overflow-hidden no-scrollbar shrink-0 flex justify-between items-center"
  >
    <div
      :style="{ transform: `rotateX(${parallax.roll * 10}deg) rotateY(${parallax.tilt * 10}deg)` }"
      class="relative duration-300 ease-out transition-transform will-change-transform"
      :class="containerClasses"
      aria-hidden="true"
    >
      <img
        v-for="{ tilt, roll, source } in layers"
        :key="source"
        :style="{ transform: `translateX(${parallax.tilt * tilt}px) translateY(${parallax.roll * roll}px)` }"
        class="layer"
        :src="getImageUrl(source)"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideParallax } from '@/composables/useSlideParallax'
import { useTemplateRef } from 'vue'

type Layer = { source: string; roll: number; tilt: number }
const { layers, containerClasses } = defineProps<{ layers: Layer[]; containerClasses?: string[] }>()

const target = useTemplateRef<HTMLDivElement>('target')
const parallax = useSlideParallax(target)

function getImageUrl(name: string) {
  return new URL(`/src/assets/main-page/illustrations/${name}`, import.meta.url).href
}
</script>

<style scoped>
@reference "tailwindcss";

.layer {
  @apply absolute h-full w-full object-contain duration-300 ease-out transition-transform will-change-transform;
}
</style>
