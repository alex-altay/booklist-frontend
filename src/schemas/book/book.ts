import * as z from 'zod'
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

function isNewBook(book: Book | NewBook): book is NewBook {
  return (book as Book).id === undefined && (book as Book).userId === undefined
}

const createBookResponse = z.object({
  allBooks: z.array(book),
  newBook: book,
})
type CreateBookResponse = z.infer<typeof createBookResponse>

const updatedBookResponse = z.object({
  allBooks: z.array(book),
  updatedBook: book,
})
type UpdatedBookResponse = z.infer<typeof updatedBookResponse>

export {
  book,
  newBook,
  isNewBook,
  createBookResponse,
  updatedBookResponse,
  type Book,
  type NewBook,
  type CreateBookResponse,
  type UpdatedBookResponse,
}
