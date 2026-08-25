import { ERRORS, toMessage } from '@/errors/pure/texts'
import {
  isApiError,
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
  isNotAllowedError,
  isNetworkError,
  isNotFoundError,
  isServerError,
  isUnauthorizedError,
  toMessage,
  type ApiError,
}
