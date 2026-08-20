function isNotAllowedError(error: unknown): boolean {
  const ERROR_NAME = 'NotAllowedError'
  return (
    (typeof error === 'object' && error !== null && 'name' in error && error.name === ERROR_NAME) ||
    (typeof error === 'string' && error.includes(ERROR_NAME))
  )
}

function _hasStatus(error: unknown, code: number): error is { statusCode: number } {
  return typeof error === 'object' && error !== null && 'statusCode' in error && error.statusCode === code
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

export { isBadRequestError, isNotAllowedError, isNotFoundError, isUnauthorizedError }
