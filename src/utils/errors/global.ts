import { isUnauthorizedError, isBadRequestError, isNotFoundError } from '@/utils/errors/detectors'
import { handleAuthError, handleBadRequest, handleIsNotFound, handleUnexpectedError } from '@/utils/errors/handlers'

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
