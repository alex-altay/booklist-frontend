<template>
  <div class="flex justify-center text-main-additional">
    <div class="w-[min(1420px,calc(100vw-1rem))] flex flex-col leading-none font-black gap-0">
      <div
        class="landscape:max-lg:text-[clamp(1rem,15vw,90px)] text-[clamp(3rem,22vw,200px)] 2xl:pr-[6.8ch] ml-[-0.05ch] lg:self-start lg:pr-0 max-lg:pr-0"
        :style="{
          fontStretch: `${firstLineFontStretch}%`,
          letterSpacing: `${firstLineLetterSpacing}em`,
        }"
      >
        KEEP
      </div>
      <div
        class="landscape:max-lg:text-[clamp(1rem,15vw,90px)] text-[clamp(3rem,22vw,200px)] mt-[-0.1em] ml-[-0.15em]"
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
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { usePreferredReducedMotion } from '@vueuse/core'

const { height } = useWindowSize()
const isPreferReducedMotion = usePreferredReducedMotion().value == 'reduce'

const firstLineFontStretch = ref(100)
const firstLineLetterSpacing = ref(0)

const secondLineFontStretch = ref(100)
const secondLineLetterSpacing = ref(0)

const thirdLineFontStretch = ref(100)
const thirdLineLetterSpacing = ref(0)

const firstLineConfig = { minFontStretch: 5, maxLetterSpacing: 0.3 }
const secondLineConfig = { minFontStretch: 5, maxLetterSpacing: 0.4 }
const thirdLineConfig = { minFontStretch: 1, maxLetterSpacing: 0.4 }

function transformOnScroll() {
  const progress = Math.min(window.scrollY / height.value, 1)

  firstLineFontStretch.value = 100 - progress * (100 - firstLineConfig.minFontStretch)
  firstLineLetterSpacing.value = progress * firstLineConfig.maxLetterSpacing

  secondLineFontStretch.value = 100 - progress * (100 - secondLineConfig.minFontStretch)
  secondLineLetterSpacing.value = progress * secondLineConfig.maxLetterSpacing

  thirdLineFontStretch.value = 100 - progress * (100 - thirdLineConfig.minFontStretch)
  thirdLineLetterSpacing.value = progress * thirdLineConfig.maxLetterSpacing
}

onMounted(() => {
  if (!isPreferReducedMotion) {
    window.addEventListener('scroll', transformOnScroll)
  }
})

onUnmounted(() => {
  if (!isPreferReducedMotion) {
    window.removeEventListener('scroll', transformOnScroll)
  }
})
</script>
