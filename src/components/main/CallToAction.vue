<template>
  <div ref="wrapper" class="relative h-screen w-screen flex items-center justify-center select-none bg-main-bg">
    <img ref="pencil" class="absolute h-[10vh] left-[16vw] top-0" src="@/assets/main-page/pencil.png" />
    <img ref="pen" class="absolute h-[14vh] top-0 right-[18vw]" src="@/assets/main-page/pen.png" />
    <img
      ref="laptop"
      class="absolute h-[12vh] bottom-0 translate-x-1 hidden md:block"
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
      class="absolute bottom-15 px-5 sm:px-14 flex flex-row w-full justify-between uppercase sm:text-lg 2xl:text-2xl"
    >
      <div ref="linkLeft" class="cursor-pointer text-left">BORING TERMS OF AGREEMENT</div>
      <div ref="linkRight" class="cursor-pointer text-right">EVEN MORE BORING PRIVACY POLICY</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useElementBounding } from '@vueuse/core'
import { ref, watch, computed } from 'vue'

const wrapper = ref()
const pen = ref<HTMLImageElement>()
const pencil = ref<HTMLImageElement>()
const laptop = ref<HTMLImageElement>()
const header = ref<HTMLDivElement>()

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
