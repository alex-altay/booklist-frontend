import { isUnauthorizedError, isBadRequestError, isNotFoundError } from '@/errors/pure'
import { handleAuthError, handleBadRequest, handleIsNotFound, handleUnexpectedError } from '@/errors/effects/handlers'

export function globalErrorHandler(error: unknown) {
  if (isUnauthorizedError(error)) {
    handleAuthError()
  } else if (isBadRequestError(error)) {
    handleBadRequest()
  } else if (isNotFoundError(error)) {
    handleIsNotFound()
  } else {
    handleUnexpectedError()
  }
  return false
}
