import { router } from '@/router/router'
import { userStore } from '@/stores/user'

const ERRORS = {
  UNEXPECTED_ERROR: 'Unexpected error. Try again later',
  EMAIL_HAS_BEEN_USED: 'This email has already been used',
  CANCELED_BY_USER: 'Cancelled by user',
} as const

function isNotAllowedError(error: unknown): boolean {
  const ERROR_NAME = 'NotAllowedError'
  return (
    (error instanceof DOMException && error.name === ERROR_NAME) ||
    (typeof error == 'object' && error !== null && 'name' in error && error.name == ERROR_NAME) ||
    (typeof error === 'string' && error.includes(ERROR_NAME))
  )
}

function isBadRequestError(error: unknown): boolean {
  return typeof error == 'object' && error != null && 'statusCode' in error && error.statusCode == 400
}

function isUnauthorizedError(error: unknown): boolean {
  return typeof error == 'object' && error != null && 'statusCode' in error && error.statusCode == 401
}

function isNotFoundError(error: unknown): boolean {
  return typeof error == 'object' && error != null && 'statusCode' in error && error.statusCode == 404
}

// TODO Think about it. It make sense to split this module into two: vue-dependable (handlers) and independable - error determination
function handleAuthError() {
  userStore().signOut()
  router.push({ name: 'signin' })
}

function globalErrorHandler(error: unknown) {
  if (isUnauthorizedError(error)) {
    handleAuthError() // TODO Show modal - Expired session, sign in
  } else if (isNotFoundError(error)) {
    router.push({ name: '404' })
  } else {
    // TODO Show modal - unexpected error, try one more time
  }
  return false
}

export { ERRORS, handleAuthError, isNotAllowedError, isBadRequestError, isUnauthorizedError, globalErrorHandler }
