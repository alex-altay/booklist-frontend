import { router } from '@/router/router'

export function handleAuthError() {
  router.push({ name: 'signin' })
}

export function isNotAllowedError(error: unknown): boolean {
  const MARKER = 'NotAllowedError'
  return (
    (error instanceof DOMException && error.name === MARKER) ||
    (typeof error == 'object' && error !== null && 'name' in error && error.name == MARKER) ||
    (typeof error === 'string' && error.includes(MARKER))
  )
}

export function isBadRequestError(error: unknown): boolean {
  return (
    typeof error == 'object' && error != null && 'statusCode' in error && error.statusCode == 400
  )
}
