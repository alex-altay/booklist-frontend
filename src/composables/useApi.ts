import { ERRORS, isBadRequestError, isNotFoundError, isUnauthorizedError } from '@/utils/errors/pure'
import { ref } from 'vue'

export function useApi() {
  const isLoading = ref<boolean>(false)
  const error = ref<string>()

  async function request<T>(fn: () => Promise<T>): Promise<T | void> {
    try {
      isLoading.value = true
      error.value = undefined
      return await fn()
    } catch (apiError) {
      if (isUnauthorizedError(apiError) || isBadRequestError(apiError) || isNotFoundError(apiError)) {
        throw apiError
      } else if (typeof apiError === 'string') {
        error.value = apiError
      } else if (apiError instanceof Error) {
        error.value = apiError.message
      } else {
        error.value = ERRORS.UNEXPECTED_ERROR
      }
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, error, request }
}
