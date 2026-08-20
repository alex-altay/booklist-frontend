import { ERRORS } from '@/errors/pure'
import { router } from '@/router/router'
import { useUserStore } from '@/stores/user'
import { toast } from 'vue-sonner'

function handleAuthError() {
  useUserStore().signOut()
  toast.error(ERRORS.EXPIRED_SESSION)
  router.push({ name: 'signin' })
}

function handleBadRequest() {
  toast.error(ERRORS.BAD_REQUEST)
}

function handleIsNotFound() {
  router.push({ name: '404', params: { pathMatch: '' } })
}

function handleUnexpectedError() {
  toast.error(ERRORS.UNEXPECTED_ERROR)
}

export { handleAuthError, handleBadRequest, handleIsNotFound, handleUnexpectedError }
