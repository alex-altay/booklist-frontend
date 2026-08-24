import { type ApiError, ERRORS } from '@/errors/pure'
import { type AxiosError } from 'axios'

export type ServerErrorBody = {
  statusCode?: number
  message?: string
}

export function normalizeAxiosError(error: unknown): ApiError {
  const axiosError = error as AxiosError<ServerErrorBody>
  const response = axiosError.response

  if (response) {
    return {
      statusCode: response.data?.statusCode ?? response.status,
      message: response.data?.message ?? axiosError.message,
      cause: error,
    }
  }

  return {
    statusCode: 0,
    message: axiosError.message || ERRORS.NETWORK_ERROR,
    cause: error,
  }
}
