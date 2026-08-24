import type { AuthResponse } from '@/schemas/auth'
import { axiosInstance } from './axios'
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/browser'

export const webauthnApi = {
  getRegistrationOptions(email: string) {
    return axiosInstance.get<{
      requestId: string
      options: PublicKeyCredentialCreationOptionsJSON
      email: string
    }>(`webauthn/register/option/${email}`)
  },

  verifyRegistration(body: { response: RegistrationResponseJSON; requestId: string; email: string }) {
    return axiosInstance.post<typeof body, { verified: boolean }>('webauthn/register', body)
  },

  generateAuthenticationOptions() {
    return axiosInstance.get<{ options: PublicKeyCredentialRequestOptionsJSON; requestId: string }>(
      'webauthn/authenticate/option',
    )
  },

  verifyAuthentication(body: { response: AuthenticationResponseJSON; requestId: string }) {
    return axiosInstance.post<typeof body, AuthResponse>('webauthn/authenticate', body)
  },

  setAuthToken(token: string) {
    axiosInstance.setAuthToken(token)
  },

  removeAuthToken() {
    axiosInstance.removeAuthToken()
  },
}
