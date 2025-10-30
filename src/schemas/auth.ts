import * as z from 'zod/v4'

const authResponse = z.object({
  access_token: z.jwt(),
})

const authRequest = z.object({
  email: z.email(),
})

type AuthResponse = z.infer<typeof authResponse>
type AuthRequest = z.infer<typeof authRequest>

export type { AuthRequest, AuthResponse }

export { authRequest, authResponse }
