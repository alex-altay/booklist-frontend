<template>
  <div
    class="relative h-screen px-3 py-3 sm:px-14 sm:pt-14 sm:pb-3 flex flex-col justify-between bg-main-bg text-main-dark uppercase select-none"
  >
    <div class="flex flex-row justify-between text-xl sm:text-2xl text-gray-800 font-bold">
      <div>MY BOOKLIST</div>
      <div class="cursor-pointer" @click="$router.push({ name: 'signin' })">SIGN IN</div>
    </div>
    <div class="symmetric-flex-filler" />
    <TheTagline />
    <div
      class="flex flex-row w-full sm:w-auto self-center justify-between lg:self-end sm:gap-16 text-xs lg:text-sm lg:font-bold"
    >
      <div class="min-w-20">USEFUL</div>
      <div class="text-center">INTERESTING</div>
      <div class="min-w-20 text-right">AD&nbsp;FREE</div>
    </div>
    <KeepScrolling class="relative lg:bottom-5 cursor-pointer" @click="scroll" />
  </div>
</template>

<script setup lang="ts">
import KeepScrolling from '@/components/main/KeepScrolling.vue'
import TheTagline from '@/components/main/TheTagline.vue'
import { useWindowSize } from '@vueuse/core'
import { SCREEN_DELIMETER_VH } from '@/data/constants'

const { height } = useWindowSize()

function scroll() {
  const scrollStep = height.value + (height.value / 100) * SCREEN_DELIMETER_VH
  window.scrollTo({ top: scrollStep, behavior: 'smooth' })
}
</script>
