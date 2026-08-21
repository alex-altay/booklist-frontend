import { ERRORS, isBadRequestError, isNotFoundError, isUnauthorizedError } from '@/errors/pure'
import { ref, computed } from 'vue'

export function useApi() {
  const _requestCounter = ref(0)
  const isLoading = computed(() => _requestCounter.value > 0)
  const error = ref<string>()

  async function request<T>(fn: () => Promise<T>): Promise<T | void> {
    try {
      _requestCounter.value++
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
      _requestCounter.value--
    }
  }

  return { isLoading, error, request }
}
