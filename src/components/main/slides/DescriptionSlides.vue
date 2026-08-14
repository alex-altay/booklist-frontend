<template>
  <div
    ref="slidesContainer"
    class="slides relative overflow-x-auto overflow-y-hidden min-w-full h-screen max-h-screen min-h-screen flex flex-row no-scrollbar bg-main-additional"
  >
    <ReadingSlide />
    <ReadingText />
    <SavingSlide />
    <PresentingText />
    <PresentingSlide />
  </div>
</template>

<script setup lang="ts">
import ReadingSlide from '@/components/main/slides/ReadingSlide.vue'
import ReadingText from '@/components/main/slides/ReadingText.vue'
import SavingSlide from '@/components/main/slides/SavingSlide.vue'
import PresentingText from '@/components/main/slides/PresentingText.vue'
import PresentingSlide from '@/components/main/slides/PresentingSlide.vue'
import { watch, useTemplateRef } from 'vue'

const props = defineProps<{ progress: number }>()
const slidesContainer = useTemplateRef<HTMLDivElement>('slidesContainer')

watch(
  () => props.progress,
  (progress) => {
    if (!slidesContainer.value) {
      return
    }
    const width = slidesContainer.value.scrollWidth as unknown as number
    slidesContainer.value.scroll({ top: 0, left: width * progress, behavior: 'smooth' })
  },
)
</script>

<style scoped>
.slides > div {
  @apply h-screen;
}
</style>
