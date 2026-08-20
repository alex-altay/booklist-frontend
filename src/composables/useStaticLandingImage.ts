import { useBreakpoints, breakpointsTailwind, usePreferredReducedMotion } from '@vueuse/core'
import { computed } from 'vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanLg = breakpoints.smaller('lg')
const preferredReducedMotion = usePreferredReducedMotion()

export function useStaticLandingImage() {
  const shouldUseStaticImage = computed(() => isSmallerThanLg.value || preferredReducedMotion.value === 'reduce')
  return {
    shouldUseStaticImage,
  }
}
