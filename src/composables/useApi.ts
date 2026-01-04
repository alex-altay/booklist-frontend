import { ERRORS } from '@/utils/errors'
import { handleAuthError } from '@/utils/handleAuthError'
import { ref } from 'vue'

export function useApi() {
  const isLoading = ref<boolean>(false)
  const error = ref<string>()

  async function request<T>(fn: () => Promise<T>): Promise<T | void> {
    try {
      isLoading.value = true
      return await fn()
    } catch (apiError) {
      if (typeof apiError == 'object' && apiError != null && 'status' in apiError && apiError.status == 401) {
        return handleAuthError()
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
