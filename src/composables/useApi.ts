import { handleServerErrors } from '@/errors/effects'
import { isServerError, toMessage } from '@/errors/pure'
import { ref, computed } from 'vue'

type Success<T> = { ok: true; data: T }
type Failure = { ok: false; message: string }
type Result<T> = Success<T> | Failure

export function useApi() {
  const _requestCounter = ref(0)
  const isLoading = computed(() => _requestCounter.value > 0)

  async function request<T>(fn: () => Promise<T>): Promise<Result<T>> {
    try {
      _requestCounter.value++
      return { ok: true, data: await fn() }
    } catch (apiError) {
      if (isServerError(apiError)) {
        handleServerErrors(apiError)
        return { ok: false, message: '' }
      } else {
        return { ok: false, message: toMessage(apiError) }
      }
    } finally {
      _requestCounter.value--
    }
  }

  return { isLoading, request }
}
