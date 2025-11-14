<template>
  <div ref="wrapperRef" class="h-[600vh] relative">
    <div ref="stickyRef" class="h-screen min-h-screen sticky top-0">
      <slot :progress="progress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useElementBounding } from '@vueuse/core'

const wrapperRef = ref<HTMLElement | null>(null)
const stickyRef = ref<HTMLElement | null>(null)
const { height: wrapperHeight, y: wrapperY } = useElementBounding(wrapperRef)
const { height: stickyHeight, y: stickyY } = useElementBounding(stickyRef)
const progress = computed(() => {
  if (stickyY.value == 0) {
    return -wrapperY.value / (wrapperHeight.value - stickyHeight.value)
  }
  return stickyY.value > 0 ? 0 : 1
})
</script>
