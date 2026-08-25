import type { ComponentPublicInstance } from 'vue'

export function reportError(
  error: unknown,
  context: 'api' | 'vue',
  instance?: ComponentPublicInstance | null,
  info?: string,
) {
  console.error('Context:', context)
  console.error('Error:', error)
  if (info) {
    console.error('Info:', info)
  }
  if (instance) {
    console.error('Instance:', instance)
  }
}
