import { authResponse } from '@/schemas/auth'
import { defineStore } from 'pinia'
import { isLocalStorageAvailable } from '@/utils'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'
import { webauthnApi } from '@api/webauthn'
import { useBookStore } from '@/stores/book'
import { useFiltrationStore } from '@/stores/filtration'
import { computed, ref } from 'vue'

const TOKEN_STORAGE_KEY = 'AccessToken'

export const useUserStore = defineStore('user', () => {
  const _accessToken = ref<null | string>(getTokenFromLocalStorage())
  const isAuthorized = computed(() => _accessToken.value !== null)

  async function signUp(userEmail: string) {
    const { requestId, options, email } = await webauthnApi.getRegistrationOptions(userEmail)
    const response = await startRegistration({ optionsJSON: options })
    return await webauthnApi.verifyRegistration({ response, requestId, email })
  }

  async function signIn() {
    const { requestId, options } = await webauthnApi.generateAuthenticationOptions()
    const response = await startAuthentication({ optionsJSON: options })
    const data = await webauthnApi.verifyAuthentication({ response, requestId })
    const { access_token } = authResponse.parse(data)
    setAccessToken(access_token)
  }

  function getTokenFromLocalStorage(): string | null {
    if (!isLocalStorageAvailable()) {
      return null
    }
    const accessToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (accessToken) {
      webauthnApi.setAuthToken(accessToken)
      return accessToken
    }
    return null
  }

  function saveTokenToLocalStorage(token: string): void {
    if (!isLocalStorageAvailable()) {
      return
    }
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }

  function removeTokenFromLocalStorage(): void {
    if (!isLocalStorageAvailable()) {
      return
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }

  function setAccessToken(accessToken: string) {
    saveTokenToLocalStorage(accessToken)
    webauthnApi.setAuthToken(accessToken)
    _accessToken.value = accessToken
  }

  function removeAccessToken() {
    removeTokenFromLocalStorage()
    webauthnApi.removeAuthToken()
    _accessToken.value = null
  }

  function signOut() {
    useFiltrationStore().reset()
    useBookStore().reset()
    removeAccessToken()
  }

  return {
    isAuthorized,
    signIn,
    signUp,
    signOut,
  }
})
