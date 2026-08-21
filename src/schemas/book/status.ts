import * as z from 'zod'

const statuses = ['FINISHED', 'DROPPED'] as const
const status = z.enum(statuses)
type Status = z.infer<typeof status>

export { statuses, status, type Status }
