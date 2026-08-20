import { useBreakpoints, breakpointsTailwind, usePreferredReducedMotion } from '@vueuse/core'
import { computed } from 'vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanLg = breakpoints.smaller('lg')
const preferedReducedMotion = usePreferredReducedMotion()

export function useStaticLandingImage() {
  const shouldUseStaticImage = computed(() => isSmallerThanLg.value || preferedReducedMotion.value === 'reduce')
  return {
    shouldUseStaticImage,
  }
}
