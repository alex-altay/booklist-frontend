<template>
  <div class="relative flex justify-end items-center w-full text-sm text-white">
    <div ref="selector" class="relative right-[10%] flex flex-row justify-center gap-32 select-none">
      <div class="font-black cursor-pointer" @click="$router.push({ name: 'root', hash: '#reading' })">READ</div>
      <div class="cursor-pointer" @click="$router.push({ name: 'root', hash: '#saving' })">ADD&nbsp;MORE</div>
      <div class="cursor-pointer" @click="$router.push({ name: 'root', hash: '#presenting' })">SUM&nbsp;UP</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, useTemplateRef } from 'vue'

const props = defineProps<{ progress: number }>()
const selector = useTemplateRef<HTMLDivElement>('selector')

watch(
  () => props.progress,
  (v) => {
    if (!selector.value) {
      return
    }
    if (v > 0 && v < 0.3) {
      selector.value.style.right = `${10 + v * 100}%`
    }
  },
)
</script>
