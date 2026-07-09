<template>
  <div class="relative top-0 left-0 min-h-dvh min-w-full">
    <GlobalSpinner />
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense @fallback="setSpinnerState(true)" @resolve="setSpinnerState(false)">
          <component :is="Component" />
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import GlobalSpinner from '@/components/GlobalSpinner.vue'
import { globalErrorHandler } from '@/utils/errors'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { onErrorCaptured } from 'vue'

const { setSpinnerState } = useGlobalSpinner()
onErrorCaptured(globalErrorHandler)
</script>
