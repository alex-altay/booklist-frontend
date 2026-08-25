import { ERRORS } from '@/errors/pure/texts'
import {
  isApiError,
  isBadRequestError,
  isServerError,
  isNetworkError,
  isNotAllowedError,
  isNotFoundError,
  isUnauthorizedError,
} from '@/errors/pure/detectors'
import { type ApiError } from './api-error'

export {
  ERRORS,
  isApiError,
  isBadRequestError,
  isNotAllowedError,
  isNetworkError,
  isNotFoundError,
  isServerError,
  isUnauthorizedError,
  type ApiError,
}
