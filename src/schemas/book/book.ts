import { z } from '../zod'
import { category } from './categories'
import { rating } from './ratings'
import { language } from './languages'
import { status } from './status'
import { User } from '@/schemas/user'

/**
 * Explicitly transforms any nullish zod type to nullable. Needed for two reasons:
 * 1. Selects work with null, not with undefined
 * 2. We still need undefined in backend response to avoid sending every record with every null field and save partial update when needed
 * Without this helper any book will be { author: 'foo', title: 'bar', language: null, rating: null, category: null, etc }
 * With only with existing fields { author: 'foo', title: 'bar' }
 * @param field any zod type
 * @returns the same zod type but nullable
 */
const nullable = <T extends z.ZodType>(field: T) => field.nullish().transform((v) => v ?? null)

const book = z.object({
  id: z.number(),
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  language: nullable(language),
  startDate: nullable(z.string()),
  endDate: nullable(z.string()),
  status: nullable(status),
  description: nullable(z.string()),
  rating: nullable(rating),
  category: nullable(category),
  userId: User.shape.userId,
})
const newBook = book.omit({ id: true, userId: true })
type Book = z.infer<typeof book>
type NewBook = z.infer<typeof newBook>

type CreateBookResponse = {
  allBooks: Book[]
  newBook: Book
}

type UpdatedBookResponse = {
  allBooks: Book[]
  updatedBook: Book
}

export { book, newBook, type Book, type NewBook, type CreateBookResponse, type UpdatedBookResponse }
