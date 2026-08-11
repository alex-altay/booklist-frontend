<template>
  <div ref="wrapperRef" class="relative h-[600vh]">
    <div ref="stickyRef" class="sticky top-0 h-screen min-h-screen overflow-y-hidden">
      <slot :progress="progress" />
      <SlideSelector :progress="progress" class="absolute bottom-[5vh]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SlideSelector from '@/components/main/slides/SlideSelector.vue'
import { computed, useTemplateRef } from 'vue'
import { useElementBounding } from '@vueuse/core'

const wrapperRef = useTemplateRef<HTMLElement>('wrapperRef')
const stickyRef = useTemplateRef<HTMLElement>('stickyRef')
const { height: wrapperHeight, y: wrapperY } = useElementBounding(wrapperRef)
const { height: stickyHeight, y: stickyY } = useElementBounding(stickyRef)
const progress = computed(() => {
  if (stickyY.value == 0) {
    return -wrapperY.value / (wrapperHeight.value - stickyHeight.value)
  }
  return stickyY.value > 0 ? 0 : 1
})
</script>
