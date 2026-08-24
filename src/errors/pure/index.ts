import { ERRORS } from '@/errors/pure/texts'
import {
  isApiError,
  isBadRequestError,
  isNotAllowedError,
  isNotFoundError,
  isUnauthorizedError,
} from '@/errors/pure/detectors'
import { type ApiError } from './api-error'

export { ERRORS, isApiError, isBadRequestError, isNotAllowedError, isNotFoundError, isUnauthorizedError, type ApiError }
