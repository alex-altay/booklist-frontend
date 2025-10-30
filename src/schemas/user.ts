import * as z from 'zod/v4'

export const User = z.object({
  userId: z.coerce.number(),
  email: z.email(),
})

export type User = z.infer<typeof User>
