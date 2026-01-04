<template>
  <div
    v-if="isSpinning"
    class="absolute top-0 left-0 min-h-screen min-w-screen w-full h-full z-40 flex justify-center items-center overflow-hidden"
  >
    <div class="absolute top-0 left-0 min-h-screen min-w-screen w-full h-full z-45 bg-gray-400 opacity-50"></div>
    <Spinner class="relative z-50 size-10" />
  </div>
</template>

<script setup lang="ts">
import { Spinner } from '@/components/ui/spinner'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'

const { isSpinning } = useGlobalSpinner()
</script>
