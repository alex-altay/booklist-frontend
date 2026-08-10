<template>
  <div class="h-full">
    <TheHero />
    <TheProcess />
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import TheHero from '@/components/main/TheHero.vue'
import TheProcess from '@/components/main/TheProcess.vue'
import CallToAction from '@/components/main/CallToAction.vue'
import { useCssVar } from '@vueuse/core'
import { onMounted, onUnmounted } from 'vue'

/***
 * Sets main page background color for the part of the page that appears on top and bottom
 * only when user tries to scroll in this direction outside to the existing part and 'draws' the page
 * It can be achieved only with body tag
 */
function setScrollYColor(isMainPage: boolean) {
  document.body.style.backgroundColor = isMainPage ? useCssVar('--color-main-bg').value || 'unset' : 'unset'
}

onMounted(() => setScrollYColor(true))
onUnmounted(() => setScrollYColor(false))
</script>
