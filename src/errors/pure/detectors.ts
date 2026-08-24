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

function _hasStatus(error: unknown, code: number): error is { statusCode: number } {
  return typeof error === 'object' && error !== null && 'statusCode' in error && error.statusCode === code
}

function isNetworkError(error: unknown) {
  return _hasStatus(error, 0)
}

function isBadRequestError(error: unknown) {
  return _hasStatus(error, 400)
}

function isUnauthorizedError(error: unknown) {
  return _hasStatus(error, 401)
}

function isNotFoundError(error: unknown) {
  return _hasStatus(error, 404)
}

export { isApiError, isBadRequestError, isNetworkError, isNotAllowedError, isNotFoundError, isUnauthorizedError }
