import { useId } from 'vue'

export function useIds<const T extends readonly string[]>(...names: T): Record<T[number], string> {
  return Object.fromEntries(names.map((name) => [name, useId()])) as Record<T[number], string>
}
