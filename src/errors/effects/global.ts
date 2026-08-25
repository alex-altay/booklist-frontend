import { handleUnexpectedError } from './handlers'
import { reportError } from './report'
import { type ComponentPublicInstance } from 'vue'

export function globalErrorHandler(error: unknown, instance: ComponentPublicInstance | null, info: string) {
  reportError(error, 'vue', instance, info)
  handleUnexpectedError()
  return false
}
