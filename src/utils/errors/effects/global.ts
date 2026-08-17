import { isUnauthorizedError, isBadRequestError, isNotFoundError } from '@/utils/errors/pure'
import {
  handleAuthError,
  handleBadRequest,
  handleIsNotFound,
  handleUnexpectedError,
} from '@/utils/errors/effects/handlers'

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
