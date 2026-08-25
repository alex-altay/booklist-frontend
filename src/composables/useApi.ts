import { handleServerErrors } from '@/errors/effects'
import { ERRORS, isApiError, isServerError } from '@/errors/pure'
import { ref, computed } from 'vue'

export function useApi() {
  const _requestCounter = ref(0)
  const isLoading = computed(() => _requestCounter.value > 0)
  const error = ref<string>('')

  function passErrorToComponent(apiError: unknown) {
    if (isApiError(apiError) || apiError instanceof Error) {
      error.value = apiError.message
    } else if (typeof apiError === 'string') {
      error.value = apiError
    } else {
      error.value = ERRORS.UNEXPECTED_ERROR
    }
  }

  async function request<T>(fn: () => Promise<T>): Promise<T | void> {
    try {
      _requestCounter.value++
      error.value = ''
      return await fn()
    } catch (apiError) {
      if (isServerError(apiError)) {
        handleServerErrors(apiError)
      } else {
        passErrorToComponent(apiError)
      }
    } finally {
      _requestCounter.value--
    }
  }

  return { isLoading, error, request }
}
