import * as z from 'zod'
import { User } from '@/schemas/user'
import { category, rating, language } from '@/schemas/book'

const book = z.object({
  id: z.number(),
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  language: language.nullish(),
  startDate: z.string().nullish(),
  endDate: z.string().nullish(),
  hasFinished: z.boolean().nullish(),
  description: z.string().nullish(),
  rating: rating.nullish(),
  category: category.nullish(),
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
