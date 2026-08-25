import { isNotAllowedError, isApiError } from './detectors'
import { z } from '@/schemas/zod'

const ERRORS = {
  CANCELED_BY_USER: 'Cancelled by user',
  EXPIRED_SESSION: 'Expired session or unauthorized access. Sign in',
  INVALID_DATA: 'Data is broken. Try again later',
  NETWORK_ERROR: 'No connection. Check your network and try again',
  NO_HOST: 'VITE_HOST was not inlined at build time — this bundle is misconfigured',
  UNEXPECTED_ERROR: 'Unexpected error. Try again later',
} as const

function toMessage(apiError: unknown) {
  if (isNotAllowedError(apiError)) {
    return ERRORS.CANCELED_BY_USER
  } else if (apiError instanceof z.ZodError) {
    return ERRORS.INVALID_DATA
  } else if (isApiError(apiError) || apiError instanceof Error) {
    return apiError.message
  } else if (typeof apiError === 'string') {
    return apiError
  } else {
    return ERRORS.UNEXPECTED_ERROR
  }
}

export { ERRORS, toMessage }
