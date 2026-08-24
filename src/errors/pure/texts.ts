export const ERRORS = {
  BAD_REQUEST: 'You are trying to reach the impossible things',
  CANCELED_BY_USER: 'Cancelled by user',
  EMAIL_HAS_BEEN_USED: 'This email has already been used',
  EXPIRED_SESSION: 'Expired session or unauthorized access. Sign in',
  UNEXPECTED_ERROR: 'Unexpected error. Try again later',
  NETWORK_ERROR: 'No connection. Check your network and try again',
  NO_HOST: 'VITE_HOST was not inlined at build time — this bundle is misconfigured',
} as const
