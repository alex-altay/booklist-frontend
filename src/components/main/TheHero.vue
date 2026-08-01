<template>
  <div
    class="relative h-screen px-14 pt-14 pb-3 flex flex-col justify-between bg-main-bg text-main-dark uppercase select-none"
  >
    <div class="flex flex-row justify-between text-2xl font-bold">
      <div>MY BOOK LIST</div>
      <div class="cursor-pointer" @click="$router.push({ name: 'signin' })">SIGN IN</div>
    </div>

    <div class="symmetric-flex-filler" />

    <div class="flex justify-center text-main-additional">
      <div class="w-[min(1420px,calc(100vw-7rem))] flex flex-col leading-none font-black gap-0">
        <div
          class="text-[clamp(3rem,15vw,200px)] 2xl:pr-[6.8ch] ml-[-0.05ch] lg:self-start lg:pr-0 max-lg:pr-0"
          :style="{
            fontStretch: `${firstLineFontStretch}%`,
            letterSpacing: `${firstLineLetterSpacing}em`,
          }"
        >
          KEEP
        </div>
        <div
          class="text-[clamp(3rem,15vw,200px)] mt-[-0.1em]"
          :style="{
            fontStretch: `${secondLineFontStretch}%`,
            letterSpacing: `${secondLineLetterSpacing}em`,
          }"
        >
          TRACK
        </div>
        <div
          class="text-[clamp(0.8rem,3vw,50px)] lg:self-end whitespace-nowrap"
          :style="{
            fontStretch: `${thirdLineFontStretch}%`,
            letterSpacing: `${thirdLineLetterSpacing}em`,
          }"
        >
          OF BOOKS YOU'VE READ
        </div>
      </div>
    </div>

    <div class="flex flex-row self-center lg:self-end gap-16 text-xs lg:text-sm lg:font-bold">
      <div>CONVENIENT</div>
      <div>INTERESTING</div>
      <div>AD&nbsp;FREE</div>
    </div>

    <div class="flex flex-col justify-center items-center mb-5">
      <div class="text-xs lg:text-sm mb-5">KEEP SCROLLING</div>
      <img class="w-6 cursor-pointer" src="@/assets/main-page/mouse.svg" @click="scroll" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ref, onMounted, onUnmounted } from 'vue'
import { SCREEN_DELIMETER_VH } from '@/data/constants'

const { height } = useWindowSize()

const firstLineFontStretch = ref(100)
const firstLineLetterSpacing = ref(0)

const secondLineFontStretch = ref(100)
const secondLineLetterSpacing = ref(0)

const thirdLineFontStretch = ref(100)
const thirdLineLetterSpacing = ref(0)

const firstLineConfig = { minFontStretch: 5, maxLetterSpacing: 0.3 }
const secondLineConfig = { minFontStretch: 5, maxLetterSpacing: 0.4 }
const thirdLineConfig = { minFontStretch: 1, maxLetterSpacing: 0.4 }

function handleScroll() {
  const progress = Math.min(window.scrollY / height.value, 1)

  firstLineFontStretch.value = 100 - progress * (100 - firstLineConfig.minFontStretch)
  firstLineLetterSpacing.value = progress * firstLineConfig.maxLetterSpacing

  secondLineFontStretch.value = 100 - progress * (100 - secondLineConfig.minFontStretch)
  secondLineLetterSpacing.value = progress * secondLineConfig.maxLetterSpacing

  thirdLineFontStretch.value = 100 - progress * (100 - thirdLineConfig.minFontStretch)
  thirdLineLetterSpacing.value = progress * thirdLineConfig.maxLetterSpacing
}

function scroll() {
  const scrollStep = height.value + (height.value / 100) * SCREEN_DELIMETER_VH
  window.scrollTo({ top: scrollStep, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
