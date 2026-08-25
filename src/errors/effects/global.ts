import { handleUnexpectedError } from '@/errors/effects/handlers'

export function globalErrorHandler() {
  handleUnexpectedError()
  return false
}
