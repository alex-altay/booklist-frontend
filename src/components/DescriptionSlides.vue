<template>
  <div
    ref="slidesContainer"
    class="relative overflow-x-auto min-w-full h-full flex flex-row no-scrollbar"
  >
    <div class="slide bg-yellow-200">
      Second screen <br />
      slide 1
    </div>
    <div class="slide bg-purple-200">
      Second screen <br />
      slide 2
    </div>
    <div class="slide bg-rose-200">
      Second screen <br />
      slide 3
    </div>
  </div>
</template>

<script setup lang="ts">
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
.slide {
  @apply h-screen min-w-screen flex flex-1 justify-center items-center text-[6rem];
}
</style>
