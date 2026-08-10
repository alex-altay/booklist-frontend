<template>
  <div ref="wrapper" class="relative h-screen w-screen flex items-center justify-center select-none bg-main-bg">
    <img ref="pencil" class="absolute top-0 h-[10vh] left-[16vw]" src="@/assets/main-page/pencil.png" />
    <img ref="pen" class="absolute top-0 h-[14vh] right-[18vw]" src="@/assets/main-page/pen.png" />
    <img
      ref="laptop"
      class="absolute bottom-0 h-[12vh] translate-x-1 hidden sm:block"
      src="@/assets/main-page/laptop.png"
    />

    <div class="flex flex-col justify-center items-center">
      <div ref="header" class="mb-10 uppercase text-8xl font-black text-main-additional">Just give it a try</div>
      <Button ref="button" class="relative w-25 cursor-pointer" @click="$router.push({ name: 'signup' })">
        Sign Up
      </Button>
    </div>

    <div
      ref="links"
      class="absolute bottom-3 sm:bottom-15 px-3 sm:px-14 flex flex-row w-full justify-between uppercase sm:text-lg 2xl:text-2xl"
    >
      <RouterLink to="/terms" class="max-w-30 lg:max-w-none text-xs lg:text-lg text-gray-800 text-left cursor-pointer"
        >BORING TERMS OF AGREEMENT</RouterLink
      >
      <RouterLink
        to="/privacy"
        class="max-w-30 lg:max-w-none text-xs lg:text-lg text-gray-800 text-right cursor-pointer"
        >EVEN MORE BORING PRIVACY POLICY</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useElementBounding } from '@vueuse/core'
import { watch, computed, useTemplateRef } from 'vue'

const wrapper = useTemplateRef<HTMLDivElement>('wrapper')
const pen = useTemplateRef<HTMLImageElement>('pen')
const pencil = useTemplateRef<HTMLImageElement>('pencil')
const laptop = useTemplateRef<HTMLImageElement>('laptop')
const header = useTemplateRef<HTMLDivElement>('header')

const { height, top } = useElementBounding(wrapper)
const progress = computed(() => (height.value - top.value) / height.value)

watch(progress, (v) => {
  if (v < 0) {
    return
  }
  pen.value!.style.top = `${25 * v}vh`
  pen.value!.style.right = `${18 * v}vw`
  pencil.value!.style.top = `${15 * v}vh`
  pencil.value!.style.left = `${16 * v}vw`
  laptop.value!.style.bottom = `${50 - 40 * v}vh`

  pen.value!.style.transform = `rotate(${250 * v}deg)`
  pencil.value!.style.transform = `rotate(${-330 * 0.8 * v}deg)`
  laptop.value!.style.transform = `rotate(${-90 + 90 * v}deg)`

  header.value!.style.transform = `scale(${0.8 + 0.2 * v})`
  header.value!.style.top = `${-10 + 10 * v}vh`
})
</script>
