<template>
  <div
    ref="slidesContainer"
    class="slides relative overflow-x-auto min-w-full h-full flex flex-row no-scrollbar bg-main-additional"
  >
    <ReadingSlide />
    <SavingSlide />
    <PresentingSlide />
  </div>
</template>

<script setup lang="ts">
import PresentingSlide from '@/components/main/slides/PresentingSlide.vue'
import ReadingSlide from '@/components/main/slides/ReadingSlide.vue'
import SavingSlide from '@/components/main/slides/SavingSlide.vue'
import { ref, watch } from 'vue'

const props = defineProps<{ progress: number }>()
const slidesContainer = ref()

watch(
  () => props.progress,
  (progress) => {
    const width = slidesContainer.value.scrollWidth
    slidesContainer.value.scroll(width * progress, 0)
  },
)
</script>

<style scoped>
.slides > div {
  @apply h-screen;
}
</style>
