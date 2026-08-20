<template>
  <div class="relative top-0 left-0 min-h-dvh min-w-full">
    <Toaster />
    <GlobalSpinner />
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense @pending="setSpinnerState(true)" @resolve="setSpinnerState(false)">
          <component :is="Component" />
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import 'vue-sonner/style.css'
import GlobalSpinner from '@/components/GlobalSpinner.vue'
import { Toaster } from '@/components/ui/sonner'
import { globalErrorHandler } from '@/errors/effects'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { onErrorCaptured } from 'vue'

const { setSpinnerState } = useGlobalSpinner()
onErrorCaptured(globalErrorHandler)
</script>
