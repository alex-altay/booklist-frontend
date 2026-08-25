import { type ApiError } from './api-error'

function isNotAllowedError(error: unknown): boolean {
  const ERROR_NAME = 'NotAllowedError'
  return (
    (typeof error === 'object' && error !== null && 'name' in error && error.name === ERROR_NAME) ||
    (typeof error === 'string' && error.includes(ERROR_NAME))
  )
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number' &&
    'message' in error &&
    typeof error.message === 'string'
  )
}

function isServerError(error: unknown): boolean {
  return isNetworkError(error) || isUnauthorizedError(error) || isNotFoundError(error)
}

function _hasStatus(error: unknown, code: number): error is { statusCode: number } {
  return typeof error === 'object' && error !== null && 'statusCode' in error && error.statusCode === code
}

function isNetworkError(error: unknown) {
  return _hasStatus(error, 0)
}

function isUnauthorizedError(error: unknown) {
  return _hasStatus(error, 401)
}

function isNotFoundError(error: unknown) {
  return _hasStatus(error, 404)
}

export { isApiError, isNetworkError, isNotAllowedError, isNotFoundError, isServerError, isUnauthorizedError }
