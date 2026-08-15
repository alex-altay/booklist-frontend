import { useParallax, useMouseInElement } from '@vueuse/core'
import { computed, type ShallowRef, type ComputedRef } from 'vue'

export function useSlideParallax(
  target: Readonly<ShallowRef<HTMLDivElement | null>>,
): ComputedRef<{ roll: number; tilt: number }> {
  if (!target) {
    return computed(() => ({ roll: 0, tilt: 0 }))
  }

  const { isOutside } = useMouseInElement(target)
  const parallax = useParallax(target)

  return computed(() => ({
    roll: isOutside.value ? 0 : parallax.roll.value,
    tilt: isOutside.value ? 0 : parallax.tilt.value,
  }))
}
