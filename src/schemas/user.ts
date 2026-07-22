import * as z from 'zod'

export const User = z.object({
  userId: z.coerce.number<string | number>(),
  email: z.email(),
})

export type User = z.infer<typeof User>
