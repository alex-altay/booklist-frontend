import { ERRORS } from '@/utils/errors/texts'
import { isBadRequestError, isNotAllowedError, isNotFoundError, isUnauthorizedError } from '@/utils/errors/detectors'
import { handleBadRequest, handleIsNotFound, handleAuthError, handleUnexpectedError } from '@/utils/errors/handlers'
import { globalErrorHandler } from '@/utils/errors/global'

export {
  ERRORS,
  isBadRequestError,
  isNotAllowedError,
  isNotFoundError,
  isUnauthorizedError,
  handleAuthError,
  handleBadRequest,
  handleIsNotFound,
  handleUnexpectedError,
  globalErrorHandler,
}
