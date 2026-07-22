import * as z from 'zod/v4'

const categories = ['NON_FICTION', 'SCIENCE', 'POETRY', 'TECHNICAL', 'PHILOSOPHY', 'FICTION'] as const
const category = z.enum(categories)
type Category = z.infer<typeof category>

export { category, categories, type Category }
