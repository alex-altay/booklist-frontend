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

export { isBadRequestError, isNotAllowedError, isNotFoundError, isUnauthorizedError }
