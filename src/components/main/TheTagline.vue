<template>
  <div class="flex justify-center text-main-additional">
    <div class="w-[min(1420px,calc(100vw-1rem))] flex flex-col leading-none font-black gap-0">
      <div
        class="landscape:max-lg:text-[clamp(1rem,15vw,90px)] text-[clamp(3rem,22vw,200px)] 2xl:pr-[6.8ch] ml-[-0.05ch] lg:self-start lg:pr-0 max-lg:pr-0"
        :style="{
          fontStretch: `${config.first.fontStretch}%`,
          letterSpacing: `${config.first.letterSpacing}em`,
        }"
      >
        KEEP
      </div>
      <div
        class="landscape:max-lg:text-[clamp(1rem,15vw,90px)] text-[clamp(3rem,22vw,200px)] mt-[-0.1em] ml-[-0.15em]"
        :style="{
          fontStretch: `${config.second.fontStretch}%`,
          letterSpacing: `${config.second.letterSpacing}em`,
        }"
      >
        TRACK
      </div>
      <div
        class="text-[clamp(0.8rem,3vw,50px)] lg:self-end whitespace-nowrap"
        :style="{
          fontStretch: `${config.third.fontStretch}%`,
          letterSpacing: `${config.third.letterSpacing}em`,
        }"
      >
        OF BOOKS YOU'VE READ
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePreferredReducedMotion, useEventListener, useWindowSize } from '@vueuse/core'
import { reactive } from 'vue'

const { height } = useWindowSize()
const reducedMotion = usePreferredReducedMotion()

const config = reactive({
  first: { fontStretch: 100, letterSpacing: 0, minFontStretch: 5, maxLetterSpacing: 0.3 },
  second: { fontStretch: 100, letterSpacing: 0, minFontStretch: 5, maxLetterSpacing: 0.4 },
  third: { fontStretch: 100, letterSpacing: 0, minFontStretch: 1, maxLetterSpacing: 0.4 },
})

function transformOnScroll() {
  const progress = Math.min(window.scrollY / height.value, 1)
  for (const line of Object.keys(config) as (keyof typeof config)[]) {
    config[line].fontStretch = 100 - progress * (100 - config[line].minFontStretch)
    config[line].letterSpacing = progress * config[line].maxLetterSpacing
  }
}

useEventListener(
  'scroll',
  () => {
    if (reducedMotion.value !== 'reduce') {
      transformOnScroll()
    }
  },
  { passive: true },
)
</script>
